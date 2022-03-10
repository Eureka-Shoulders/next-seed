import TYPES from '@containers/global.types';
import { NotificationServiceType } from '@services/notification';
import { useInjection } from 'inversify-react';

export function useNotificationService() {
  return useInjection<NotificationServiceType>(TYPES.NotificationService);
}
