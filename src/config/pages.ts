import UserIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import { Actions, AppAbility, Subjects } from 'types';

import { TranslateFunc } from '@hooks/useTranslation';

import { Page } from '@euk-labs/componentz/components/AppBar/types';

export function getPages(
  abilities: AppAbility,
  translate: TranslateFunc
): Page[] {
  return [
    {
      label: translate('pages.users.list'),
      link: '/users',
      Icon: UserIcon,
      disabled: abilities.cannot(Actions.Read, Subjects.Users),
      sub: [
        {
          label: translate('pages.users.create'),
          link: '/new',
          Icon: UserIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Create, Subjects.Users),
        },
        {
          label: translate('pages.users.edit'),
          link: '/:id',
          Icon: UserIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Update, Subjects.Users),
        },
      ],
    },
    {
      label: translate('pages.people.list'),
      link: '/people',
      Icon: PeopleIcon,
      disabled: abilities.cannot(Actions.Read, Subjects.People),
      sub: [
        {
          label: translate('pages.people.create'),
          link: '/new',
          Icon: PeopleIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Create, Subjects.Users),
        },
        {
          label: translate('pages.people.edit'),
          link: '/:id',
          Icon: PeopleIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Update, Subjects.Users),
        },
      ],
    },
  ];
}
