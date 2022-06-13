import { Ability, RawRuleOf } from '@casl/ability';
import { HttpService } from '@euk-labs/fetchx';
import axios from 'axios';
import TYPES from 'containers/global.types';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import Router from 'next/router';
import { parseCookies, setCookie } from 'nookies';
import { AppAbility, User } from 'types';

import { ONE_DAY_IN_SECONDS, defaultCookieConfig } from '@config/constants';

import type { NotificationServiceType } from '@services/notification';
import type { TranslationServiceType } from '@services/translation';

export interface UserStoreType {
  user: User | null;
  setUser(user: User): void;

  rawAbilities: RawRuleOf<AppAbility>[] | null;
  getAbilities(): void;
  setRawAbilities(rawAbilities: RawRuleOf<AppAbility>[]): void;

  login(accessToken: string, refreshToken: string, redirectTo?: string): void;
  logout(): void;

  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  verifyToken(): void;

  startTokenInjector(): void;
  catchUnauthorizedErrors(): void;
  catchForbiddenErrors(): void;

  get abilities(): AppAbility | null;
  get isLogged(): boolean;
}

@injectable()
export class UserStore implements UserStoreType {
  constructor(
    @inject(TYPES.ApiService)
    private apiService: HttpService,
    @inject(TYPES.NotificationService)
    private notificationService: NotificationServiceType,
    @inject(TYPES.TranslationService)
    private translationService: TranslationServiceType
  ) {
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
    setCookie(null, 'user_token', accessToken, defaultCookieConfig);
    setCookie(null, 'refresh_token', refreshToken, {
      ...defaultCookieConfig,
      maxAge: ONE_DAY_IN_SECONDS * 2,
    });

    Router.push(redirectTo || '/');
  }

  async logout() {
    this.user = null;

    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    setCookie(null, 'user_token', '', {
      ...defaultCookieConfig,
      maxAge: -1,
    });
    setCookie(null, 'refresh_token', '', {
      ...defaultCookieConfig,
      maxAge: -1,
    });

    if (accessToken || refreshToken) {
      await this.apiService.client.post('/auth/logout', {
        refreshToken: this.getRefreshToken(),
      });
    }

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

  async getAbilities() {
    const abilitiesResponse = await this.apiService.client.get<RawRuleOf<AppAbility>[]>(
      '/auth/abilities'
    );

    if (abilitiesResponse?.data) {
      this.setRawAbilities(abilitiesResponse.data);
    }
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
        setCookie(null, 'user_token', newTokens.accessToken, defaultCookieConfig);
        setCookie(null, 'refresh_token', newTokens.refreshToken, {
          ...defaultCookieConfig,
          maxAge: ONE_DAY_IN_SECONDS * 2,
        });
      }
    }

    try {
      const userResponse = await this.apiService.client.get<User>('/auth/me');

      this.setUser(userResponse.data);
      await this.getAbilities();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status !== 403) {
          return Router.push({
            pathname: '/login',
            search: `?redirect=${encodeURIComponent(Router.asPath)}`,
          });
        }
      }
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

  catchForbiddenErrors() {
    this.apiService.setResponseInterceptor(
      'forbidden',
      (response) => {
        return response;
      },
      async (error) => {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 403) {
            if (error.config.url === '/auth/abilities' || error.config.url === '/auth/me') {
              return Router.reload();
            }
            return this.notificationService.notify(
              this.translationService.translate('errors.forbidden'),
              'warning'
            );
          }
        }

        return Promise.reject(error);
      }
    );
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
            const isChangingPassword = error.config.url === '/auth/change-password-user';

            if (this.isRefreshingToken || isLoggingIn || isChangingPassword) {
              return Promise.reject(error);
            }

            if (this.isRefreshingToken) {
              return error;
            }

            if (this.getRefreshToken()) {
              const newTokens = await this.refreshToken();

              if (newTokens) {
                setCookie(null, 'user_token', newTokens.accessToken, defaultCookieConfig);
                setCookie(null, 'refresh_token', newTokens.refreshToken, {
                  ...defaultCookieConfig,
                  maxAge: ONE_DAY_IN_SECONDS * 2,
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

        return Promise.reject(error);
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
