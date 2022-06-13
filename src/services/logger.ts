import { HttpService } from '@euk-labs/fetchx';
import { inject, injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';
import { ErrorInfo } from 'react';

import TYPES from '@containers/global.types';

export interface LoggerServiceType {
  log(error: Error, errorInfo?: ErrorInfo): Promise<void>;
}

@injectable()
export class LoggerService implements LoggerServiceType {
  constructor(
    @inject(TYPES.ApiService)
    private apiService: HttpService
  ) {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async log(error: Error, errorInfo?: ErrorInfo) {
    try {
      await this.apiService.client.post('/logger', {
        error: error.message,
        stack: error.stack,
        errorInfo: errorInfo,
      });
    } catch (err) {
      console.error(err);
    }
  }
}
