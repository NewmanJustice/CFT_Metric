import app from './app';
import { generateMetrics } from '../src/utils/metricsGenerator';

const port = 4000;

import cors from 'cors';
import express from 'express';
app.use(cors());
app.use(express.json());

app.post('/api/generate', (req: express.Request, res: express.Response) => {
  const { metrics, count, month, teams } = req.body;
  if (!metrics || !Array.isArray(metrics) || metrics.length === 0) {
    return res.status(400).json({ error: 'Missing metrics' });
  }
  let data: any = {};
  if (metrics.includes('dora')) {
    data.dora = generateMetrics('dora', count || 10, month, teams);
  }
  if (metrics.includes('space')) {
    data.space = generateMetrics('space', count || 10, month, teams);
  }
  res.json(data);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
  });
}

// Export app for testing
export default app;
