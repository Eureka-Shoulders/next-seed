const errors = {
  user: {
    creation: 'Ocorreu um erro ao criar o usuário!',
    update: 'Ocorreu um erro ao atualizar o usuário!',
    notFound: 'Usuário não encontrado!',
    logoutDevices: 'Ocorreu um erro ao sair de outros dispositivos!',
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
  noRefreshToken: 'Não foi possível obter o token de atualização!',
  validation: {
    invalid_email: 'E-mail invalido',
    minimum_password: 'A senha deve conter, no minimo, 8 caracteres',
    required: 'Campo obrigatório',
    invalid_field: 'Campo inválido',
    invalid_type: 'Tipo inválido',
    password_mismatch: 'As senhas não conferem',
    password_strength:
      'A senha deve conter, no mínimo, uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
    too_small_string: 'Deve conter no mínimo ${min} caractere(s)',
    too_small_number: 'O valor deve ser maior que ${min}',
    too_small_array: 'Deve conter no mínimo ${min} item(ns)',
    too_big_string: 'Deve conter no máximo ${max} caractere(s)',
    too_big_number: 'O valor deve ser menor que ${max}',
    too_big_array: 'Deve conter no máximo ${max} item(ns)',
  },
};

export default errors;
