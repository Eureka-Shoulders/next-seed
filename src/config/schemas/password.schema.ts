import * as zod from 'zod';

import { TranslateFunc } from '@hooks/useTranslation';

export function getPasswordSchema(translate: TranslateFunc) {
  return zod.string().min(8, translate('errors.validation.minimum_password'));
}
