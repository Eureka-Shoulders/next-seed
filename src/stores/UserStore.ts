import { Ability, RawRuleOf } from '@casl/ability';
import axios from 'axios';
import TYPES from 'containers/global.types';
import { decorate, inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Router from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { AppAbility, User } from 'types';

import { HttpService } from '@euk-labs/fetchx';

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export interface UserStoreType {
  user: User | null;
  setUser(user: User): void;

  rawAbilities: RawRuleOf<AppAbility>[] | null;
  setRawAbilities(rawAbilities: RawRuleOf<AppAbility>[]): void;

  login(accessToken: string, refreshToken: string, redirectTo?: string): void;
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

  isRefreshingToken = false;
  setRefreshingToken(value: boolean) {
    this.isRefreshingToken = value;
  }

  user: User | null = null;
  setUser(user: User | null) {
    this.user = user;
  }

  rawAbilities: RawRuleOf<AppAbility>[] | null = null;
  setRawAbilities(rawAbilities: RawRuleOf<AppAbility>[]) {
    this.rawAbilities = rawAbilities;
  }

  login(accessToken: string, refreshToken: string, redirectTo?: string) {
    setCookie(null, 'user_token', accessToken, {
      maxAge: ONE_DAY_IN_SECONDS,
      path: '/',
    });
    setCookie(null, 'refresh_token', refreshToken, {
      maxAge: ONE_DAY_IN_SECONDS * 2,
      path: '/',
    });

    Router.push(redirectTo || '/');
  }

  logout() {
    this.user = null;
    setCookie(null, 'user_token', '', {
      maxAge: -1,
      path: '/',
    });
    setCookie(null, 'refresh_token', '', {
      maxAge: -1,
      path: '/',
    });
    Router.push('/login');
  }

  getAccessToken() {
    const cookies = parseCookies();
    return cookies.user_token;
  }

  getRefreshToken() {
    const cookies = parseCookies();
    return cookies.refresh_token;
  }

  async verifyToken() {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken && !refreshToken) {
      return Router.push({
        pathname: '/login',
        search: `?redirect=${encodeURIComponent(Router.asPath)}`,
      });
    }

    if (!accessToken && refreshToken) {
      const newTokens = await this.refreshToken();

      if (newTokens) {
        setCookie(null, 'user_token', newTokens.accessToken, {
          maxAge: ONE_DAY_IN_SECONDS,
          path: '/',
        });
        setCookie(null, 'refresh_token', newTokens.refreshToken, {
          maxAge: ONE_DAY_IN_SECONDS * 2,
          path: '/',
        });
      }
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
      return Router.push({
        pathname: '/login',
        search: `?redirect=${encodeURIComponent(Router.asPath)}`,
      });
    }
  }

  async refreshToken() {
    this.setRefreshingToken(true);

    try {
      const refreshToken = this.getRefreshToken();
      const refreshResponse = await this.apiService.client.post<{
        accessToken: string;
        refreshToken: string;
      }>('/auth/refresh', { refreshToken });

      return refreshResponse.data;
    } catch (error) {
      return this.logout();
    } finally {
      this.setRefreshingToken(false);
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
      async (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            const isLoggingIn = error.config.url === '/auth/login';

            if (this.isRefreshingToken || isLoggingIn) {
              return error;
            }

            if (this.getRefreshToken()) {
              const newTokens = await this.refreshToken();

              if (newTokens) {
                setCookie(null, 'user_token', newTokens.accessToken, {
                  maxAge: ONE_DAY_IN_SECONDS,
                  path: '/',
                });
                setCookie(null, 'refresh_token', newTokens.refreshToken, {
                  maxAge: ONE_DAY_IN_SECONDS * 2,
                  path: '/',
                });

                return await this.apiService.client({
                  ...error.config,
                });
              }
            }

            window.location.href = '/login';
            return error;
          }
        }

        return error;
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
    return !!this.user && this.abilities !== null;
  }
}

decorate(injectable(), UserStore);
decorate(inject(TYPES.ApiService), UserStore, 0);

export default UserStore;
