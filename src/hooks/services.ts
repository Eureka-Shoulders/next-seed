import TYPES from '@containers/global.types';
import type { AuthServiceType } from '@services/auth';
import type { NotificationServiceType } from '@services/notification';
import { useInjection } from 'inversify-react';

export function useNotificationService() {
  return useInjection<NotificationServiceType>(TYPES.NotificationService);
}

export function useAuthService() {
  return useInjection<AuthServiceType>(TYPES.AuthService);
}
