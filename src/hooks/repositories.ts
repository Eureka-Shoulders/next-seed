import TYPES from '@containers/global.types';
import { useInjection } from 'inversify-react';

import PeopleRepository from '@modules/people/repository';
import UsersRepository from '@modules/users/repository';

export function useUsersRepository() {
  return useInjection<UsersRepository>(TYPES.UsersRepository);
}

export function usePeopleRepository() {
  return useInjection<PeopleRepository>(TYPES.PeopleRepository);
}
