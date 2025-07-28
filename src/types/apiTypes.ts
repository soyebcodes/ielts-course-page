// types/apiTypes.ts
export interface Media {
  name: string;
  resource_type: string;
  resource_value: string;
  thumbnail_url?: string;
}

export interface Checklist {
  text: string;
  icon?: string;
  color?: string;
  id?: string;
  list_page_visibility?: boolean;
}

export interface Instructor {
  name: string;
  title: string;
  image: string;
  bio: string;
  short_description?: string;
  slug?: string;
  has_instructor_page?: boolean;
  description?: string;
}

export interface Feature {
  title: string;
  subtitle: string;
  icon: string;
  id?: string;
}

export interface AboutContent {
  title: string;
  description: string;
  icon?: string;
  id?: string;
}

export interface Section {
  type: string;
  name?: string;
  description?: string;
  bg_color?: string;
  order_idx?: number;
  values?: any[]; // Can be more specific based on section type
}

export interface ProductData {
  slug: string;
  id: number;
  title: string;
  description: string;
  media: Media[];
  checklist: Checklist[];
  cta_text: {
    name: string;
    value?: string;
  };
  sections: Section[];
  // Add other fields from your API response
}
