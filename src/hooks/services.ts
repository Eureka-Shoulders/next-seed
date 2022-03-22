import TYPES from '@containers/global.types';
import { AuthServiceType } from '@services/auth';
import { NotificationServiceType } from '@services/notification';
import { useInjection } from 'inversify-react';

export function useNotificationService() {
  return useInjection<NotificationServiceType>(TYPES.NotificationService);
}

export function useAuthService() {
  return useInjection<AuthServiceType>(TYPES.AuthService);
}
