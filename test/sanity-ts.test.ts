/**
 * @jest-environment node
 */
describe('Sanity TS', () => {
  it('should run a simple TypeScript test', () => {
    expect(2 + 2).toBe(4);
  });
});
