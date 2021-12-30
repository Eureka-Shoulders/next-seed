import TYPES from 'containers/global.types';
import { useInjection } from 'inversify-react';
import { UserStoreType } from 'stores/UserStore';

export default function useUserStore() {
  return useInjection<UserStoreType>(TYPES.UserStore);
}
