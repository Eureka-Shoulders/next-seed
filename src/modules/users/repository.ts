import httpService from 'services/httpService';

import { Repository } from '@euk-labs/fetchx';

const usersRepository = new Repository(httpService, {
  path: '/users',
});

export default usersRepository;
