import { useEffect } from 'react';
import { z } from 'zod';

import useTranslation from '@hooks/useTranslation';

export default function ZodErrorMapBuilder() {
  const { translate } = useTranslation();

  useEffect(() => {
    const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
      console.log(issue, ctx);

      if (issue.code == z.ZodIssueCode.invalid_string) {
        if (issue.validation === 'email') {
          return { message: translate('errors.validation.invalid_email') };
        }
      }

      if (issue.code === z.ZodIssueCode.invalid_type) {
        if (issue.expected === 'string') {
          return { message: translate('errors.validation.invalid_type') };
        }
      }

      if (issue.code === z.ZodIssueCode.custom) {
        return { message: `less-than-${(issue.params || {}).minimum}` };
      }

      return { message: ctx.defaultError };
    };

    z.setErrorMap(customErrorMap);
  }, []); // eslint-disable-line

  return null;
}
