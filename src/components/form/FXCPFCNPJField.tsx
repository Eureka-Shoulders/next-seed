import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useFormixContext } from '@euk-labs/formix';
import { FXMaskedField } from '@euk-labs/formix-mui';

interface FXCPFCNPJFieldProps {
  name: string;
  typeField: string;
}

function FXCPFCNPJField({ name, typeField }: FXCPFCNPJFieldProps) {
  const formix = useFormixContext();
  const type = formix.getValue<{ label: string; value: string }>(typeField);

  const getMask = () => {
    if (type?.value === 'J') {
      return '99.999.999/9999-99';
    }
    if (type?.value === 'F') {
      return '999.999.999-99';
    }
    return '';
  };
  const getLabel = () => {
    if (type?.value === 'J') {
      return 'CNPJ';
    }
    if (type?.value === 'F') {
      return 'CPF';
    }
    return 'CPF/CNPJ';
  };

  useEffect(() => {
    if (!type?.value) {
      formix.setFieldValue(name, '');
    }
  }, [type]);

  return (
    <FXMaskedField
      mask={getMask()}
      name={name}
      disabled={!type}
      label={getLabel()}
      maskChar=""
    />
  );
}

export default observer(FXCPFCNPJField);
