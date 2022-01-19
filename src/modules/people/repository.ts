import TYPES from 'containers/global.types';
import { decorate, inject, injectable } from 'inversify';
import { Contact } from 'types';

import { HttpService, Repository } from '@euk-labs/fetchx';

import { NewPersonSchema } from './people.schema';

export type ICreatePerson = Omit<NewPersonSchema, 'contacts'> & {
  contacts: Omit<Contact, 'id'>[];
};

class PeopleRepository extends Repository {
  constructor(apiService: HttpService) {
    super(apiService, { path: '/people' });
  }
}

decorate(injectable(), PeopleRepository);
decorate(inject(TYPES.ApiService), PeopleRepository, 0);

export default PeopleRepository;
