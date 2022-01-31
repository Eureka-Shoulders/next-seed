import * as zod from 'zod';

import ERROR_MESSAGES from './messages';

const AutocompleteSchema = zod.object(
  {
    label: zod.string(),
    value: zod.unknown(),
  },
  {
    required_error: ERROR_MESSAGES.required,
    invalid_type_error: ERROR_MESSAGES.required,
  }
);

export default AutocompleteSchema;
