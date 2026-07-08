import content from "@/data/site-content.json";

export const ORDER_URL = content.links.order;
export const SHOPEE_URL = content.links.shopee;
export const FACEBOOK_URL = content.links.facebook;
export const PHONE_DISPLAY = content.contact.phoneDisplay;
export const PHONE_TEL = `tel:${content.contact.phoneTel}`;
export const EMAIL = content.contact.email;

export type Venue = {
  address: string;
  addressLines: string[];
  mapQuery: string;
};

function venue(i: number): Venue {
  const v = content.contact.venues[i];
  return {
    address: v.addressLines.join(" "),
    addressLines: v.addressLines,
    mapQuery: v.mapQuery,
  };
}

export const VENUE_1 = venue(0);
export const VENUE_2 = venue(1);
