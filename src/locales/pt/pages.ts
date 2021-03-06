import { Pages } from '@locales/types/pages';

export const pages: Pages = {
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
    description: 'Você não tem as permissões necessárias para acessar esta página',
    buttonLabel: 'Página inicial',
  },
  notFound: {
    title: 'Página não encontrada',
    description: 'A página que você está tentando acessar não existe',
  },
  entityNotFound: {
    title: 'Entidade não encontrada',
    description: 'A entidade que você está tentando acessar não existe',
  },
  ohNo: {
    title: 'Ops! Algo deu errado',
    description:
      'Algo estranho aconteceu enquanto você utilizava nossa aplicação. Vamos analisar o problema e tentar corrigi-lo o mais rápido possível. Não se preocupe, seus dados permanecem seguros.',
  },
};
