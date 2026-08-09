export interface NavLink {
  label: string;
  href: string;
}

export interface MajorDirection {
  label: string;
}

export interface MajorGroup {
  slug: string;
  title: string;
  image: string;
  directions: MajorDirection[];
  intro: string;
  highlights: string[];
}

export interface NewsItem {
  title: string;
  date: string;
  excerpt: string;
  image: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface MenuGroup {
  title: string;
  links: NavLink[];
}

export interface FieldWorkSection {
  title: string;
  body?: string;
  qrImage?: string;
}

export interface FieldWork {
  id: string;
  title: string;
  year: string;
  cardImage: string;
  popupImage: string;
  category1: string;
  category2: string;
  audienceTag: string;
  typeTag: string;
  credits: string[];
  sections: FieldWorkSection[];
}
