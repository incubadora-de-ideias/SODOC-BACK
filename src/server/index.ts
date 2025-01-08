import fastify from 'fastify';
import routes from "./routes"
import jwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';

const app = fastify({ logger: true });

const port = Number(process.env.PORT) || 5000;

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    app.register(jwt, {
      secret: process.env.JWT_SECRET!,
      sign: {
        expiresIn: process.env.JWT_EXPIRES_IN!,
      },
    });
    app.addHook("preHandler", (req, res, next) => {
      req.jwt = app.jwt;
      return next();
    });

    app.register(fastifyCookie, {
      secret: process.env.COOKIE_SECRET!,
      hook: "preHandler",
    });

    await app.register(cors, {
      origin: process.env.CROSS_ORIGIN,
      credentials: true,
    });
    await app.register(routes)
    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();