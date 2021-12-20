import UserIcon from '@mui/icons-material/AccountCircle';
import Dashboard from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';

export interface Page {
  label: string;
  link: string;
  Icon: any;
  sub?: Omit<Page, 'sub'>[];
}

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
