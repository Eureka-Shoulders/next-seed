import { RawRuleOf } from '@casl/ability';
import TYPES from '@containers/global.types';
import axios from 'axios';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { parseCookies, setCookie } from 'nookies';
import { AppAbility, User } from 'types';

import type { UserStoreType } from '@core/stores/user';

import { HttpService } from '@euk-labs/fetchx';

const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

interface TokensPayload {
  accessToken: string;
  refreshToken: string;
}

export interface AuthServiceType {
  getAccessToken(): string | null;
  getRefreshToken(): string | null;

  saveTokens(accessToken: string, refreshToken: string): void;
  removeTokens(): void;

  verifyToken(): Promise<void>;
  refreshToken(): Promise<void | TokensPayload>;
  logout(): Promise<void>;

  startTokenInjector(): void;
  catchUnauthorizedErrors(): void;
}

@injectable()
class AuthService implements AuthServiceType {
  constructor(
    @inject(TYPES.UserStore)
    private userStore: UserStoreType,
    @inject(TYPES.ApiService)
    private apiService: HttpService
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getAccessToken() {
    const cookies = parseCookies();
    return cookies.user_token || null;
  }

  getRefreshToken() {
    const cookies = parseCookies();
    return cookies.refresh_token || null;
  }

  saveTokens(accessToken: string, refreshToken: string) {
    setCookie(null, 'user_token', accessToken, {
      maxAge: ONE_DAY_IN_SECONDS,
      path: '/',
    });
    setCookie(null, 'refresh_token', refreshToken, {
      maxAge: ONE_DAY_IN_SECONDS * 2,
      path: '/',
    });
  }

  removeTokens() {
    setCookie(null, 'user_token', '', {
      maxAge: -1,
      path: '/',
    });
    setCookie(null, 'refresh_token', '', {
      maxAge: -1,
      path: '/',
    });
  }

  async verifyToken() {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    try {
      if (!accessToken && !refreshToken) {
        throw new Error('No tokens provided!');
      }

      if (!accessToken && refreshToken) {
        const newTokens = await this.refreshToken();

        if (newTokens) {
          this.saveTokens(newTokens.accessToken, newTokens.refreshToken);
        }
      }

      const userResponse = await this.apiService.client.get<User>('/auth/me');
      const abilitiesResponse = await this.apiService.client.get<
        RawRuleOf<AppAbility>[]
      >('/auth/abilities');

      this.userStore.setUser(userResponse.data);
      if (abilitiesResponse.data) {
        this.userStore.setRawAbilities(abilitiesResponse.data);
      }
    } catch (err) {
      const redirectTo = encodeURIComponent(window.location.pathname);

      window.location.href = `/login?redirect=${redirectTo}`;
      return;
    }
  }

  async refreshToken() {
    this.userStore.setRefreshingToken(true);

    try {
      const refreshToken = this.getRefreshToken();
      const refreshResponse = await this.apiService.client.post<TokensPayload>(
        '/auth/refresh',
        { refreshToken }
      );

      return refreshResponse.data;
    } catch (error) {
      return this.logout();
    } finally {
      this.userStore.setRefreshingToken(false);
    }
  }

  async logout() {
    this.userStore.setUser(null);

    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (accessToken || refreshToken) {
      await this.apiService.client.post('/auth/logout', {
        refreshToken: this.getRefreshToken(),
      });
    }

    this.removeTokens();

    window.location.href = '/login';
  }

  startTokenInjector() {
    this.apiService.setRequestInterceptor('tokenInjector', (config) => {
      const accessToken = this.getAccessToken();

      if (config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        config.headers = {
          Authorization: `Bearer ${accessToken}`,
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
          if (
            error.response?.status === 401 ||
            error.response?.data.message === 'Token is not allowed'
          ) {
            const isLoggingIn = error.config.url === '/auth/login';

            if (this.userStore.isRefreshingToken || isLoggingIn) {
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

            this.logout();
            return error;
          }
        }

        return Promise.reject(error);
      }
    );
  }
}

export default AuthService;
