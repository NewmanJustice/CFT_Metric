// Utility to flatten nested objects for CSV export
function flatten(obj: any, prefix = '', res: any = {}) {
  for (const key in obj) {
    const value = obj[key];
    const newKey = prefix ? `${prefix}_${key}` : key;
<<<<<<< HEAD
    if (Array.isArray(value)) {
      value.forEach((item, idx) => {
        flatten(item, `${newKey}_${idx}`, res);
      });
    } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
=======
    if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
>>>>>>> 3778a48 (Resolve README.md merge conflict)
      flatten(value, newKey, res);
    } else {
      res[newKey] = value instanceof Date ? value.toISOString() : value;
    }
  }
  return res;
}

// Utility to download data as CSV
export function downloadCSV(data: any[], filename: string) {
  if (!data.length) return;
  const flatData = data.map(row => flatten(row));
  const keys = Object.keys(flatData[0]);
  const csv = [keys.join(",")].concat(
    flatData.map((row) => keys.map((k) => row[k]).join(","))
  ).join("\n");
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// Utility to download data as JSON
export function downloadJSON(data: any, filename: string) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}
