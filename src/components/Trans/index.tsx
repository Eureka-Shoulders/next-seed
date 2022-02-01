import getLocaleString from 'locales/getLocaleString';
import { useRouter } from 'next/router';

interface TransProps {
  id: string;
}

export default function Trans({ id }: TransProps) {
  const router = useRouter();

  return <>{getLocaleString(id, router)}</>;
}
