import getLocaleString from 'locales/getLocaleString';
import { NextRouter } from 'next/router';

export function getPersonTypes(router: NextRouter) {
  return [
    { label: getLocaleString('physical', router), value: 'F' },
    { label: getLocaleString('juridical', router), value: 'J' },
  ];
}
