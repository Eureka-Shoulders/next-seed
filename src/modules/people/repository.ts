import TYPES from 'containers/global.types';
import { decorate, inject, injectable } from 'inversify';
import { Address, Contact } from 'types';

import { HttpService, Repository } from '@euk-labs/fetchx';

interface ContactsResponse {
  data: Contact[];
  totalCount: number;
}

interface AddressesResponse {
  data: Address[];
  totalCount: number;
}

class PeopleRepository extends Repository {
  constructor(private apiService: HttpService) {
    super(apiService, { path: '/people' });
  }

  getContacts(id: string) {
    return this.apiService.client.get<ContactsResponse>(
      `/people/${id}/contacts`
    );
  }

  getAddresses(id: string) {
    return this.apiService.client.get<AddressesResponse>(
      `/people/${id}/addresses`
    );
  }
}

decorate(injectable(), PeopleRepository);
decorate(inject(TYPES.ApiService), PeopleRepository, 0);

export default PeopleRepository;
