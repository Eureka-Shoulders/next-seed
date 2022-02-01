import UserIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import getLocaleString from 'locales/getLocaleString';
import { NextRouter } from 'next/router';
import { Actions, AppAbility, Subjects } from 'types';

import { Page } from '@euk-labs/componentz/components/AppBar/types';

export function getPages(abilities: AppAbility, router: NextRouter): Page[] {
  return [
    {
      label: getLocaleString('users.page', router),
      link: '/users',
      Icon: UserIcon,
      disabled: abilities.cannot(Actions.Read, Subjects.Users),
      sub: [
        {
          label: getLocaleString('users.createPage', router),
          link: '/new',
          Icon: UserIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Create, Subjects.Users),
        },
        {
          label: getLocaleString('users.editPage', router),
          link: '/:id',
          Icon: UserIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Update, Subjects.Users),
        },
      ],
    },
    {
      label: getLocaleString('people.page', router),
      link: '/people',
      Icon: PeopleIcon,
      disabled: abilities.cannot(Actions.Read, Subjects.People),
      sub: [
        {
          label: getLocaleString('people.createPage', router),
          link: '/new',
          Icon: PeopleIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Create, Subjects.Users),
        },
        {
          label: getLocaleString('people.editPage', router),
          link: '/:id',
          Icon: PeopleIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Update, Subjects.Users),
        },
      ],
    },
  ];
}
