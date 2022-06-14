import { HttpService } from '@euk-labs/fetchx';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { ErrorInfo } from 'react';

import TYPES from '@containers/global.types';

export type LogParams = {
  error: Error;
  errorInfo?: ErrorInfo;
  user: {
    token?: string;
    message?: string;
  };
};

export interface LoggerServiceType {
  log(params: LogParams): Promise<void>;
}

@injectable()
export class LoggerService implements LoggerServiceType {
  constructor(
    @inject(TYPES.ApiService)
    private apiService: HttpService
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async log({ error, user, errorInfo }: LogParams) {
    try {
      await this.apiService.client.post('/logger', {
        user,
        error: error.message,
        stack: error.stack,
        errorInfo: errorInfo,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
