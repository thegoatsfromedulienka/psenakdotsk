import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

// CORS middleware
app.use('*', (c, next) => {
  c.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  c.header('Access-Control-Allow-Methods', 'GET, POST'); // Allow specific methods
  c.header('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
  return next();
});

var messages: string[] = [];

app.get('/', (c) => {
  return c.json({ messages });
});

app.post('/send/:name/:message', (c) => {
  messages.push(`${c.req.param('name')}: ${c.req.param('message')}`);
  return c.json({ messages });
});

// Handle preflight requests for CORS
app.options('*', (c) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST');
  c.header('Access-Control-Allow-Headers', 'Content-Type');
  return c.text('CORS preflight response');
});

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
