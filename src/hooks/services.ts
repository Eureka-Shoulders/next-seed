import { useInjection } from 'inversify-react';

import TYPES from '@containers/global.types';

import type { NotificationServiceType } from '@services/notification';

export function useNotificationService() {
  return useInjection<NotificationServiceType>(TYPES.NotificationService);
}
