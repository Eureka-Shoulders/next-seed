export interface Errors {
  user: {
    creation: string;
    update: string;
    notFound: string;
    logoutDevices: string;
  };
  person: {
    creation: string;
    update: string;
    notFound: string;
  };
  notFound: string;
  changePassword: string;
  recoverPassword: string;
  invalidCredentials: string;
  noPermissions: string;
  notAuthorized: string;
  noRefreshToken: string;
  validation: {
    invalid_email: string;
    minimum_password: string;
    required: string;
    invalid_field: string;
    invalid_type: string;
    password_mismatch: string;
    password_strength: string;
    too_small_string: string;
    too_small_number: string;
    too_small_array: string;
    too_big_string: string;
    too_big_number: string;
    too_big_array: string;
  };
}
