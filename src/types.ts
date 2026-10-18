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
   * Your talking avatar video. Put the file in /public/media and write "media/hero.mp4".
   * Leave empty ("") to use only the image in `poster`. See README, "Create your animated hero".
   */
  video: string;
  /**
   * Your hero image: shown while the video loads, or on its own when `video` is empty.
   * Use a .jpg on a white background (the white blends into the page) or a transparent .png.
   */
  poster: string;
  /**
   * Optional. The same video with a transparent background (.webm, VP9 with alpha).
   * Chrome, Edge, Firefox and Android use it so your name shows around you.
   * Safari and iPhone fall back to `video`. See README, "Optional extras for Path 2".
   */
  videoTransparent?: string;
  /** Optional transparent poster (.webp or .png) to pair with videoTransparent. */
  posterTransparent?: string;
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

export type Job = {
  role: string;
  company: string;
  location?: string;
  /** Free text, for example "05/2022" or "2019". */
  start: string;
  /** Free text, for example "Present". */
  end: string;
  /** One sentence on the job, shown under the title. Optional. */
  summary?: string;
  /** What you did and what changed. Lead with the result. */
  highlights: string[];
  /** Tools used in this role. Shown as small tags. */
  stack?: string[];
};

export type ExperienceConfig = {
  title: RichTitle;
  subtitle?: string;
  jobs: Job[];
  /** Older roles shown as a compact list. */
  earlier?: { role: string; company: string; years: string }[];
  education?: { degree: string; school: string; years: string }[];
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
    /** Optional. Your resume PDF in /public/media, e.g. "media/resume.pdf". Adds a Download resume button. */
    resumePdf?: string;
  };
  hero: HeroConfig;
  about: AboutConfig;
  /** Leave out (or delete) to hide the experience section. */
  experience?: ExperienceConfig;
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
