import { HttpService } from '@euk-labs/fetchx';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const httpService = new HttpService({
  baseURL: publicRuntimeConfig.apiUrl,
});

export default httpService;
