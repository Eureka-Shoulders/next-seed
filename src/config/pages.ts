import { Page } from '@euk-labs/componentz/components/AppBar/types';
import UserIcon from '@mui/icons-material/AccountCircle';
import PeopleIcon from '@mui/icons-material/People';
import { Actions, AppAbility, Subjects } from '@types';

import { TranslateFunc } from '@services/translation';

export function getPages(abilities: AppAbility, translate: TranslateFunc): Page[] {
  return [
    {
      label: translate('pages.users.list'),
      link: '/app/users',
      Icon: UserIcon,
      disabled: abilities.cannot(Actions.Read, Subjects.User),
      sub: [
        {
          label: translate('pages.users.create'),
          link: '/new',
          Icon: UserIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Create, Subjects.User),
        },
        {
          label: translate('pages.users.edit'),
          link: '/:id',
          Icon: UserIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Update, Subjects.User),
        },
      ],
    },
    {
      label: translate('pages.people.list'),
      link: '/app/people',
      Icon: PeopleIcon,
      disabled: abilities.cannot(Actions.Read, Subjects.Person),
      sub: [
        {
          label: translate('pages.people.create'),
          link: '/new',
          Icon: PeopleIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Create, Subjects.User),
        },
        {
          label: translate('pages.people.edit'),
          link: '/:id',
          Icon: PeopleIcon,
          drawer: false,
          disabled: abilities.cannot(Actions.Update, Subjects.User),
        },
      ],
    },
  ];
}
