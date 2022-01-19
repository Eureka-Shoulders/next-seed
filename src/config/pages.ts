import UserIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import { Actions, AppAbility, Subjects } from 'types';

import { Page } from '@euk-labs/componentz/components/AppBar/types';

export function getPages(abilities: AppAbility): Page[] {
  return [
    {
      label: 'Usuários',
      link: '/users',
      Icon: UserIcon,
      disabled: abilities.cannot(Actions.Read, Subjects.Users),
      sub: [
        {
          label: 'Criar usuário',
          link: '/new',
          Icon: UserIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Create, Subjects.Users),
        },
        {
          label: 'Editar usuário',
          link: '/:id',
          Icon: UserIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Update, Subjects.Users),
        },
      ],
    },
    {
      label: 'Pessoas',
      link: '/people',
      Icon: PeopleIcon,
      disabled: abilities.cannot(Actions.Read, Subjects.People),
      sub: [
        {
          label: 'Criar pessoa',
          link: '/new',
          Icon: PeopleIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Create, Subjects.Users),
        },
        {
          label: 'Editar pessoa',
          link: '/:id',
          Icon: PeopleIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Update, Subjects.Users),
        },
      ],
    },
  ];
}
