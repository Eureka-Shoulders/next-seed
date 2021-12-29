import ThemeStore from 'stores/ThemeStore';
import type { HydrationData } from 'types';

import componentzContainer from '@euk-labs/componentz/containers/global.inversify';

import TYPES from './global.types';

export default function globalContainer(hydrationData: HydrationData) {
  return () => {
    const container = componentzContainer();

    container.bind(TYPES.HydrationData).toConstantValue(hydrationData);
    container.bind(TYPES.ThemeStore).to(ThemeStore).inSingletonScope();

    return container;
  };
}
