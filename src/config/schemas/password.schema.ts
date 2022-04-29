import * as zod from 'zod';

import { TranslateFunc } from '@core/hooks/useTranslation';

import { strongPassword } from '@euk-labs/beltz';

export function getPasswordSchema(translate: TranslateFunc) {
  return zod
    .string()
    .min(8, translate('errors.validation.minimum_password'))
    .refine(
      (password) => !strongPassword(password),
      translate('errors.validation.password_strength')
    );
}
