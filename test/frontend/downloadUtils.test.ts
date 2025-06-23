import { downloadCSV, downloadJSON } from '../../src/downloadUtils';

describe('downloadUtils', () => {
  let mockA: any;
  let origURL: any;
  beforeEach(() => {
    // Mock createElement and click for download
    mockA = { href: '', download: '', click: jest.fn() };
    jest.spyOn(document, 'createElement').mockImplementation(() => mockA);
    // Patch window.URL if not already patched
    origURL = window.URL;
    (window as any).URL = {
      createObjectURL: jest.fn(() => 'blob:url'),
      revokeObjectURL: jest.fn(),
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    window.URL = origURL;
  });

  it('should flatten nested objects for CSV', () => {
    const data = [{ a: 1, b: { c: 2 } }];
    downloadCSV(data, 'test.csv');
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(mockA.download).toBe('test.csv');
    expect(mockA.click).toHaveBeenCalled();
  });

  it('should download JSON', () => {
    const data = { foo: 'bar' };
    downloadJSON(data, 'test.json');
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(mockA.download).toBe('test.json');
    expect(mockA.click).toHaveBeenCalled();
  });
});
