import { TranslateFunc } from '@services/translation';

export function getPersonTypes(translate: TranslateFunc) {
  return [
    { label: translate('common.personTypes.private'), value: 'F' },
    { label: translate('common.personTypes.legal'), value: 'J' },
  ];
}
