import fastify from 'fastify';
import routes from "./routes";
import multipart  from '@fastify/multipart';

const app = fastify({ logger: true });

const port = Number(process.env.PORT) || 5000;

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
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