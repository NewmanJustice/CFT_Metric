import * as express from 'express';
import * as cors from 'cors';
import type { Request, Response } from 'express';

const app = (express as any).default ? (express as any).default() : (express as any)();

app.use((cors as any).default ? (cors as any).default() : (cors as any)());
app.use(app.json ? app.json() : (express as any).json());

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

app.post('/api/generate', (req: Request, res: Response) => {
  const { metrics, count, month, teams } = req.body;
  let data: any = {};
  if (metrics.includes('dora')) {
    data.dora = generateMetrics('dora', count || 10, month, teams);
  }
  if (metrics.includes('space')) {
    data.space = generateMetrics('space', count || 10, month, teams);
  }
  res.json(data);
});

export default app;
