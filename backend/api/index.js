import app from '../src/app.js';

// Vercel expects the handler to be exported as default
export default function handler(req, res) {
  return app(req, res);
}
