import { Ability, RawRuleOf } from '@casl/ability';
import axios from 'axios';
import TYPES from 'containers/global.types';
import { decorate, inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Router from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { AppAbility, User } from 'types';

import { HttpService } from '@euk-labs/fetchx';

export interface UserStoreType {
  user: User | null;
  setUser(user: User): void;

  rawAbilities: RawRuleOf<AppAbility>[] | null;
  setRawAbilities(rawAbilities: RawRuleOf<AppAbility>[]): void;

  login(accessToken: string): void;
  logout(): void;

  getAccessToken(): string | null;
  verifyToken(): void;

  startTokenInjector(): void;
  catchUnauthorizedErrors(): void;

  get abilities(): AppAbility | null;
  get isLogged(): boolean;
}

class UserStore implements UserStoreType {
  constructor(private apiService: HttpService) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  user: User | null = null;
  setUser(user: User | null) {
    this.user = user;
  }

  rawAbilities: RawRuleOf<AppAbility>[] | null = null;
  setRawAbilities(rawAbilities: RawRuleOf<AppAbility>[]) {
    this.rawAbilities = rawAbilities;
  }

  login(accessToken: string) {
    setCookie(null, 'user_token', accessToken, {
      maxAge: 24 * 60 * 60,
      path: '/',
    });

    Router.push('/');
  }

  logout() {
    this.user = null;
    setCookie(null, 'user_token', '', {
      maxAge: -1,
      path: '/',
    });
    Router.push('/login');
  }

  getAccessToken() {
    const cookies = parseCookies();
    return cookies.user_token;
  }

  async verifyToken() {
    const accessToken = this.getAccessToken();

    if (!accessToken) {
      return Router.push('/login');
    }

    try {
      const userResponse = await this.apiService.client.get<User>('/auth/me');
      const abilitiesResponse = await this.apiService.client.get<
        RawRuleOf<AppAbility>[]
      >('/auth/abilities');

      this.setUser(userResponse.data);
      if (abilitiesResponse.data) {
        this.setRawAbilities(abilitiesResponse.data);
      }
    } catch (error) {
      return Router.push('/login');
    }
  }

  startTokenInjector() {
    this.apiService.setRequestInterceptor('tokenInjector', (config) => {
      const accessToken = `Bearer ${this.getAccessToken()}`;

      if (config.headers) {
        config.headers.Authorization = accessToken;
      } else {
        config.headers = {
          Authorization: accessToken,
        };
      }

      return config;
    });
  }

  catchUnauthorizedErrors() {
    this.apiService.setResponseInterceptor(
      'unauthorizedErrors',
      (response) => {
        return response;
      },
      (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return Router.push('/login');
          }
        }

        throw error;
      }
    );
  }

  get abilities() {
    if (this.rawAbilities) {
      return new Ability(this.rawAbilities) as AppAbility;
    } else {
      return null;
    }
  }

  get isLogged() {
    return !!this.user;
  }
}

decorate(injectable(), UserStore);
decorate(inject(TYPES.ApiService), UserStore, 0);

export default UserStore;
