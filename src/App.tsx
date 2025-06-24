import React, { useState } from 'react';
// Only import CSS if not in test environment
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') {
  require('./App.css');
}
import { downloadCSV, downloadJSON } from './downloadUtils';
import type { DoraMetric } from './entities/DoraMetric';
import type { SpaceMetric } from './entities/SpaceMetric';
import { Card, TextField, Button, Checkbox, CircularProgress, FormControlLabel, Typography } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const METRICS = [
  { key: 'dora', label: 'DORA' },
  { key: 'space', label: 'SPACE' }
];

const TEAM_OPTIONS = [
  'Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Team Epsilon',
  'Team Zeta', 'Team Eta', 'Team Theta', 'Team Iota', 'Team Kappa'
];

type MetricsData = {
  dora?: DoraMetric[];
  space?: SpaceMetric[];
};

function App() {
  const [selected, setSelected] = useState<string[]>(['dora']);
  const [count, setCount] = useState(10);
  const [data, setData] = useState<MetricsData>({});
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [teamQuery, setTeamQuery] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  // Pagination state
  const [doraPage, setDoraPage] = useState(1);
  const [spacePage, setSpacePage] = useState(1);
  const PAGE_SIZE = 10;

  const filteredTeams = TEAM_OPTIONS.filter(t => t.toLowerCase().includes(teamQuery.toLowerCase()));

  const handleCheckbox = (key: string) => {
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const generate = async () => {
    setLoading(true);
    const res = await fetch('http://localhost:4000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metrics: selected, count, month, teams: selectedTeams })
    });
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  // Helper for paginated/lazy data
  const getPaginated = (arr: any[] | undefined, page: number) => {
    if (!arr) return [];
    return arr.slice(0, page * PAGE_SIZE);
  };

  return (
    <div className="container" style={{ minHeight: '100vh', width: '100vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>CFT Metrics</Typography>
        <Typography variant="h4" component="h2" gutterBottom>Generate some dummy data</Typography>
        {/* Metrics selection - moved below h2 */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <Card sx={{ p: 3, boxSizing: 'border-box', maxWidth: 400, minWidth: 140, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="subtitle1" sx={{ mb: 2, textAlign: 'center' }}>Which type of data to generate?</Typography>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', width: '100%' }}>
              {METRICS.map(m => (
                <FormControlLabel
                  key={m.key}
                  control={
                    <Checkbox
                      checked={selected.includes(m.key)}
                      onChange={() => handleCheckbox(m.key)}
                    />
                  }
                  label={m.label}
                />
              ))}
            </div>
          </Card>
        </div>
        {/* Options row - centered */}
        <div style={{ display: 'flex', gap: 24, flexWrap: 'nowrap', marginBottom: 32, justifyContent: 'center', width: '100%' }}>
          {/* Number of records */}
          <Card sx={{ flex: 1, minWidth: 260, p: 3, boxSizing: 'border-box' }}>
            <TextField
              id="number-of-records"
              name="number-of-records"
              label="Number of records"
              type="number"
              inputProps={{ min: 1, max: 100, name: 'number-of-records' }}
              value={count}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value))}
            />
          </Card>
          {/* Month selector using MUI DatePicker */}
          <Card sx={{ flex: 1, minWidth: 260, p: 3, boxSizing: 'border-box' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                views={['year', 'month']}
                label="Select Month"
                value={month ? dayjs(month) : null}
                onChange={(newValue) => {
                  if (newValue) setMonth(newValue.format('YYYY-MM'));
                }}
              />
            </LocalizationProvider>
          </Card>
          {/* Team selection */}
          <Card sx={{ flex: 1, minWidth: 260, p: 3, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', gap: 8, paddingTop: '0.5em', marginBottom: '0.5em', justifyContent: 'center', width: '100%' }}>
              <Button size="small" variant="outlined" onClick={() => setSelectedTeams([...TEAM_OPTIONS])}>Select All</Button>
              <Button size="small" variant="outlined" onClick={() => setSelectedTeams([])}>Deselect All</Button>
            </div>
            <TextField
              id="search-teams"
              name="search-teams"
              label="Search Teams"
              value={teamQuery}
              fullWidth
              inputProps={{ name: 'search-teams' }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTeamQuery(e.target.value)}
            />
            <div style={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #eee', borderRadius: 8, background: '#fff', marginTop: 4 }}>
              {filteredTeams.map(team => (
                <FormControlLabel
                  key={team}
                  control={
                    <Checkbox
                      checked={selectedTeams.includes(team)}
                      onChange={() => setSelectedTeams(sel => sel.includes(team) ? sel.filter(t => t !== team) : [...sel, team])}
                    />
                  }
                  label={<span style={{ color: '#111' }}>{team}</span>}
                  sx={{ ml: 1 }}
                />
              ))}
            </div>
            <div style={{ marginTop: 4, fontSize: 12, color: '#555' }}>
              Selected: {selectedTeams.join(', ') || 'None'}
            </div>
          </Card>
        </div>
        {/* Generate button */}
        <form onSubmit={e => { e.preventDefault(); generate(); }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button type="submit" variant="contained" disabled={loading || selected.length === 0} sx={{ width: '100%', maxWidth: 400, minWidth: 140 }}>
              {loading ? <CircularProgress size={24} sx={{ verticalAlign: 'middle' }} /> : 'Generate Data?'}
            </Button>
          </div>
        </form>
      </div>
      {/* Data tables */}
      <div style={{ marginTop: 24, width: '100%', maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {data.dora && (
          <div style={{ width: '100%' }}>
            <Typography variant="h5" gutterBottom>DORA Metrics</Typography>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Button variant="contained" onClick={() => downloadCSV(data.dora!, 'dora.csv')}>Download CSV</Button>
              <Button variant="contained" onClick={() => downloadJSON(data.dora!, 'dora.json')}>Download JSON</Button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="md-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>ID</th>
                    <th style={{ textAlign: 'center' }}>Team Name</th>
                    <th style={{ textAlign: 'center' }}>Deployment Frequency</th>
                    <th style={{ textAlign: 'center' }}>Lead Time</th>
                    <th style={{ textAlign: 'center' }}>Change Failure Rate</th>
                    <th style={{ textAlign: 'center' }}>Time to Restore</th>
                    <th style={{ textAlign: 'center' }}>Month</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginated(data.dora, doraPage).map(row => (
                    <tr key={row.id}>
                      <td style={{ textAlign: 'center' }}>{row.id}</td>
                      <td style={{ textAlign: 'center' }}>{row.teamName}</td>
                      <td style={{ textAlign: 'center' }}>{row.deploymentFrequency}</td>
                      <td style={{ textAlign: 'center' }}>{row.leadTimeForChanges}</td>
                      <td style={{ textAlign: 'center' }}>{row.changeFailureRate}</td>
                      <td style={{ textAlign: 'center' }}>{row.timeToRestoreService}</td>
                      <td style={{ textAlign: 'center' }}>{row.month ? new Date(row.month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.dora.length > PAGE_SIZE && doraPage * PAGE_SIZE < data.dora.length && (
              <Button sx={{ mt: 2 }} variant="outlined" onClick={() => setDoraPage(p => p + 1)}>
                Load More
              </Button>
            )}
          </div>
        )}
        {data.space && (
          <div style={{ marginTop: 32, width: '100%' }}>
            <Typography variant="h5" gutterBottom>SPACE Metrics</Typography>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <Button variant="contained" onClick={() => downloadCSV(data.space!, 'space.csv')}>Download CSV</Button>
              <Button variant="contained" onClick={() => downloadJSON(data.space!, 'space.json')}>Download JSON</Button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className="md-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'center' }}>ID</th>
                    <th style={{ textAlign: 'center' }}>Team Name</th>
                    <th style={{ textAlign: 'center' }}>Team Satisfaction</th>
                    <th style={{ textAlign: 'center' }}># T-Shaped</th>
                    <th style={{ textAlign: 'center' }}>Performance</th>
                    <th style={{ textAlign: 'center' }}>Activity</th>
                    <th style={{ textAlign: 'center' }}>Communication</th>
                    <th style={{ textAlign: 'center' }}>Efficiency</th>
                    <th style={{ textAlign: 'center' }}>Month</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginated(data.space, spacePage).map(row => (
                    <tr key={row.id}>
                      <td style={{ textAlign: 'center' }}>{row.id}</td>
                      <td style={{ textAlign: 'center' }}>{row.teamName}</td>
                      <td style={{ textAlign: 'center' }}>{row.satisfaction.teamSatisfaction}</td>
                      <td style={{ textAlign: 'center' }}>{row.satisfaction.numberOfTShaped}</td>
                      <td style={{ textAlign: 'center' }}>{row.performance}</td>
                      <td style={{ textAlign: 'center' }}>{row.activity}</td>
                      <td style={{ textAlign: 'center' }}>{row.communication}</td>
                      <td style={{ textAlign: 'center' }}>{row.efficiency}</td>
                      <td style={{ textAlign: 'center' }}>{row.month ? new Date(row.month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.space.length > PAGE_SIZE && spacePage * PAGE_SIZE < data.space.length && (
              <Button sx={{ mt: 2 }} variant="outlined" onClick={() => setSpacePage(p => p + 1)}>
                Load More
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
