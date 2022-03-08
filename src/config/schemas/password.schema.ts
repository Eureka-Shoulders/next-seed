import * as zod from 'zod';

import { TranslateFunc } from '@core/hooks/useTranslation';

import { verifyStrongPassword } from '@euk-labs/beltz';

export function getPasswordSchema(translate: TranslateFunc) {
  return zod
    .string()
    .min(8, translate('errors.validation.minimum_password'))
    .refine(
      (password) => !verifyStrongPassword(password),
      translate('errors.validation.password_strength')
    );
}
