import { Router } from 'express';

import User from './app/models/User';

const routes = new Router();

routes.get('/', async (request, response) => {
  const user = await User.create({
    name: 'Douglas Brandão',
    email: 'douglasbrando5@gmail.com',
    password_hash: '123',
  });

  response.json(user);
});

export default routes;
