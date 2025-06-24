// Centralized metrics generator utility
import type { DoraMetric } from '../entities/DoraMetric';
import type { SpaceMetric } from '../entities/SpaceMetric';

export function generateMetrics(type: 'dora' | 'space', count: number, month: string, teams: string[]): DoraMetric[] | SpaceMetric[] {
  const teamList = teams && teams.length > 0 ? teams : ['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega'];
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
      changeFailureRate: Math.random().toFixed(2), // string
      timeToRestoreService: Math.floor(Math.random() * 60) + 1,
      month: new Date(monthValue)
    })) as DoraMetric[];
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
      month: new Date(monthValue)
    })) as SpaceMetric[];
  }
}
