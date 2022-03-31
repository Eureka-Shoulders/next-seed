import TYPES from '@containers/global.types';
import { inject, injectable } from 'inversify';
import { Contact } from 'types';

import { HttpService, Repository } from '@euk-labs/fetchx';

import { NewPersonSchema } from './people.schema';

export type ICreatePerson = Omit<NewPersonSchema, 'contacts' | 'type'> & {
  contacts: Omit<Contact, 'id'>[];
};

@injectable()
class PeopleRepository extends Repository {
  constructor(@inject(TYPES.ApiService) apiService: HttpService) {
    super(apiService, { path: '/people' });
  }
}

export default PeopleRepository;
