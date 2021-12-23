import { HttpService } from '@euk-labs/fetchx';

const httpService = new HttpService({
  baseURL: 'http://localhost:3000',
});

export default httpService;
