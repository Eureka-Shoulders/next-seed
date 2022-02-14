const errors = {
  user: {
    creation: 'An error occurred while creating the user!',
    update: 'An error occurred while updating the user!',
    notFound: 'User not found!',
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
  validation: {
    invalid_email: 'Invalid e-mail',
    minimum_password: 'Password must have at least 8 characters',
    required: 'Required field',
    invalid_field: 'Invalid field',
    password_mismatch: 'Passwords do not match',
  },
};

export default errors;
