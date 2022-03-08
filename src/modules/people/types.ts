import { TranslateFunc } from '@core/hooks/useTranslation';

export function getPersonTypes(translate: TranslateFunc) {
  return [
    { label: translate('common.personTypes.private'), value: 'F' },
    { label: translate('common.personTypes.legal'), value: 'J' },
  ];
}
