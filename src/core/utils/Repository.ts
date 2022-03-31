import { decorate, injectable, unmanaged } from 'inversify';

import { Repository } from '@euk-labs/fetchx';

decorate(injectable(), Repository);
decorate(unmanaged(), Repository, 1);
export default Repository;
