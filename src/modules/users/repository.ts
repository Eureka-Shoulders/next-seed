import TYPES from '@containers/global.types';
import { AxiosResponse } from 'axios';
import { inject, injectable } from 'inversify';
import { dissocPath, omit, pipe } from 'ramda';
import { User } from 'types';

import { LoginSchema } from '@modules/login/login.schema';

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

@injectable()
class UsersRepository extends Repository {
  constructor(@inject(TYPES.ApiService) private apiService: HttpService) {
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

  logoutDevices(refreshToken: string) {
    return this.apiService.client.post('/auth/logout-devices', {
      refreshToken,
    });
  }

  async getAutocompleteOptions(value?: string) {
    const where = {
      person: value ? { name: { contains: value } } : undefined,
    };
    const response = await this.read<{ data: User[] }>({
      params: {
        include: {
          person: {
            select: {
              name: true,
            },
          },
        },
        where,
      },
    });

    return response.data.data.map((user) => ({
      label: user.person.name,
      value: user.id,
    }));
  }
}

export default UsersRepository;
