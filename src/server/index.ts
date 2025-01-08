import fastify from 'fastify';
import routes from "./routes"

const app = fastify({ logger: true });

const port = Number(process.env.PORT) || 5000;

app.get('/', async (request, reply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await app.register(routes)
    await app.listen({ port, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

start();