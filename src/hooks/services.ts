import { useInjection } from 'inversify-react';

import TYPES from '@containers/global.types';

import type { NotificationServiceType } from '@services/notification';
import { TranslationServiceType } from '@services/translation';

export function useNotificationService() {
  return useInjection<NotificationServiceType>(TYPES.NotificationService);
}

export function useTranslation() {
  return useInjection<TranslationServiceType>(TYPES.TranslationService);
}
