import PeopleRepository from 'modules/people/repository';
import UsersRepository from 'modules/users/repository';
import httpService from 'services/httpService';
import TranslationService from 'services/translationService';
import ThemeStore from 'stores/ThemeStore';
import UserStore from 'stores/UserStore';
import type { HydrationData } from 'types';

import componentzContainer from '@euk-labs/componentz/containers/global.inversify';

import TYPES from './global.types';

export default function globalContainer(
  hydrationData: HydrationData,
  locale = ''
) {
  return () => {
    const container = componentzContainer();

    container.bind(TYPES.ApiService).toConstantValue(httpService);
    container.bind(TYPES.Locale).toConstantValue(locale);
    container
      .bind(TYPES.TranslationService)
      .to(TranslationService)
      .inSingletonScope();

    container
      .bind(TYPES.UsersRepository)
      .to(UsersRepository)
      .inSingletonScope();
    container
      .bind(TYPES.PeopleRepository)
      .to(PeopleRepository)
      .inSingletonScope();

    container.bind(TYPES.HydrationData).toConstantValue(hydrationData);
    container.bind(TYPES.ThemeStore).to(ThemeStore).inSingletonScope();
    container.bind(TYPES.UserStore).to(UserStore).inSingletonScope();

    return container;
  };
}
