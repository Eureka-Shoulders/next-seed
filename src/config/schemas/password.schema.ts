import { strongPassword } from '@euk-labs/beltz';
import * as zod from 'zod';

import { TranslateFunc } from '@services/translation';

export function getPasswordSchema(translate: TranslateFunc) {
  return zod
    .string()
    .min(8, translate('errors.validation.minimum_password'))
    .refine(
      (password) => !strongPassword(password),
      translate('errors.validation.password_strength')
    );
}
