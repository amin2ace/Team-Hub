import * as Joi from 'joi';
export const validationSchema = Joi.object({
  PORT: Joi.number().required(),

  // Database
  MONGODB_URI: Joi.string().required(),
  DB_NAME: Joi.string().required(),

  // JWT
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
});
