import ThemeStore from 'stores/ThemeStore';
import { HydrationData } from 'types';

import { globalContainer as componentzContainer } from '@euk-labs/componentz';

import TYPES from './global.types';

export default function globalContainer(hydrationData: HydrationData) {
  return () => {
    const container = componentzContainer();

    container.bind(TYPES.HydrationData).toConstantValue(hydrationData);
    container.bind(TYPES.ThemeStore).to(ThemeStore).inSingletonScope();

    return container;
  };
}
