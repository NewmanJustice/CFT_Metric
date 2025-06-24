import { generateMetrics } from '../../src/utils/metricsGenerator';

describe('generateMetrics', () => {
  it('generates correct number of DORA metrics', () => {
    const result = generateMetrics('dora', 5, '2025-06', ['Team Alpha']);
    expect(result).toHaveLength(5);
    result.forEach(metric => {
      if ('deploymentFrequency' in metric) {
        expect(metric.teamName).toBe('Team Alpha');
        expect(typeof metric.deploymentFrequency).toBe('number');
        expect(typeof metric.leadTimeForChanges).toBe('number');
        expect(typeof metric.changeFailureRate).toBe('string');
        expect(typeof metric.timeToRestoreService).toBe('number');
        expect(metric.month instanceof Date).toBe(true);
      }
    });
  });

  it('generates correct number of SPACE metrics', () => {
    const result = generateMetrics('space', 3, '2025-07', ['Team Beta']);
    expect(result).toHaveLength(3);
    result.forEach(metric => {
      if ('satisfaction' in metric) {
        expect(metric.teamName).toBe('Team Beta');
        expect(typeof metric.satisfaction.teamSatisfaction).toBe('string');
        expect(typeof metric.satisfaction.numberOfTShaped).toBe('number');
        expect(typeof metric.performance).toBe('number');
        expect(typeof metric.activity).toBe('number');
        expect(typeof metric.communication).toBe('number');
        expect(typeof metric.efficiency).toBe('number');
        expect(metric.month instanceof Date).toBe(true);
      }
    });
  });

  it('uses default teams if none provided', () => {
    const result = generateMetrics('dora', 2, '2025-08', []);
    expect(result).toHaveLength(2);
    result.forEach(metric => {
      if ('deploymentFrequency' in metric) {
        expect(['Alpha', 'Beta', 'Gamma', 'Delta', 'Omega']).toContain(metric.teamName);
      }
    });
  });

  it('uses current month if none provided', () => {
    const now = new Date();
    const expectedMonth = new Date(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
    const result = generateMetrics('dora', 1, '', ['Team Alpha']);
    if ('deploymentFrequency' in result[0]) {
      expect(result[0].month.getFullYear()).toBe(expectedMonth.getFullYear());
      expect(result[0].month.getMonth()).toBe(expectedMonth.getMonth());
    }
  });
});
