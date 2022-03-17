import { ReactNode } from 'react';

interface WhenProps {
  children: ReactNode;
  is?: boolean;
  isNot?: boolean;
}

export default function When({ is, isNot, children }: WhenProps) {
  if (!is) {
    return null;
  }

  if (isNot) {
    return null;
  }

  return <>{children}</>;
}
