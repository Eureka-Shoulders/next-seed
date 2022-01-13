import { ThemeType } from 'stores/ThemeStore';

import Enum from './utils/Enum';

export interface HydrationData {
  theme: ThemeType;
}

export interface Role {
  id: string;
  name: string;
  ability: string;
}

export enum ContactType {
  Telefone = 'PHONE',
  'E-mail' = 'EMAIL',
  Facebook = 'FACEBOOK',
  Twitter = 'TWITTER',
  Instagram = 'INSTAGRAM',
  LinkedIn = 'LINKEDIN',
  GitHub = 'GITHUB',
  Website = 'WEBSITE',
}
export const ContactTypeEnum = new Enum(ContactType);

export interface Contact {
  id: string;
  type: ContactType;
  value: string;
}

export interface Address {
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface Person {
  id: string;
  name: string;
  identifier: string;
  contacts: Contact[];
  addresses: Address[];
}

export interface User {
  id: string;
  email: string;
  avatar: string | null;
  roles: Role[];

  person: Person;
  personId: string;
  password?: string;
}
