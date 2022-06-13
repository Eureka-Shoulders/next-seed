import { HttpService } from '@euk-labs/fetchx';
import { Repository } from '@euk-labs/fetchx';
import { decorate, injectable, unmanaged } from 'inversify';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const httpService = new HttpService({
  baseURL: publicRuntimeConfig.apiUrl,
});

decorate(injectable(), Repository);
decorate(unmanaged(), Repository, 1);
export default Repository;
