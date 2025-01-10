import fastify from 'fastify';
import routes from "./routes"
import jwt from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import cors from '@fastify/cors';
import multipart  from '@fastify/multipart';

const app = fastify({ logger: true });

const port = Number(process.env.PORT) || 5000;

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    app.register(jwt, {
      secret: process.env.JWT_SECRET || "secret",
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
      origin: process.env.CROSS_ORIGIN || "http://localhost:5173",
      credentials: true,
    });
    await app.register(multipart, {
      limits: {
        fieldNameSize: 1024 * 1024,
        fieldSize: 1024 * 1024 * 20,  
        fields: 10000,
        fileSize: 1024 * 1024 * 20,
        files: 100,
        headerPairs: 10000,
        parts: 10000,
      },
      attachFieldsToBody: true,
    });
    await app.register(routes)
   
    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();