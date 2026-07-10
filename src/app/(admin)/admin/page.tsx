"use client";

/**
 * Bunbun Dashboard — CMS kiểu Git, không cần server.
 * Sửa nội dung → commit vào GitHub → Actions tự build + deploy (~2 phút).
 * Đăng nhập: thiết lập 1 lần bằng GitHub token + mật khẩu tự đặt;
 * token được mã hoá AES-GCM (khoá dẫn xuất PBKDF2 từ mật khẩu) lưu localStorage —
 * từ đó về sau chỉ cần gõ mật khẩu. GitHub không cho đăng nhập API bằng
 * username/password nên đây là cách gần nhất và an toàn hơn lưu token thô.
 */

import { useCallback, useEffect, useRef, useState } from "react";

const REPO = "mynameizluan/bunbun-website";
const BRANCH = "main";
const CONTENT_PATH = "src/data/site-content.json";
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/public`;
const VAULT_KEY = "bunbun-admin-vault";
const LEGACY_TOKEN_KEY = "bunbun-admin-gh-token";

/* ---------- mã hoá token bằng mật khẩu ---------- */
function b64(bytes: Uint8Array): string {
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}
function unb64(s: string): Uint8Array {
  return Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
}
async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const raw = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: 310000, hash: "SHA-256" },
    raw,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}
async function encryptToken(token: string, password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password, salt);
  const ct = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv as BufferSource },
      key,
      new TextEncoder().encode(token)
    )
  );
  return JSON.stringify({ s: b64(salt), i: b64(iv), c: b64(ct) });
}
async function decryptToken(vault: string, password: string): Promise<string> {
  const { s, i, c } = JSON.parse(vault);
  const key = await deriveKey(password, unb64(s));
  const pt = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: unb64(i) as BufferSource },
    key,
    unb64(c) as BufferSource
  );
  return new TextDecoder().decode(pt);
}

/* eslint-disable @typescript-eslint/no-explicit-any */
type Content = any;

/* ---------- base64 utf-8 helpers ---------- */
function encodeUtf8(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000)
    bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
function decodeUtf8(b64: string): string {
  const bin = atob(b64.replace(/\s/g, ""));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}
async function fileToB64(file: File): Promise<string> {
  const buf = new Uint8Array(await file.arrayBuffer());
  let bin = "";
  for (let i = 0; i < buf.length; i += 0x8000)
    bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return btoa(bin);
}

/* ---------- UI bits ---------- */
function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  const cls =
    "w-full rounded border border-ink/20 bg-white px-3 py-2 text-sm focus:border-ember focus:outline-none";
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] tracking-[0.14em] text-stone uppercase">
        {label}
      </span>
      {textarea ? (
        <textarea
          className={`${cls} min-h-[76px] leading-relaxed`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          className={cls}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}

function Btn({
  children,
  onClick,
  kind = "primary",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: "primary" | "ghost" | "danger";
  disabled?: boolean;
}) {
  const base =
    "rounded-full px-5 py-2.5 font-display text-xs font-semibold tracking-[0.14em] uppercase transition-colors disabled:opacity-40";
  const styles = {
    primary: "bg-ember text-white hover:bg-ember-deep",
    ghost: "border border-ink text-ink hover:bg-ink hover:text-paper",
    danger: "border border-red-700/40 text-red-700 hover:bg-red-700 hover:text-white",
  };
  return (
    <button type="button" className={`${base} ${styles[kind]}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

const TABS = [
  { id: "media", label: "Hình ảnh & Video" },
  { id: "copy", label: "Nội dung" },
  { id: "menu", label: "Thực đơn" },
  { id: "info", label: "Thông tin" },
  { id: "domain", label: "Tên miền" },
] as const;

const COPY_SECTIONS = [
  { key: "home", label: "Trang chủ" },
  { key: "about", label: "Về chúng tôi" },
  { key: "contact", label: "Liên hệ" },
  { key: "menuPage", label: "Trang thực đơn" },
  { key: "footer", label: "Footer" },
] as const;

const ASSET_DEFS = [
  { key: "logo", label: "Logo (vuông)", video: false },
  { key: "heroBanner", label: "Banner trang chủ (tỉ lệ 2:1)", video: false },
  { key: "contactVenue", label: "Ảnh mặt tiền (trang Liên hệ, 4:5)", video: false },
  { key: "video", label: "Video stop-motion (mp4)", video: true },
  { key: "videoPoster", label: "Poster video", video: false },
] as const;

