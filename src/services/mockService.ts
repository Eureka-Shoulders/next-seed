import faker from 'faker';
import { Model, Server } from 'miragejs';
import getConfig from 'next/config';

export default function createMirageServer() {
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
      } as any);
      for (let i = 0; i < 14; i++) {
        server.create('user', {
          name: faker.name.findName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          createdAt: new Date(),
        } as any);
      }
    },
    routes() {
      this.urlPrefix = publicRuntimeConfig.apiUrl;
      this.namespace = '/api';

      /**
       * Users
       */
      this.get('/users', (schema: any, request) => {
        const limit = +request.queryParams.limit;
        const skip = +request.queryParams.skip;

        return {
          data: schema.users.all().models.slice(skip, skip + limit),
          totalCount: schema.users.all().models.length,
        };
      });

      this.post('/users', (schema: any, request) => {
        const newUser = schema.users.create({
          ...JSON.parse(request.requestBody),
          createdAt: new Date(),
        });

        return newUser.attrs;
      });

      this.get('/users/:id', async (schema: any, request) => {
        const { id } = request.params;
        const user = await schema.users.find(id);

        return user.attrs;
      });

      this.patch('/users/:id', (schema: any, request) => {
        const user = schema.users.find(request.params.id);

        user.update({
          ...JSON.parse(request.requestBody),
        });

        return user.attrs;
      });

      this.delete('/users/:id', (schema: any, request) => {
        const user = schema.users.find(request.params.id);

        user.destroy();

        return user.attrs;
      });

      this.namespace = '/';
      this.passthrough();
    },
  });

  return server;
}
