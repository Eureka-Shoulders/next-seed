import getConfig from 'next/config';

import { HttpService } from '@euk-labs/fetchx';

const { publicRuntimeConfig } = getConfig();

const httpService = new HttpService({
  baseURL: publicRuntimeConfig.apiUrl,
});

export default httpService;