export default function AdminPage() {
  const tokenRef = useRef("");
  const [authMode, setAuthMode] = useState<"loading" | "setup" | "login">("loading");
  const [password, setPassword] = useState("");
  const [patInput, setPatInput] = useState("");
  const [authed, setAuthed] = useState(false);
  const [content, setContent] = useState<Content>(null);
  const shaRef = useRef<string>("");
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("media");
  const [copySection, setCopySection] = useState<string>("home");
  const [copyLocale, setCopyLocale] = useState<"vi" | "en">("vi");
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState("");
  const [msg, setMsg] = useState("");
  const [deployState, setDeployState] = useState("");
  const [cname, setCname] = useState<{ value: string; sha: string } | null>(null);
  const [domainInput, setDomainInput] = useState("");

  const gh = useCallback(async (path: string, init?: RequestInit) => {
    const res = await fetch(`https://api.github.com${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${tokenRef.current}`,
        Accept: "application/vnd.github+json",
        ...(init?.headers || {}),
      },
    });
    if (!res.ok && res.status !== 404)
      throw new Error(`GitHub ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return res;
  }, []);

  /* ---------- load ---------- */
  const loadAll = useCallback(async () => {
    const res = await gh(`/repos/${REPO}/contents/${CONTENT_PATH}?ref=${BRANCH}`);
    if (res.status === 404) throw new Error("Không tìm thấy site-content.json");
    const data = await res.json();
    shaRef.current = data.sha;
    const parsed = JSON.parse(decodeUtf8(data.content));
    setContent(parsed);
    setDomainInput(parsed.domain || "");
    const cres = await gh(`/repos/${REPO}/contents/CNAME?ref=${BRANCH}`);
    if (cres.status === 404) setCname(null);
    else {
      const c = await cres.json();
      setCname({ value: decodeUtf8(c.content).trim(), sha: c.sha });
    }
    setAuthed(true);
    setMsg("");
  }, [gh]);

  useEffect(() => {
    localStorage.removeItem(LEGACY_TOKEN_KEY); // dọn token thô của bản cũ
    const id = setTimeout(() => {
      setAuthMode(localStorage.getItem(VAULT_KEY) ? "login" : "setup");
    }, 0);
    return () => clearTimeout(id);
  }, []);

  /* ---------- auth handlers ---------- */
  async function handleSetup() {
    if (patInput.trim().length < 20) {
      setMsg("Token không hợp lệ.");
      return;
    }
    if (password.length < 8) {
      setMsg("Mật khẩu cần tối thiểu 8 ký tự.");
      return;
    }
    setBusy("Đang kiểm tra token…");
    try {
      tokenRef.current = patInput.trim();
      await loadAll(); // token sai sẽ ném lỗi ở đây
      localStorage.setItem(VAULT_KEY, await encryptToken(tokenRef.current, password));
      setPatInput("");
      setPassword("");
    } catch (e) {
      tokenRef.current = "";
      setAuthed(false);
      setMsg(`Lỗi: ${e instanceof Error ? e.message : e}`);
    } finally {
      setBusy("");
    }
  }

  async function handleLogin() {
    setBusy("Đang mở khoá…");
    try {
      const vault = localStorage.getItem(VAULT_KEY);
      if (!vault) {
        setAuthMode("setup");
        return;
      }
      tokenRef.current = await decryptToken(vault, password);
      await loadAll();
      setPassword("");
    } catch (e) {
      tokenRef.current = "";
      setAuthed(false);
      const isDecrypt = e instanceof DOMException || e instanceof SyntaxError;
      setMsg(isDecrypt ? "Sai mật khẩu." : `Lỗi: ${e instanceof Error ? e.message : e}`);
    } finally {
      setBusy("");
    }
  }

  function resetVault() {
    localStorage.removeItem(VAULT_KEY);
    setPassword("");
    setMsg("");
    setAuthMode("setup");
  }

  /* ---------- helpers ---------- */
  function update(fn: (draft: Content) => void) {
    setContent((prev: Content) => {
      const next = structuredClone(prev);
      fn(next);
      return next;
    });
    setDirty(true);
  }

  async function pollDeploy() {
    setDeployState("Đang build & deploy… (~2 phút)");
    for (let i = 0; i < 40; i++) {
      await new Promise((r) => setTimeout(r, 8000));
      try {
        const res = await gh(`/repos/${REPO}/actions/runs?per_page=1&branch=${BRANCH}`);
        const run = (await res.json()).workflow_runs?.[0];
        if (!run) continue;
        if (run.status === "completed") {
          setDeployState(
            run.conclusion === "success"
              ? "✓ Đã deploy — thay đổi đã lên website."
              : `✗ Deploy lỗi (${run.conclusion}). Xem tab Actions trên GitHub.`
          );
          return;
        }
        setDeployState(`Đang build & deploy… (${run.status})`);
      } catch {
        /* bỏ qua lỗi poll */
      }
    }
    setDeployState("Không xác nhận được trạng thái — kiểm tra tab Actions trên GitHub.");
  }

  async function saveContent() {
    if (!content) return;
    setBusy("Đang lưu…");
    try {
      const body = {
        message: "Dashboard: cập nhật nội dung website",
        content: encodeUtf8(JSON.stringify(content, null, 2) + "\n"),
        sha: shaRef.current,
        branch: BRANCH,
      };
      const res = await gh(`/repos/${REPO}/contents/${CONTENT_PATH}`, {
        method: "PUT",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      shaRef.current = data.content.sha;
      setDirty(false);
      setMsg("Đã lưu. Website sẽ tự cập nhật sau ~2 phút.");
      pollDeploy();
    } catch (e) {
      setMsg(`Lỗi khi lưu: ${e instanceof Error ? e.message : e}`);
    } finally {
      setBusy("");
    }
  }

  async function uploadFile(file: File, repoPath: string): Promise<string> {
    // repoPath ví dụ "public/uploads/169..-ten.png" → trả về đường dẫn web "/uploads/..."
    const existing = await gh(`/repos/${REPO}/contents/${repoPath}?ref=${BRANCH}`);
    const sha = existing.status === 404 ? undefined : (await existing.json()).sha;
    await gh(`/repos/${REPO}/contents/${repoPath}`, {
      method: "PUT",
      body: JSON.stringify({
        message: `Dashboard: upload ${repoPath}`,
        content: await fileToB64(file),
        branch: BRANCH,
        ...(sha ? { sha } : {}),
      }),
    });
    return repoPath.replace(/^public/, "");
  }

  function pickFile(accept: string, onPick: (f: File) => void) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.onchange = () => input.files?.[0] && onPick(input.files[0]);
    input.click();
  }

  function safeName(name: string) {
    return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  }

  function slugifyVi(name: string) {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleAssetUpload(key: string, video: boolean) {
    pickFile(video ? "video/mp4" : "image/*", async (f) => {
      setBusy(`Đang upload ${f.name}…`);
      try {
        const webPath = await uploadFile(f, `public/uploads/${Date.now()}-${safeName(f.name)}`);
        update((d) => (d.assets[key] = webPath));
        setMsg(`Đã upload ${f.name}. Bấm “Lưu & Deploy” để áp dụng.`);
      } catch (e) {
        setMsg(`Lỗi upload: ${e instanceof Error ? e.message : e}`);
      } finally {
        setBusy("");
      }
    });
  }

  async function handleItemImageUpload(gi: number, ii: number) {
    const item = content.menu.groups[gi].items[ii];
    const slug = slugifyVi(item.name);
    pickFile("image/*", async (f) => {
      setBusy(`Đang upload ảnh cho ${item.name}…`);
      try {
        const ext = f.name.split(".").pop() || "png";
        const webPath = await uploadFile(f, `public/uploads/menu-${slug}-${Date.now()}.${ext}`);
        update((d) => (d.menu.groups[gi].items[ii].img = webPath));
        setMsg(`Đã upload ảnh ${item.name}. Bấm “Lưu & Deploy” để áp dụng.`);
      } catch (e) {
        setMsg(`Lỗi upload: ${e instanceof Error ? e.message : e}`);
      } finally {
        setBusy("");
      }
    });
  }

  async function saveDomain() {
    setBusy("Đang lưu tên miền…");
    try {
      const domain = domainInput.trim();
      // 1) CNAME file
      if (domain) {
        await gh(`/repos/${REPO}/contents/CNAME`, {
          method: "PUT",
          body: JSON.stringify({
            message: `Dashboard: đặt tên miền ${domain}`,
            content: encodeUtf8(domain + "\n"),
            branch: BRANCH,
            ...(cname ? { sha: cname.sha } : {}),
          }),
        });
      } else if (cname) {
        await gh(`/repos/${REPO}/contents/CNAME`, {
          method: "DELETE",
          body: JSON.stringify({
            message: "Dashboard: gỡ tên miền",
            sha: cname.sha,
            branch: BRANCH,
          }),
        });
      }
      // 2) Pages custom domain (có thể fail nếu token thiếu quyền admin — không sao)
      try {
        await gh(`/repos/${REPO}/pages`, {
          method: "PUT",
          body: JSON.stringify({ cname: domain || null }),
        });
      } catch {
        setMsg("Đã ghi CNAME. Lưu ý: cần vào Settings → Pages đặt Custom domain thủ công (token thiếu quyền).");
      }
      // 3) domain trong content (metadata/sitemap dùng khi build)
      update((d) => (d.domain = domain));
      await new Promise((r) => setTimeout(r, 50));
      setMsg(
        domain
          ? `Đã đặt tên miền ${domain}. Nhớ bấm “Lưu & Deploy”, và trỏ DNS theo hướng dẫn bên dưới.`
          : "Đã gỡ tên miền. Nhớ bấm “Lưu & Deploy”."
      );
      // refresh CNAME sha
      const cres = await gh(`/repos/${REPO}/contents/CNAME?ref=${BRANCH}`);
      setCname(cres.status === 404 ? null : await cres.json().then((c) => ({ value: decodeUtf8(c.content).trim(), sha: c.sha })));
    } catch (e) {
      setMsg(`Lỗi: ${e instanceof Error ? e.message : e}`);
    } finally {
      setBusy("");
    }
  }

  /* ---------- login gate ---------- */
  if (!authed) {
    const inputCls =
      "mb-4 w-full rounded border border-ink/20 bg-white px-4 py-3 text-sm focus:border-ember focus:outline-none";
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
        <h1 className="mb-2 font-display text-3xl font-normal tracking-[-0.02em]">
          Bunbun <span className="text-ember italic">Dashboard</span>
        </h1>

        {authMode === "login" && (
          <>
            <p className="mb-8 text-sm leading-relaxed text-body">
              Nhập mật khẩu để mở khoá dashboard trên máy này.
            </p>
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && password && handleLogin()}
              className={inputCls}
              autoFocus
            />
            <Btn onClick={handleLogin} disabled={!password || !!busy}>
              {busy || "Đăng nhập"}
            </Btn>
            <button
              onClick={resetVault}
              className="mt-5 self-start text-xs tracking-[0.1em] text-stone uppercase underline-offset-2 hover:text-ember hover:underline"
            >
              Quên mật khẩu? Thiết lập lại bằng GitHub token
            </button>
          </>
        )}

        {authMode === "setup" && (
          <>
            <p className="mb-8 text-sm leading-relaxed text-body">
              Thiết lập một lần cho máy này: dán GitHub Personal Access Token
              (quyền <code className="rounded bg-ink/5 px-1">repo</code>, tạo
              tại GitHub → Settings → Developer settings → Tokens) và tự đặt
              mật khẩu. Từ lần sau chỉ cần gõ mật khẩu — token được mã hoá
              lưu ngay trên máy, không gửi đi đâu ngoài GitHub.
            </p>
            <input
              type="password"
              placeholder="GitHub token (ghp_…)"
              value={patInput}
              onChange={(e) => setPatInput(e.target.value)}
              className={inputCls}
            />
            <input
              type="password"
              placeholder="Đặt mật khẩu dashboard (≥ 8 ký tự)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && patInput && password && handleSetup()
              }
              className={inputCls}
            />
            <Btn onClick={handleSetup} disabled={!patInput || !password || !!busy}>
              {busy || "Thiết lập & Đăng nhập"}
            </Btn>
          </>
        )}

        {authMode === "loading" && (
          <p className="text-sm text-stone">Đang tải…</p>
        )}

        {msg ? <p className="mt-4 text-sm text-red-700">{msg}</p> : null}
      </main>
    );
  }

  const t = content;

  return (
    <main className="mx-auto max-w-[1100px] px-5 pt-8 pb-24 md:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-normal tracking-[-0.02em]">
          Bunbun <span className="text-ember italic">Dashboard</span>
        </h1>
        <div className="flex items-center gap-3">
          <Btn onClick={saveContent} disabled={!dirty || !!busy}>
            {busy || (dirty ? "Lưu & Deploy" : "Đã lưu")}
          </Btn>
          <Btn
            kind="ghost"
            onClick={() => location.reload()}
          >
            Thoát
          </Btn>
        </div>
      </div>

      {(msg || deployState) && (
        <div className="mb-6 rounded border border-ember/30 bg-ember/5 px-4 py-3 text-sm">
          {msg && <div>{msg}</div>}
          {deployState && <div className="mt-1 text-stone-dark">{deployState}</div>}
        </div>
      )}

      {/* Tabs */}
      <div className="mb-8 flex gap-x-6 gap-y-2 overflow-x-auto border-b [border-color:rgba(25,20,16,0.15)] [scrollbar-width:none]">
        {TABS.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className="shrink-0 border-b-2 pb-3 text-[13px] tracking-[0.1em] uppercase transition-colors"
            style={{
              borderColor: tab === tb.id ? "var(--color-ember)" : "transparent",
              color: tab === tb.id ? "var(--color-ember)" : "var(--color-ink)",
              fontWeight: tab === tb.id ? 600 : 400,
            }}
          >
            {tb.label}
          </button>
        ))}
      </div>

      {/* ---------- TAB: MEDIA ---------- */}
      {tab === "media" && (
        <div className="grid gap-6 md:grid-cols-2">
          {/* Favicon: file cố định src/app/icon.png, không qua JSON */}
          <div className="rounded border border-ink/10 bg-white p-4">
            <div className="mb-3 text-[11px] tracking-[0.14em] text-stone uppercase">
              Favicon (biểu tượng tab trình duyệt, PNG vuông)
            </div>
            <div className="mb-3 flex h-36 items-center justify-center overflow-hidden rounded bg-placeholder">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://raw.githubusercontent.com/${REPO}/${BRANCH}/src/app/icon.png`}
                alt="Favicon"
                className="h-16 w-16 object-contain"
              />
            </div>
            <div className="mb-3 truncate text-xs text-stone">src/app/icon.png</div>
            <Btn
              kind="ghost"
              disabled={!!busy}
              onClick={() =>
                pickFile("image/png", async (f) => {
                  setBusy("Đang upload favicon…");
                  try {
                    await uploadFile(f, "src/app/icon.png");
                    setMsg("Đã thay favicon — website tự build lại sau ~2 phút (không cần bấm Lưu).");
                    pollDeploy();
                  } catch (e) {
                    setMsg(`Lỗi upload: ${e instanceof Error ? e.message : e}`);
                  } finally {
                    setBusy("");
                  }
                })
              }
            >
              Thay favicon
            </Btn>
          </div>
          {ASSET_DEFS.map((a) => (
            <div key={a.key} className="rounded border border-ink/10 bg-white p-4">
              <div className="mb-3 text-[11px] tracking-[0.14em] text-stone uppercase">
                {a.label}
              </div>
              <div className="mb-3 flex h-36 items-center justify-center overflow-hidden rounded bg-placeholder">
                {a.video ? (
                  <video src={`${RAW_BASE}${t.assets[a.key]}`} className="h-full" muted playsInline />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`${RAW_BASE}${t.assets[a.key]}`} alt={a.label} className="h-full object-contain" />
                )}
              </div>
              <div className="mb-3 truncate text-xs text-stone">{t.assets[a.key]}</div>
              <Btn kind="ghost" onClick={() => handleAssetUpload(a.key, a.video)} disabled={!!busy}>
                Thay {a.video ? "video" : "ảnh"}
              </Btn>
            </div>
          ))}
        </div>
      )}

      {/* ---------- TAB: COPY ---------- */}
      {tab === "copy" && (
        <div>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <select
              value={copySection}
              onChange={(e) => setCopySection(e.target.value)}
              className="rounded border border-ink/20 bg-white px-3 py-2 text-sm"
            >
              {COPY_SECTIONS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
              <option value="marquee">Dải chữ chạy (marquee)</option>
              <option value="seo">SEO (tiêu đề & mô tả Google)</option>
            </select>
            <div className="flex overflow-hidden rounded-full border border-ink/20">
              {(["vi", "en"] as const).map((lc) => (
                <button
                  key={lc}
                  onClick={() => setCopyLocale(lc)}
                  className="px-4 py-1.5 text-xs font-semibold tracking-[0.12em] uppercase"
                  style={{
                    background: copyLocale === lc ? "var(--color-ink)" : "transparent",
                    color: copyLocale === lc ? "var(--color-paper)" : "var(--color-ink)",
                  }}
                >
                  {lc}
                </button>
              ))}
            </div>
          </div>

          {copySection === "marquee" ? (
            <div className="grid gap-4 md:max-w-lg">
              {t.copy.marquee[copyLocale].map((item: any, i: number) => (
                <Field
                  key={i}
                  label={`Cụm ${i + 1}${item.emphasis ? " (in nghiêng cam)" : ""}`}
                  value={item.text}
                  onChange={(v) => update((d) => (d.copy.marquee[copyLocale][i].text = v))}
                />
              ))}
            </div>
          ) : copySection === "seo" ? (
            <div className="grid gap-6">
              {(
                [
                  { key: "home", label: "Trang chủ" },
                  { key: "menu", label: "Thực đơn" },
                  { key: "about", label: "Về chúng tôi" },
                  { key: "contact", label: "Liên hệ" },
                ] as const
              ).map((pg) => (
                <div key={pg.key} className="rounded border border-ink/10 bg-white p-4">
                  <div className="mb-3 font-display text-base">{pg.label}</div>
                  <div className="grid gap-3">
                    <Field
                      label="Tiêu đề (thẻ title)"
                      value={t.seo[pg.key][copyLocale].title}
                      onChange={(v) => update((d) => (d.seo[pg.key][copyLocale].title = v))}
                    />
                    <Field
                      label="Mô tả (meta description)"
                      textarea
                      value={t.seo[pg.key][copyLocale].description}
                      onChange={(v) => update((d) => (d.seo[pg.key][copyLocale].description = v))}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {Object.entries(t.copy[copySection][copyLocale]).map(([key, val]) => (
                <Field
                  key={key}
                  label={key}
                  value={val as string}
                  textarea={(val as string).length > 60}
                  onChange={(v) => update((d) => (d.copy[copySection][copyLocale][key] = v))}
                />
              ))}
            </div>
          )}
          {copySection === "about" && (
            <div className="mt-6 rounded border border-ink/10 bg-white p-4">
              <div className="mb-3 font-display text-base">
                3 số liệu cuối trang (chung cho VI/EN — nhãn chữ sửa ở stat1/2/3 phía trên)
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Field label="Số liệu 1" value={t.stats.s1} onChange={(v) => update((d) => (d.stats.s1 = v))} />
                <Field label="Số liệu 2" value={t.stats.s2} onChange={(v) => update((d) => (d.stats.s2 = v))} />
                <Field label="Số liệu 3" value={t.stats.s3} onChange={(v) => update((d) => (d.stats.s3 = v))} />
              </div>
            </div>
          )}
          <p className="mt-6 text-xs leading-relaxed text-stone">
            Các cặp <code>…Pre / …Italic / …Post</code> là một câu được tách 3 phần —
            phần <code>Italic</code> hiển thị in nghiêng màu cam.
          </p>
        </div>
      )}

      {/* ---------- TAB: MENU ---------- */}
      {tab === "menu" && (
        <div className="flex flex-col gap-8">
          {t.menu.groups.map((g: any, gi: number) => (
            <div key={gi} className="rounded border border-ink/10 bg-white p-4 md:p-6">
              <div className="mb-4 grid gap-3 md:grid-cols-2">
                <Field label="Tên nhóm (VI)" value={g.name} onChange={(v) => update((d) => (d.menu.groups[gi].name = v))} />
                <Field label="Tên nhóm (EN)" value={g.en} onChange={(v) => update((d) => (d.menu.groups[gi].en = v))} />
                <Field label="Ghi chú (VI)" value={g.note} onChange={(v) => update((d) => (d.menu.groups[gi].note = v))} />
                <Field label="Ghi chú (EN)" value={g.noteEn} onChange={(v) => update((d) => (d.menu.groups[gi].noteEn = v))} />
              </div>

              {g.items.map((it: any, ii: number) => (
                <div key={ii} className="mb-3 rounded border border-ink/10 p-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-placeholder">
                        {it.img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={`${RAW_BASE}${it.img}`} alt={it.name} className="h-full w-full object-cover" />
                        ) : null}
                      </div>
                      <button
                        className="text-xs tracking-[0.1em] text-ember uppercase underline-offset-2 hover:underline"
                        onClick={() => handleItemImageUpload(gi, ii)}
                      >
                        {it.img ? "Đổi ảnh" : "Thêm ảnh"}
                      </button>
                      <label className="flex cursor-pointer items-center gap-1.5 text-xs text-stone-dark">
                        <input
                          type="checkbox"
                          className="accent-[#FF5A1F]"
                          checked={t.signatureSlugs.includes(slugifyVi(it.name))}
                          onChange={(e) =>
                            update((d) => {
                              const slug = slugifyVi(it.name);
                              if (e.target.checked) {
                                if (d.signatureSlugs.length >= 4) {
                                  setMsg("Trang chủ chỉ hiển thị 4 món signature — bỏ chọn một món khác trước.");
                                  return;
                                }
                                d.signatureSlugs.push(slug);
                              } else {
                                d.signatureSlugs = d.signatureSlugs.filter((s: string) => s !== slug);
                              }
                            })
                          }
                        />
                        Signature trang chủ ({t.signatureSlugs.length}/4)
                      </label>
                    </div>
                    <Btn kind="danger" onClick={() => update((d) => d.menu.groups[gi].items.splice(ii, 1))}>
                      Xoá món
                    </Btn>
                  </div>
                  <div className="grid gap-3 md:grid-cols-3">
                    <Field label="Tên món (VI)" value={it.name} onChange={(v) => update((d) => (d.menu.groups[gi].items[ii].name = v))} />
                    <Field label="Tên món (EN)" value={it.en?.name ?? ""} onChange={(v) => update((d) => (d.menu.groups[gi].items[ii].en.name = v))} />
                    <Field label="Giá (đ)" value={String(it.price)} onChange={(v) => update((d) => (d.menu.groups[gi].items[ii].price = parseInt(v.replace(/\D/g, "")) || 0))} />
                    <Field label="Mô tả (VI)" value={it.desc} onChange={(v) => update((d) => (d.menu.groups[gi].items[ii].desc = v))} />
                    <Field label="Mô tả (EN)" value={it.en?.desc ?? ""} onChange={(v) => update((d) => (d.menu.groups[gi].items[ii].en.desc = v))} />
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Tag (VI)" value={it.tag ?? ""} onChange={(v) => update((d) => { const item = d.menu.groups[gi].items[ii]; if (v) item.tag = v; else delete item.tag; })} />
                      <Field label="Tag (EN)" value={it.en?.tag ?? ""} onChange={(v) => update((d) => { const en = d.menu.groups[gi].items[ii].en; if (v) en.tag = v; else delete en.tag; })} />
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-3 flex flex-wrap gap-3">
                <Btn
                  kind="ghost"
                  onClick={() =>
                    update((d) =>
                      d.menu.groups[gi].items.push({
                        name: "Món mới",
                        price: 0,
                        desc: "",
                        en: { name: "New dish", desc: "" },
                      })
                    )
                  }
                >
                  + Thêm món
                </Btn>
                <Btn kind="danger" onClick={() => update((d) => d.menu.groups.splice(gi, 1))}>
                  Xoá nhóm này
                </Btn>
              </div>
            </div>
          ))}
          <Btn
            kind="ghost"
            onClick={() =>
              update((d) =>
                d.menu.groups.push({
                  id: `nhom-${Date.now()}`,
                  name: "Nhóm mới",
                  en: "New group",
                  note: "",
                  noteEn: "",
                  items: [],
                })
              )
            }
          >
            + Thêm nhóm món
          </Btn>
        </div>
      )}

      {/* ---------- TAB: INFO ---------- */}
      {tab === "info" && (
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-lg">Liên hệ</h2>
            <Field label="Hotline (hiển thị)" value={t.contact.phoneDisplay} onChange={(v) => update((d) => (d.contact.phoneDisplay = v))} />
            <Field label="Hotline (số gọi, không cách)" value={t.contact.phoneTel} onChange={(v) => update((d) => (d.contact.phoneTel = v))} />
            <Field label="Email" value={t.contact.email} onChange={(v) => update((d) => (d.contact.email = v))} />
            <h2 className="mt-4 font-display text-lg">Liên kết đặt món</h2>
            <Field label="iPOS Web Order" value={t.links.order} onChange={(v) => update((d) => (d.links.order = v))} />
            <Field label="ShopeeFood" value={t.links.shopee} onChange={(v) => update((d) => (d.links.shopee = v))} />
            <Field label="Facebook" value={t.links.facebook} onChange={(v) => update((d) => (d.links.facebook = v))} />
            <Field label="GrabFood (để trống = hiện 'Sắp có')" value={t.links.grab ?? ""} onChange={(v) => update((d) => (d.links.grab = v))} />
            <Field label="Zalo Mini App (để trống = hiện 'Sắp có')" value={t.links.zalo ?? ""} onChange={(v) => update((d) => (d.links.zalo = v))} />
            <h2 className="mt-4 font-display text-lg">Thương hiệu</h2>
            <Field label="Tên hiển thị (nav, footer, tiêu đề tab)" value={t.brand.name} onChange={(v) => update((d) => (d.brand.name = v))} />
          </div>
          <div className="flex flex-col gap-4">
            {t.contact.venues.map((v: any, vi: number) => (
              <div key={vi} className="flex flex-col gap-3 rounded border border-ink/10 bg-white p-4">
                <h2 className="font-display text-lg">Cơ sở {vi + 1}</h2>
                <Field label="Địa chỉ dòng 1" value={v.addressLines[0]} onChange={(val) => update((d) => (d.contact.venues[vi].addressLines[0] = val))} />
                <Field label="Địa chỉ dòng 2" value={v.addressLines[1] ?? ""} onChange={(val) => update((d) => (d.contact.venues[vi].addressLines[1] = val))} />
                <Field label="Từ khoá Google Maps" value={v.mapQuery} onChange={(val) => update((d) => (d.contact.venues[vi].mapQuery = val))} />
              </div>
            ))}
            <div className="flex flex-col gap-3 rounded border border-ink/10 bg-white p-4">
              <h2 className="font-display text-lg">Giờ mở cửa</h2>
              {(["vi", "en"] as const).map((lc) =>
                t.contact.hours[lc].map((h: any, hi: number) => (
                  <div key={`${lc}-${hi}`} className="grid grid-cols-2 gap-3">
                    <Field label={`Ngày (${lc.toUpperCase()})`} value={h.days} onChange={(v) => update((d) => (d.contact.hours[lc][hi].days = v))} />
                    <Field label="Giờ" value={h.time} onChange={(v) => update((d) => (d.contact.hours[lc][hi].time = v))} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------- TAB: DOMAIN ---------- */}
      {tab === "domain" && (
        <div className="max-w-2xl">
          <div className="mb-6 rounded border border-ink/10 bg-white p-5">
            <div className="mb-1 text-[11px] tracking-[0.14em] text-stone uppercase">Hiện tại</div>
            <div className="font-display text-lg">
              {cname?.value ? (
                <>Domain riêng: <span className="text-ember">{cname.value}</span></>
              ) : (
                <>Chưa có domain riêng — đang dùng mynameizluan.github.io/bunbun-website</>
              )}
            </div>
          </div>
          <div className="mb-4 flex flex-wrap items-end gap-3">
            <div className="grow">
              <Field label="Tên miền (ví dụ: bunbunburger.vn — để trống để gỡ)" value={domainInput} onChange={setDomainInput} />
            </div>
            <Btn onClick={saveDomain} disabled={!!busy}>Lưu tên miền</Btn>
          </div>
          <div className="rounded border border-ember/30 bg-ember/5 p-5 text-sm leading-relaxed">
            <p className="mb-2 font-semibold">Sau khi mua tên miền, trỏ DNS như sau (tại trang quản lý domain):</p>
            <ul className="list-disc pl-5">
              <li>Bản ghi <b>A</b> cho <code>@</code> → <code>185.199.108.153</code>, <code>185.199.109.153</code>, <code>185.199.110.153</code>, <code>185.199.111.153</code></li>
              <li>Bản ghi <b>CNAME</b> cho <code>www</code> → <code>mynameizluan.github.io</code></li>
            </ul>
            <p className="mt-2">DNS có hiệu lực sau vài phút đến vài giờ. Sau đó vào GitHub → Settings → Pages bật <b>Enforce HTTPS</b>. Việc mua domain cần bạn tự thực hiện (cần thông tin thanh toán cá nhân).</p>
          </div>
        </div>
      )}
    </main>
  );
}
