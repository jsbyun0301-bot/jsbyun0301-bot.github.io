export type NavItem = { name: string; target: string };

export type Badge = { label: string; imgUrl: string };

export type Project = {
  title: string;
  subtitle?: string;
  role: string;
  period?: string;
  teamSize?: string;
  highlights?: string[];
  points: string[];
  stacks: string[];
  link?: string;
  thumbnail?: string;
};

export type About = {
  name: string;
  role: string;
  birth: string;
  avatarSrc: string;
  paragraphs: string[];
};

export type ContactItem = {
  label: string;
  value: string;
  href?: string;
  emoji?: string;
};

export type Contact = {
  items: ContactItem[];
};

export type CareerProject = {
  title: string;
  summary: string;
  contributions: string[];
  outcomes?: string[];
  stacks?: string[];
};

export type CareerEntry = {
  org: string;
  period: string;
  role: string;
  highlights?: string[];
  stacks?: string[];
  projects?: CareerProject[];
};

export type EducationEntry = {
  school: string;
  majors: string[];
  period: string;
  notes?: string[];
};

export type ExperienceSection = {
  title: string;
  lines: string[];
};
