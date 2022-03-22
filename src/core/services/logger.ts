import TYPES from '@containers/global.types';
import { inject, injectable } from 'inversify';
import { ErrorInfo } from 'react';

import { HttpService } from '@euk-labs/fetchx';

export interface LoggerServiceType {
  log(error: Error, errorInfo?: ErrorInfo): Promise<void>;
}

@injectable()
class LoggerService implements LoggerServiceType {
  constructor(
    @inject(TYPES.ApiService)
    private apiService: HttpService
  ) {}

  async log(error: Error, errorInfo?: ErrorInfo) {
    try {
      /**
       * Here you can track the error and send it to the server, or any platform like Sentry,
       * or just log it to the console.
       */

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

export default LoggerService;
