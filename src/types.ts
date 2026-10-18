// Shapes for portfolio.config.ts. You should not need to edit this file.

export type Link = { label: string; href: string };

/** Text with *asterisks* around a word renders that word in italic serif. */
export type RichTitle = string;

export type HeroConfig = {
  /** Small line above the title, e.g. "Azure SME / Cloud Platform Engineer" */
  eyebrow: string;
  /** Big title at bottom-left. Use *word* for the italic serif accent. */
  title: RichTitle;
  intro: string;
  /** Giant faded word behind your video. Usually your first name. */
  backdropWord: string;
  /**
   * Your talking avatar. Put the file in /public/media and write "media/hero.mp4".
   * Leave empty ("") to show a placeholder.
   */
  video: string;
  /** Optional still image shown before the video loads (or instead of a video). */
  poster: string;
  primaryCta: Link;
  secondaryCta?: Link;
  /** Two or three tiny facts shown at bottom-right of the hero. */
  quickFacts: { value: string; label: string }[];
};

export type BadgeConfig = {
  /** Text at the top of the badge, e.g. your brand or "Cloud Ops" */
  org: string;
  photo: string;
  role: string;
  idNumber: string;
  /** Rows printed on the back of the badge. */
  back: { label: string; value: string }[];
};

export type AboutConfig = {
  greeting: RichTitle;
  paragraphs: string[];
  buttons: Link[];
  facts: { label: string; value: string }[];
  badge: BadgeConfig;
};

export type Element = {
  /** 1 or 2 letters shown big, e.g. "Az" */
  symbol: string;
  name: string;
  /** Must match one of skills.groups[].id */
  group: string;
  /** Short line shown when someone hovers the tile. */
  note?: string;
};

export type SkillsConfig = {
  title: RichTitle;
  subtitle: string;
  groups: { id: string; label: string }[];
  elements: Element[];
};

export type Cert = { name: string; issuer: string; year: string; href?: string };

export type Project = {
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  status: string;
  link?: Link;
};

export type Moment = { value: string; unit?: string; title: string; detail: string };

export type PortfolioConfig = {
  site: {
    /** Browser tab title and Google title */
    title: string;
    description: string;
    /** Short name shown in the top-left of the nav */
    logo: string;
    /** One accent colour. Everything else is black and white. */
    accent: string;
    /** Shows "Template by ..." in the footer. Set to false to hide it. */
    showCredit: boolean;
  };
  hero: HeroConfig;
  about: AboutConfig;
  skills: SkillsConfig;
  /** Leave as [] to hide the certifications section. */
  certifications: Cert[];
  projects: Project[];
  moments: { title: RichTitle; subtitle: string; items: Moment[] };
  contact: {
    title: RichTitle;
    text: string;
    email: string;
    links: Link[];
    cta?: Link;
  };
};
