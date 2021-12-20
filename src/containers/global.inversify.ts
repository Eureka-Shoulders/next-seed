import ThemeStore from 'stores/ThemeStore';

import { globalContainer as componentzContainer } from '@euk-labs/componentz';

import TYPES from './global.types';

export default function globalContainer() {
  const container = componentzContainer();

  container.bind(TYPES.ThemeStore).to(ThemeStore).inSingletonScope();

  return container;
}
