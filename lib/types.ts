import type { IconName } from "./icons";

export type PropertyType =
  | "Hotel"
  | "Apartment"
  | "House"
  | "B&B"
  | "Room"
  | "Other";

export interface Listing {
  slug: string;
  name: string;
  type: PropertyType;
  /** Town as a guest would recognise it. */
  town: string;
  /** Verified against api.postcodes.io — also what the distance is computed from. */
  postcode: string;
  blurb: string;
  /** Illustration under /public, not a photograph of the property. */
  image: string;
  /** Straight-line miles to the Kempston Hardwick site. Not road distance. */
  miles: number;
  /** Official site. Omitted where the URL could not be confirmed. */
  website?: string;
}

export interface PropertyTypeCard {
  type: PropertyType;
  label: string;
  icon: IconName;
  blurb: string;
}

export interface ValueProp {
  icon: IconName;
  title: string;
  text: string;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export type SortKey = "nearest" | "name";
