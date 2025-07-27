import Fastify from 'fastify';
import dotenv from 'dotenv';
import fastifyMongo from '@fastify/mongodb';
import fastifyCors from '@fastify/cors';

import authPlugin from './src/plugins/auth.plugin.js';

import authRoutes from './src/routes/auth.routes.js';
import authProtectedRoutes from './src/routes/auth.protected.routes.js';
import accountRoutes from './src/routes/account.routes.js';
import wasteRoutes from './src/routes/waste.routes.js';

dotenv.config();

const fastify = Fastify({
  logger: true
});

// Habilitar CORS
await fastify.register(fastifyCors, {
  origin: true
});

// Conexión a MongoDB
await fastify.register(fastifyMongo, {
  forceClose: true,
  url: process.env.MONGO_URL
});

// Registrar plugin de autenticación
await fastify.register(authPlugin);

// Registrar rutas con prefijo /api
await fastify.register(authRoutes, { prefix: '/api' });
await fastify.register(authProtectedRoutes, { prefix: '/api' });
await fastify.register(accountRoutes, { prefix: '/api' });
await fastify.register(wasteRoutes, { prefix: '/api' });

// Iniciar servidor
try {
  await fastify.listen({ port: 3000, host: '0.0.0.0' });
  console.log('🚀 Server running on http://localhost:3000');
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
