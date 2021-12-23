import httpService from 'services/httpService';

import { Repository } from '@euk-labs/fetchx';

const usersRepository = new Repository(httpService, {
  path: '/api/users',
});

export default usersRepository;
