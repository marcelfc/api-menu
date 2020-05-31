import { Router } from 'express';

const routes = Router();

routes.get('/', (request, response) => {
    console.log(response.json({ message: 'Hello Word!!!' }));
})

export default routes;

