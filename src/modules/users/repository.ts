import { AxiosResponse } from 'axios';
import TYPES from 'containers/global.types';
import { decorate, inject, injectable } from 'inversify';
import { LoginSchema } from 'modules/login/login.schema';

import { HttpService, Repository } from '@euk-labs/fetchx';

import { NewUserSchema } from './user.schema';

interface LoginResponse {
  access_token: string;
}

class UsersRepository extends Repository {
  constructor(private apiService: HttpService) {
    super(apiService, { path: '/users' });
  }

  register(values: Omit<NewUserSchema, 'confirmPassword'>) {
    return this.apiService.client.post<
      unknown,
      AxiosResponse<unknown>,
      Omit<NewUserSchema, 'confirmPassword'>
    >('/auth/register', values);
  }

  login(email: string, password: string) {
    return this.apiService.client.post<
      LoginResponse,
      AxiosResponse<LoginResponse>,
      LoginSchema
    >('/auth/login', {
      email,
      password,
    });
  }
}

decorate(injectable(), UsersRepository);
decorate(inject(TYPES.ApiService), UsersRepository, 0);

export default UsersRepository;
