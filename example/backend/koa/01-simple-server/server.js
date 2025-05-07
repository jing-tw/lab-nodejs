const Koa = require('koa');
const Router = require('@koa/router');
const app = new Koa();
const router = new Router();

// Middleware for error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = { error: err.message || 'Internal Server Error' };
  }
});

// Sample endpoint to return an access token
router.get('/token', async (ctx) => {
  // Simulated token generation (replace with actual logic)
  const token = 'sample-jwt-token-12345';
  ctx.body = { accessToken: token };
});

// Mount the router
app.use(router.routes()).use(router.allowedMethods());

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});