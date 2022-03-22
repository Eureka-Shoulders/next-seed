import { ContactTypeEnum, Person } from 'types';

import { UpdatePersonSchema } from './people.schema';

export function getInitialValuesForUpdate(person: Person): UpdatePersonSchema {
  return {
    ...person,
    birthDate: new Date(person.birthDate),
    contacts: person.contacts.map((contact) => ({
      ...contact,
      type: {
        label: ContactTypeEnum.getKey(contact.type),
        value: contact.type,
      },
    })),
  };
}

export const initialValuesForCreate = {
  name: '',
  type: null,
  identifier: '',
  birthDate: null,
  contacts: [],
  addresses: [],
};
