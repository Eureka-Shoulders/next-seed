import { useEffect } from 'react';
import { z } from 'zod';

import useTranslation from '@hooks/useTranslation';

export default function ZodErrorMapBuilder() {
  const { translate } = useTranslation();

  useEffect(() => {
    const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
      console.log(issue, ctx);

      switch (issue.code) {
        case z.ZodIssueCode.custom:
          if (issue.message === 'Required field') {
            return { message: translate('errors.validation.required') };
          }
          return { message: translate('errors.validation.invalid_field') };

        case z.ZodIssueCode.too_small:
          if (issue.type === 'array') {
            return {
              message: translate('errors.validation.too_small_array').replace(
                '${min}',
                String(issue.minimum)
              ),
            };
          }
          return {
            message: translate('errors.validation.too_small').replace(
              '${min}',
              String(issue.minimum)
            ),
          };

        case z.ZodIssueCode.too_big:
          return {
            message: translate('errors.validation.too_big').replace(
              '${max}',
              String(issue.maximum)
            ),
          };

        case z.ZodIssueCode.invalid_string:
          if (issue.validation === 'email') {
            return { message: translate('errors.validation.invalid_email') };
          }
          return { message: ctx.defaultError };

        case z.ZodIssueCode.invalid_type:
          return { message: translate('errors.validation.invalid_type') };

        default:
          return { message: ctx.defaultError };
      }
    };

    z.setErrorMap(customErrorMap);
  }, []); // eslint-disable-line

  return null;
}
