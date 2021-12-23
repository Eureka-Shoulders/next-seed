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

      this.post('/users', (schema, request) => {
        const newUser = schema.users.create({
          ...JSON.parse(request.requestBody),
          createdAt: new Date(),
        });

        return newUser.user;
      });

      this.get('/users/:id', async (schema, request) => {
        const { id } = request.params;
        const user = await schema.users.find(id);

        return user.attrs;
      });

      this.patch('/users/:id', (schema, request) => {
        const user = schema.users.find(request.params.id);

        user.update({
          ...JSON.parse(request.requestBody),
        });

        return user.user;
      });

      this.delete('/users/:id', (schema, request) => {
        const user = schema.users.find(request.params.id);

        user.destroy();

        return user.attrs;
      });

      this.namespace = '/';
      this.passthrough();
    },
  });

  return server;
};

export default createMirageServer;
