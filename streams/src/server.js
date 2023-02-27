import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import http from 'http';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await json(res, res);
  const route = routes.find(
    route => route.method === method && route.path === url
  );
  if (route) route.handler(req, res);
  else res.writeHead(404).end();
});

server.listen(3333);
