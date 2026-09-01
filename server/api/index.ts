// Vercel serverless entrypoint.
//
// Vercel turns this file into a single function and (via vercel.json rewrites)
// routes every request to it. We hand the request straight to the Express app.
// Note we import from `app.js`, NOT `index.js`, so `app.listen()` is never
// called — the serverless runtime owns the socket.
import { createApp } from '../src/app.js';

const app = createApp();

export default app;
