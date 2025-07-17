import { serve } from '@hono/node-server';
import { Hono } from 'hono/quick';
import { cors } from 'hono/cors';
import { zValidator } from '@hono/zod-validator';
import consola from 'consola';

import { configEnv } from './config/index.js';
import { chatValidator } from './validators/chatValidator.js';
import { googleAi } from './libraries/google.js';

// Create hono app
const app = new Hono();

// Initialize CORS middleware for API
app.use('api/*', cors());

// Chat API Endpoint
app.post('/api/chat', zValidator('json', chatValidator), async ctx => {
    const { message } = ctx.req.valid('json');

    const result = await googleAi.models.generateContent({
        model: configEnv.GEMINI_MODEL,
        contents: message,
    });

    return ctx.json({
        reply: result.text,
    });
});


// Handle 500 Errors
app.onError((err, ctx) => {
    consola.error(err);
    return ctx.json({
        reply: 'Something went wrong!',
    }, 500);
});

serve({
    fetch: app.fetch,
    port: configEnv.PORT,
    hostname: configEnv.HOSTNAME,
}, (addr) => {
    consola.info(`Listening to http://${addr.address}:${addr.port}`);
});