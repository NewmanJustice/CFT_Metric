import app from './app';

const port = 4000;

import cors from 'cors';
import express from 'express';
app.use(cors());
app.use(express.json());

function randomTeamName() {
  const teams = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega'];
  return teams[Math.floor(Math.random() * teams.length)];
}
function randomMonth() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  return new Date(`${year}-${month.toString().padStart(2, '0')}-01`);
}

// Dummy DORA and SPACE metrics generator
function generateMetrics(type: 'dora' | 'space', count: number, month: string, teams: string[]) {
  // Use provided teams or fallback to default
  const teamList = teams && teams.length > 0 ? teams : ['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega'];
  // Use provided month or fallback to current month
  const monthValue = month || (() => {
    const now = new Date();
    const m = now.getMonth() + 1;
    const y = now.getFullYear();
    return `${y}-${m.toString().padStart(2, '0')}`;
  })();
  if (type === 'dora') {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      teamName: teamList[Math.floor(Math.random() * teamList.length)],
      deploymentFrequency: Math.floor(Math.random() * 10) + 1,
      leadTimeForChanges: Math.floor(Math.random() * 100) + 1,
      changeFailureRate: Math.random().toFixed(2),
      timeToRestoreService: Math.floor(Math.random() * 60) + 1,
      month: monthValue
    }));
  } else {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      teamName: teamList[Math.floor(Math.random() * teamList.length)],
      satisfaction: {
        teamSatisfaction: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)],
        numberOfTShaped: Math.floor(Math.random() * 10) + 1
      },
      performance: Math.floor(Math.random() * 100),
      activity: Math.floor(Math.random() * 100),
      communication: Math.floor(Math.random() * 100),
      efficiency: Math.floor(Math.random() * 100),
      month: monthValue
    }));
  }
}

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
