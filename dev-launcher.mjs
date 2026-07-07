// Launcher cho preview sandbox: ép cwd về project trước khi chạy Next,
// vì tiến trình preview khởi động với cwd không truy cập được (EPERM).
const ROOT = "/Users/minhluan/Downloads/bunbun-website";
process.chdir(ROOT);
process.argv = [process.argv[0], `${ROOT}/node_modules/next/dist/bin/next`, "dev", "--webpack", ROOT];
await import(`${ROOT}/node_modules/next/dist/bin/next`);
