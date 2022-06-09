import { Errors } from '@locales/types/errors';

export const errors: Errors = {
  user: {
    creation: 'An error occurred while creating the user!',
    update: 'An error occurred while updating the user!',
    notFound: 'User not found!',
    logoutDevices: 'An error occurred while logging out other devices!',
  },
  person: {
    creation: 'An error occurred while creating the person!',
    update: 'An error occurred while updating the person!',
    notFound: 'Person not found!',
  },
  changePassword: 'An error occurred while changing the password!',
  recoverPassword: 'An error occurred while recovering the password!',
  invalidCredentials: 'Invalid credentials!',
  noPermissions: 'You do not have permission to access this page!',
  notAuthorized: 'You are not authorized to execute this action!',
  noRefreshToken: "Couldn't get the refresh token!",
  validation: {
    invalid_email: 'Invalid e-mail',
    minimum_password: 'Password must have at least 8 characters',
    required: 'Required field',
    invalid_field: 'Invalid field',
    invalid_type: 'Invalid type',
    password_mismatch: 'Passwords do not match',
    password_strength:
      'Password must have at least one uppercase letter, one lowercase letter, one number and one special character',
    too_small_string: 'Must contain at least ${min} character(s)',
    too_small_number: 'The value must be greater or equal to ${min}',
    too_small_array: 'Must contain at least ${min} item(s)',
    too_big_string: 'Must contain at most ${max} character(s)',
    too_big_number: 'The value must be less or equal to ${max}',
    too_big_array: 'Must contain at most ${max} item(s)',
  },
};
