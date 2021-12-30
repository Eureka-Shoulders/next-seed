import { ThemeType } from 'stores/ThemeStore';

export interface HydrationData {
  theme: ThemeType;
}

export interface Role {
  id: string;
  name: string;
  ability: string;
}

enum ContactType {
  Phone = 'PHONE',
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Twitter = 'TWITTER',
  Instagram = 'INSTAGRAM',
  Linkedin = 'LINKEDIN',
  GitHub = 'GITHUB',
  Website = 'WEBSITE',
}

export interface Contact {
  id: string;
  type: ContactType;
  value: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  roles: Role[];
  contacts: Contact[];
}
