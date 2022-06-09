import componentzContainer from '@euk-labs/componentz/containers/global.inversify';

import LoggerService from '@core/services/logger';

import { ThemeStore } from '@stores/theme';
import { UserStore } from '@stores/user';

import PeopleRepository from '@modules/people/repository';
import UsersRepository from '@modules/users/repository';

import { httpService } from '@services/http';
import { NotificationService } from '@services/notification';
import { TranslationService } from '@services/translation';

import TYPES from './global.types';

export default function globalContainer(locale = '') {
  return () => {
    const container = componentzContainer();

    container.bind(TYPES.Locale).toConstantValue(locale);
    container.bind(TYPES.ApiService).toConstantValue(httpService);

    container.bind(TYPES.TranslationService).to(TranslationService);
    container.bind(TYPES.NotificationService).to(NotificationService);
    container.bind(TYPES.LoggerService).to(LoggerService);

    container.bind(TYPES.UsersRepository).to(UsersRepository);
    container.bind(TYPES.PeopleRepository).to(PeopleRepository);

    container.bind(TYPES.ThemeStore).to(ThemeStore).inSingletonScope();
    container.bind(TYPES.UserStore).to(UserStore).inSingletonScope();

    return container;
  };
}
