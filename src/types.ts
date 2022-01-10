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

export interface Address {
  id: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface Person {
  id: string;
  name: string;
  cpf: string;
  contacts: Contact[];
  addresses: Address[];
}

export interface User {
  id: string;
  email: string;
  avatar: string;
  roles: Role[];

  person: Person;
}
