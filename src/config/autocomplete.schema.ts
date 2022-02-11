import * as zod from 'zod';

import { TranslateFunc } from '@hooks/useTranslation';

export function getAutocompleteSchema(translate: TranslateFunc) {
  return zod.object(
    {
      label: zod.string(),
      value: zod.unknown(),
    },
    {
      required_error: translate('errors.validation.required'),
      invalid_type_error: translate('errors.validation.required'),
    }
  );
}
