import UserIcon from '@mui/icons-material/AccountCircle';
import Dashboard from '@mui/icons-material/Dashboard';

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
    ],
  },
  {
    label: 'Server-Side',
    link: '/server',
    Icon: UserIcon,
  },
];
