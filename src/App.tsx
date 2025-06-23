<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from 'react';
import './App.css';
import { downloadCSV, downloadJSON } from './downloadUtils';
import type { DoraMetric } from './entities/DoraMetric';
import type { SpaceMetric } from './entities/SpaceMetric';
import { Card, CardContent, Typography, TextField, Checkbox, Button, CircularProgress, FormControlLabel, Box, FormGroup } from '@mui/material';
=======
import { useState } from 'react'
import './App.css'
import { downloadCSV, downloadJSON } from './downloadUtils'
import type { DoraMetric } from './entities/DoraMetric'
import type { SpaceMetric } from './entities/SpaceMetric'
>>>>>>> 3778a48 (Resolve README.md merge conflict)
=======
import React, { useState } from 'react';
// Only import CSS if not in test environment
if (typeof process !== 'undefined' && process.env.NODE_ENV !== 'test') {
  require('./App.css');
}
import { downloadCSV, downloadJSON } from './downloadUtils';
import type { DoraMetric } from './entities/DoraMetric';
import type { SpaceMetric } from './entities/SpaceMetric';
import { Card, TextField, Button, Checkbox, CircularProgress, FormControlLabel, Typography } from '@mui/material';
>>>>>>> 53352be (UI: Move metrics card below heading, center and match width, add label with question mark. Refactor layout for clarity and accessibility.)

const METRICS = [
  { key: 'dora', label: 'DORA' },
  { key: 'space', label: 'SPACE' }
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
]
=======
];
>>>>>>> 53352be (UI: Move metrics card below heading, center and match width, add label with question mark. Refactor layout for clarity and accessibility.)

type MetricsData = {
  dora?: DoraMetric[];
  space?: SpaceMetric[];
};

const TEAM_OPTIONS = [
  'Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Team Epsilon',
  'Team Zeta', 'Team Eta', 'Team Theta', 'Team Iota', 'Team Kappa'
];

function App() {
<<<<<<< HEAD
  const [selected, setSelected] = useState<string[]>(['dora'])
  const [count, setCount] = useState(10)
  const [data, setData] = useState<MetricsData>({})
  const [loading, setLoading] = useState(false)
>>>>>>> 3778a48 (Resolve README.md merge conflict)
=======
  const [selected, setSelected] = useState<string[]>(['dora']);
  const [count, setCount] = useState(10);
  const [data, setData] = useState<MetricsData>({});
  const [loading, setLoading] = useState(false);
>>>>>>> 53352be (UI: Move metrics card below heading, center and match width, add label with question mark. Refactor layout for clarity and accessibility.)
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [teamQuery, setTeamQuery] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  // Pagination state
  const [doraPage, setDoraPage] = useState(1);
  const [spacePage, setSpacePage] = useState(1);
  const PAGE_SIZE = 10;

  const filteredTeams = TEAM_OPTIONS.filter(t => t.toLowerCase().includes(teamQuery.toLowerCase()));

  const handleCheckbox = (key: string) => {
<<<<<<< HEAD
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
<<<<<<< HEAD
    );
  };

  const generate = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:4000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metrics: selected, count, month, teams: selectedTeams })
      });
      if (!res.ok) {
        throw new Error(`API error: ${res.status} ${res.statusText}`);
      }
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Failed to generate data:', error);
      alert('Failed to generate data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="container" sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      <Typography variant="h3" align="center" gutterBottom>CFT Metrics</Typography>
      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
        <Card sx={{ flex: 1, minWidth: 260 }}>
          <CardContent>
            <TextField
              label="Number of records"
              type="number"
              inputProps={{ min: 1, max: 100 }}
              value={count}
              fullWidth
              onChange={e => setCount(Number(e.target.value))}
              sx={{ mb: 1 }}
            />
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 260 }}>
          <CardContent>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>Month</Typography>
            <TextField
              type="month"
              value={month}
              onChange={e => setMonth(e.target.value)}
              fullWidth
            />
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 260 }}>
          <CardContent>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Button size="small" variant="outlined" onClick={() => setSelectedTeams([...TEAM_OPTIONS])}>Select All</Button>
              <Button size="small" variant="outlined" onClick={() => setSelectedTeams([])}>Deselect All</Button>
            </Box>
            <TextField
              label="Search Teams"
              value={teamQuery}
              onChange={e => setTeamQuery(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <Box sx={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #eee', borderRadius: 1, bgcolor: '#fff', mt: 1 }}>
              <FormGroup>
                {filteredTeams.map(team => (
                  <FormControlLabel
                    key={team}
                    control={
                      <Checkbox
                        checked={selectedTeams.includes(team)}
                        onChange={() => setSelectedTeams(sel => sel.includes(team) ? sel.filter(t => t !== team) : [...sel, team])}
                      />
                    }
                    label={team}
                  />
                ))}
              </FormGroup>
            </Box>
            <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
              Selected: {selectedTeams.join(', ') || 'None'}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, minWidth: 260 }}>
          <CardContent>
            <FormGroup row>
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
            </FormGroup>
          </CardContent>
        </Card>
      </Box>
      <form onSubmit={e => { e.preventDefault(); generate(); }} style={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading || selected.length === 0} sx={{ width: '100%', maxWidth: 400, minWidth: 140 }}>
            {loading ? <CircularProgress size={24} sx={{ verticalAlign: 'middle' }} /> : 'Generate Data'}
          </Button>
        </Box>
      </form>
      <Box sx={{ mt: 3 }}>
        {data.dora && (
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>DORA Metrics</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Button variant="outlined" onClick={() => downloadCSV(data.dora!, 'dora.csv')}>Download CSV</Button>
              <Button variant="outlined" onClick={() => downloadJSON(data.dora!, 'dora.json')}>Download JSON</Button>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
=======
    )
  }
=======
    setSelected(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };
>>>>>>> 53352be (UI: Move metrics card below heading, center and match width, add label with question mark. Refactor layout for clarity and accessibility.)

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
          {/* Month selector */}
          <Card sx={{ flex: 1, minWidth: 260, p: 3, boxSizing: 'border-box' }}>
            <TextField
              id="month"
              name="month"
              label="Month"
              type="month"
              value={month}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMonth(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              inputProps={{ style: { fontSize: 16, padding: '12px 8px' }, name: 'month' }}
            />
          </Card>
          {/* Team selection */}
          <Card sx={{ flex: 1, minWidth: 260, p: 3, boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', gap: 8, paddingTop: '0.5em', marginBottom: '0.5em' }}>
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
>>>>>>> 3778a48 (Resolve README.md merge conflict)
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
<<<<<<< HEAD
            </Box>
          </Box>
        )}
        {data.space && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>SPACE Metrics</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Button variant="outlined" onClick={() => downloadCSV(data.space!, 'space.csv')}>Download CSV</Button>
              <Button variant="outlined" onClick={() => downloadJSON(data.space!, 'space.json')}>Download JSON</Button>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
=======
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
>>>>>>> 3778a48 (Resolve README.md merge conflict)
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
<<<<<<< HEAD
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default App;
=======
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

<<<<<<< HEAD
export default App
>>>>>>> 3778a48 (Resolve README.md merge conflict)
=======
export default App;
>>>>>>> 53352be (UI: Move metrics card below heading, center and match width, add label with question mark. Refactor layout for clarity and accessibility.)
