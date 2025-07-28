export interface Media {
  type: string;
  url: string;
  thumbnail?: string;
}

export interface Checklist {
  text: string;
}

export interface Seo {
  title: string;
  description: string;
  keywords: string[];
}

export interface CtaText {
  primary: string;
  secondary?: string;
}

export interface Instructor {
  name: string;
  title: string;
  image: string;
  bio: string;
}

export interface Section {
  type: string;
  title?: string;
  items?: any[];
  content?: string;
}

export interface ProductData {
  slug: string;
  id: number;
  title: string;
  description: string;
  media: Media[];
  checklist: Checklist[];
  seo: Seo;
  cta_text: CtaText;
  sections: Section[];
}
