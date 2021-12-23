import faker from 'faker';
import { Model, Server } from 'miragejs';
import getConfig from 'next/config';

const createMirageServer = () => {
  const { publicRuntimeConfig } = getConfig();

  const server = new Server({
    models: {
      user: Model,
    },
    seeds(server) {
      server.create('user', {
        name: 'Sampaio',
        email: 'sampaio@shoulders.com.br',
        password: '12345678',
        createdAt: new Date(),
      });
      for (let i = 0; i < 14; i++) {
        server.create('user', {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          createdAt: new Date(),
        });
      }
    },
    routes() {
      this.urlPrefix = publicRuntimeConfig.apiUrl;
      this.namespace = '/api';

      /**
       * Users
       */
      this.get('/users', (schema, request) => {
        const limit = +request.queryParams.limit;
        const skip = +request.queryParams.skip;

        return {
          data: schema.users.all().models.slice(skip, skip + limit),
          totalCount: schema.users.all().models.length,
        };
      });

      this.namespace = '/';
      this.passthrough();
    },
  });

  return server;
};

export default createMirageServer;
