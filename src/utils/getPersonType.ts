import { TranslateFunc } from '@hooks/useTranslation';

export default function getPersonType(value: string, translate: TranslateFunc) {
  if (value.length === 11) {
    return { value: 'P', label: translate('common.personTypes.private') };
  }
  if (value.length === 14) {
    return { value: 'L', label: translate('common.personTypes.legal') };
  }

  return null;
}
