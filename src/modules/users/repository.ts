import { AxiosResponse } from 'axios';
import TYPES from 'containers/global.types';
import { decorate, inject, injectable } from 'inversify';
import { LoginSchema } from 'modules/login/login.schema';
import { dissocPath, omit, pipe } from 'ramda';

import { HttpService, Repository } from '@euk-labs/fetchx';

import { UserSchema } from './user.schema';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface ResetPasswordDto {
  password: string;
  token: string;
}

class UsersRepository extends Repository {
  constructor(private apiService: HttpService) {
    super(apiService, { path: '/users' });
  }

  register(values: UserSchema) {
    const newUser = pipe(
      omit(['confirmPassword']),
      dissocPath(['person', 'type'])
    )(values);

    return this.apiService.client.post('/users/register', newUser);
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

  recoverPassword(email: string) {
    return this.apiService.client.post('/auth/recover-password', {
      userEmail: email,
    });
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return this.apiService.client.post(
      '/auth/reset-password',
      resetPasswordDto
    );
  }
}

decorate(injectable(), UsersRepository);
decorate(inject(TYPES.ApiService), UsersRepository, 0);

export default UsersRepository;
