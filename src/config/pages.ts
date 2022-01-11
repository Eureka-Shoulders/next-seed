import UserIcon from '@mui/icons-material/AccountCircle';
import Dashboard from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

import { Page } from '@euk-labs/componentz/components/AppBar/types';

export const pages: Page[] = [
  {
    label: 'Início',
    link: '/',
    Icon: Dashboard,
  },
  {
    label: 'Usuários',
    link: '/users',
    Icon: UserIcon,
    sub: [
      {
        label: 'Criar usuário',
        link: '/new',
        Icon: UserIcon,
        drawer: false,
      },
      {
        label: 'Editar usuário',
        link: '/:id',
        Icon: UserIcon,
        drawer: false,
      },
    ],
  },
  {
    label: 'Pessoas',
    link: '/people',
    Icon: PeopleIcon,
    sub: [
      {
        label: 'Criar pessoa',
        link: '/new',
        Icon: PeopleIcon,
        drawer: false,
      },
      {
        label: 'Editar pessoa',
        link: '/:id',
        Icon: PeopleIcon,
        drawer: false,
      },
    ],
  },
  {
    label: 'Server-Side',
    link: '/server',
    Icon: UserIcon,
  },
];
