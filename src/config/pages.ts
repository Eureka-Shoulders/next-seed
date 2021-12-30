import UserIcon from '@mui/icons-material/AccountCircle';
import Dashboard from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';

import { Page } from '@euk-labs/componentz/components/AppBar/types';

export const pages: Page[] = [
  {
    label: 'Home',
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
    label: 'Server-Side Rendering page',
    link: '/server',
    Icon: UserIcon,
  },
  {
    label: 'E-mails',
    link: '/emails',
    Icon: MailIcon,
    sub: [
      {
        label: 'Novo',
        link: '/emails/new',
        Icon: MailIcon,
      },
    ],
  },
];
