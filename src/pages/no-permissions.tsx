// TODO: make a beautiful screen :)
import useTranslation from '@hooks/useTranslation';

export default function Index() {
  const { translate } = useTranslation();

  return <h1>{translate('errors.noPermissions')}</h1>;
}
