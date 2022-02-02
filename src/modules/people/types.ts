import { TranslateFunc } from '@hooks/useTranslation';

export function getPersonTypes(translate: TranslateFunc) {
  return [
    { label: translate('common.physical'), value: 'F' },
    { label: translate('common.juridical'), value: 'J' },
  ];
}
