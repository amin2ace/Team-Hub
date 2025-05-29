import * as Joi from 'joi';
export const validationSchema = Joi.object({
  PORT: Joi.number().required(),

  // Database
  MONGODB_URI: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),

  // Hash
  SALT_ROUNDS: Joi.number().required(),

  // Caching
  REDIS_URL: Joi.string().required(),
  REDIS_CACHE_TTL_MINUTES: Joi.number().required(),
  LRU_SIZE: Joi.number().required(),
});
