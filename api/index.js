import server from '../dist/server/server.js';

export default async function handler(req, res) {
  try {
    const host = req.headers.host || 'example.com';
    const url = new URL(req.url || '/', `https://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        headers.set(key, Array.isArray(value) ? value.join(', ') : value);
      }
    }

    let body;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = await new Promise((resolve, reject) => {
        const chunks = [];
        req.on('data', (chunk) => chunks.push(chunk));
        req.on('end', () => resolve(Buffer.concat(chunks).toString()));
        req.on('error', reject);
      });
    }

    const request = new Request(url, {
      method: req.method,
      headers,
      body: body || undefined,
    });

    const response = await server.fetch(request, {}, {});

    res.statusCode = response.status;
    response.headers.forEach((value, key) => res.setHeader(key, value));

    const text = await response.text();
    res.end(text);
  } catch (error) {
    console.error('API ERROR:', error);
    console.error(error && error.stack ? error.stack : '');
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain');
    res.end('Internal Server Error');
  }
}
