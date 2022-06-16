import TYPES from '@euk-labs/componentz/containers/global.bindings';
import type { UIStoreType } from '@euk-labs/componentz/stores/types';
import { AlertColor } from '@mui/material';
import axios from 'axios';
import { inject, injectable } from 'inversify';

interface AsyncNotifyOptions<T> {
  feedbackSuccess?: string;
  feedbackError: string;
  onSuccess?: (data: T) => void;
  onError?: (err: unknown) => void;
}

export interface NotificationServiceType {
  handleHttpRequest<T>(func: () => Promise<T>, options: AsyncNotifyOptions<T>): Promise<void>;

  notify(message: string, severity: AlertColor): void;
}

@injectable()
export class NotificationService implements NotificationServiceType {
  constructor(
    @inject(TYPES.UIStore)
    private uiStore: UIStoreType
  ) {}

  async handleHttpRequest<T>(func: () => Promise<T>, options: AsyncNotifyOptions<T>) {
    try {
      const data = await func();
      options.feedbackSuccess && this.notify(options.feedbackSuccess, 'success');
      options.onSuccess && options.onSuccess(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        this.notify(err.response?.data.message || options.feedbackError, 'error');
      }

      options.onError && options.onError(err);
    }
  }

  notify(message: string, severity: AlertColor) {
    this.uiStore.snackbar.show({
      message,
      severity,
    });
  }
}
