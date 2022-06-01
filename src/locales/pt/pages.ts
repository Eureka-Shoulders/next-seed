import { Pages } from '@locales/types/pages';

const pages: Pages = {
  users: {
    list: 'Usuários',
    create: 'Criar usuário',
    edit: 'Editar usuário',
  },
  people: {
    list: 'Pessoas',
    create: 'Criar pessoa',
    edit: 'Editar pessoa',
  },
  noPermissions: {
    title: 'Acesso negado',
    description:
      'Você não tem as permissões necessárias para acessar esta página',
    buttonLabel: 'Página inicial',
  },
  notFound: {
    title: 'Página não encontrada',
    description: 'A página que você está tentando acessar não existe',
  },
};

export default pages;
