import { HttpService } from '@euk-labs/fetchx';
import { inject, injectable } from 'inversify';
import { Contact } from 'types';

import TYPES from '@containers/global.types';

import Repository from '@services/http';

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
