import { useFormixContext } from '@euk-labs/formix';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import { equals } from 'ramda';
import { useEffect } from 'react';

function UnloadListener() {
  const formix = useFormixContext<Record<string, unknown>>();

  function checkFormValues(e: BeforeUnloadEvent) {
    e.preventDefault();

    const isSafeToClose = equals(toJS(formix.initialValues), toJS(formix.values));

    if (!isSafeToClose) {
      e.returnValue = '';
    } else {
      return;
    }
  }

  useEffect(() => {
    window.addEventListener('beforeunload', checkFormValues);

    return () => {
      window.removeEventListener('beforeunload', checkFormValues);
    };
  }, []); //eslint-disable-line

  return null;
}

export default observer(UnloadListener);
