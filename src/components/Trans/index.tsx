import useTranslation from '@hooks/useTranslation';

interface TransProps {
  id: string;
}

export default function Trans({ id }: TransProps) {
  const { translate } = useTranslation();

  return <>{translate(id)}</>;
}
