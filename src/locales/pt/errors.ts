const errors = {
  user: {
    creation: 'Ocorreu um erro ao criar o usuário!',
    update: 'Ocorreu um erro ao atualizar o usuário!',
    notFound: 'Usuário não encontrado!',
  },
  person: {
    creation: 'Ocorreu um erro ao criar a pessoa!',
    update: 'Ocorreu um erro ao atualizar a pessoa!',
    notFound: 'Pessoa não encontrada!',
  },
  changePassword: 'Ocorreu um erro ao alterar a senha!',
  recoverPassword: 'Ocorreu um erro ao solicitar recuperação de senha!',
  invalidCredentials: 'Usuário ou senha inválidos',
  noPermissions: 'Você não tem permissão para acessar esta página!',
  notAuthorized: 'Você não tem permissão para executar esta ação!',
  validation: {
    invalid_email: 'E-mail invalido',
    minimum_password: 'A senha deve conter, no minimo, 8 caracteres',
    required: 'Campo obrigatório',
    invalid_field: 'Campo inválido',
    password_mismatch: 'As senhas não conferem',
  },
};

export default errors;
