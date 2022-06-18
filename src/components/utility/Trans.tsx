import { useTranslation } from '@hooks/services';

interface TransProps {
  id: string;
}

export default function Trans({ id }: TransProps) {
  const { translate } = useTranslation();

  return <>{translate(id)}</>;
}
