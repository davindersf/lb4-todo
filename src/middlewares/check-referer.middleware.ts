import {Next} from '@loopback/core';
import {Middleware, MiddlewareContext} from '@loopback/rest';

const allowedOrigins = [process.env.ALLOWED_ORIGIN, 'http://localhost:3000'];

export const checkReferer: Middleware = async (
  context: MiddlewareContext,
  next: Next,
) => {
  const referer = context.request.headers.referer;

  if (referer && allowedOrigins.includes(referer)) {
    const error = new Error('Referer not allowed');
    // @ts-ignore
    error.statusCode = 403; // 403 (Forbidden)
    throw error;
  }

  await next();
};
