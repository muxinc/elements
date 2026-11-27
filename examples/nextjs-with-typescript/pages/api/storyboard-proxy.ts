import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url, delay } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Missing required "url" query parameter' });
  }

  const delayMs = parseInt(typeof delay === 'string' ? delay : '0', 10) || 0;

  if (delayMs > 0) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  const upstream = await fetch(url);

  if (!upstream.ok) {
    return res.status(upstream.status).json({ error: `Upstream error: ${upstream.statusText}` });
  }

  const body = await upstream.text();

  res.setHeader('Content-Type', upstream.headers.get('content-type') ?? 'text/vtt');
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(body);
}
