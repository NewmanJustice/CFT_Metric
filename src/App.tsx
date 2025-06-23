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

const METRICS = [
  { key: 'dora', label: 'DORA' },
  { key: 'space', label: 'SPACE' }
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

type MetricsData = {
  dora?: DoraMetric[]
  space?: SpaceMetric[]
}

function App() {
  const [selected, setSelected] = useState<string[]>(['dora'])
  const [count, setCount] = useState(10)
  const [data, setData] = useState<MetricsData>({})
  const [loading, setLoading] = useState(false)
>>>>>>> 3778a48 (Resolve README.md merge conflict)
  const [month, setMonth] = useState<string>(new Date().toISOString().slice(0, 7));
  const [teamQuery, setTeamQuery] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const TEAM_OPTIONS = [
    'Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta', 'Team Epsilon',
    'Team Zeta', 'Team Eta', 'Team Theta', 'Team Iota', 'Team Kappa'
  ];
  const filteredTeams = TEAM_OPTIONS.filter(t => t.toLowerCase().includes(teamQuery.toLowerCase()));

  const handleCheckbox = (key: string) => {
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

  const generate = async () => {
    setLoading(true)
    const res = await fetch('http://localhost:4000/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metrics: selected, count, month, teams: selectedTeams })
    })
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  return (
    <div className="container" style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h1>CFT Metrics</h1>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        <md-filled-card style={{ flex: 1, minWidth: 260, padding: 24, boxSizing: 'border-box' }}>
          <md-filled-text-field
            label="Number of records"
            type="number"
            min={1}
            max={100}
            value={count}
            style={{ width: '100%' }}
            onInput={e => {
              const newValue = Number((e.target as HTMLInputElement).value);
              if (newValue !== count) setCount(newValue);
            }}
          ></md-filled-text-field>
        </md-filled-card>
        <md-filled-card style={{ flex: 1, minWidth: 260, padding: 24, boxSizing: 'border-box' }}>
          <label style={{ display: 'block', fontSize: 14, marginBottom: 8, color: '#555', textAlign: 'left' }}>
            Month
            <input
              type="month"
              value={month}
              onChange={e => setMonth(e.target.value)}
              style={{
                width: '100%',
                fontSize: 16,
                padding: '12px 8px',
                borderRadius: 4,
                border: '1px solid #ccc',
                marginTop: 4,
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </label>
        </md-filled-card>
        <md-filled-card style={{ flex: 1, minWidth: 260, padding: 24, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', gap: 8, paddingTop: '0.5em', marginBottom: '0.5em' }}>
            <button type="button" style={{ fontSize: 12, padding: '2px 8px', border: 'none', background: '#eee', borderRadius: 4, cursor: 'pointer', color: '#111' }}
              onClick={() => setSelectedTeams([...TEAM_OPTIONS])}>Select All</button>
            <button type="button" style={{ fontSize: 12, padding: '2px 8px', border: 'none', background: '#eee', borderRadius: 4, cursor: 'pointer', color: '#111' }}
              onClick={() => setSelectedTeams([])}>Deselect All</button>
          </div>
          <md-filled-text-field
            label="Search Teams"
            value={teamQuery}
            style={{ width: '100%' }}
            onInput={e => {
              const newValue = (e.target as HTMLInputElement).value;
              if (newValue !== teamQuery) setTeamQuery(newValue);
            }}
          ></md-filled-text-field>
          <div style={{ maxHeight: 120, overflowY: 'auto', border: '1px solid #eee', borderRadius: 8, background: '#fff', marginTop: 4 }}>
            {filteredTeams.map(team => (
              <label key={team} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', color: '#111', background: '#fff' }}>
                <input
                  type="checkbox"
                  checked={selectedTeams.includes(team)}
                  onChange={() => setSelectedTeams(sel => sel.includes(team) ? sel.filter(t => t !== team) : [...sel, team])}
                />
                <span style={{ color: '#111' }}>{team}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: 4, fontSize: 12, color: '#555' }}>
            Selected: {selectedTeams.join(', ') || 'None'}
          </div>
        </md-filled-card>
        <md-filled-card style={{ flex: 1, minWidth: 260, padding: 24, boxSizing: 'border-box' }}>
          <div style={{ display: 'flex', gap: 16 }}>
            {METRICS.map(m => (
              <label key={m.key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <md-checkbox
                  checked={selected.includes(m.key)}
                  onClick={() => handleCheckbox(m.key)}
                  value={m.key}
                ></md-checkbox>
                {m.label}
              </label>
            ))}
          </div>
        </md-filled-card>
      </div>
      <form onSubmit={e => { e.preventDefault(); generate(); }} style={{ width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <md-filled-button type="submit" disabled={loading || selected.length === 0} style={{ width: '100%', maxWidth: 400, minWidth: 140 }}>
            {loading ? <md-circular-progress indeterminate style={{ width: 24, height: 24, verticalAlign: 'middle' }}></md-circular-progress> : 'Generate Data'}
          </md-filled-button>
        </div>
      </form>
      <div style={{ marginTop: 24 }}>
        {data.dora && (
          <div>
            <h2>DORA Metrics</h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <md-filled-button onClick={() => downloadCSV(data.dora!, 'dora.csv')}>Download CSV</md-filled-button>
              <md-filled-button onClick={() => downloadJSON(data.dora!, 'dora.json')}>Download JSON</md-filled-button>
            </div>
            <div style={{ overflowX: 'auto' }}>
>>>>>>> 3778a48 (Resolve README.md merge conflict)
              <table className="md-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>ID</th><th>Team Name</th><th>Deployment Frequency</th><th>Lead Time</th><th>Change Failure Rate</th><th>Time to Restore</th><th>Month</th>
                  </tr>
                </thead>
                <tbody>
                  {data.dora.map(row => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.teamName}</td>
                      <td>{row.deploymentFrequency}</td>
                      <td>{row.leadTimeForChanges}</td>
                      <td>{row.changeFailureRate}</td>
                      <td>{row.timeToRestoreService}</td>
                      <td>{row.month ? new Date(row.month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}</td>
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
          </div>
        )}
        {data.space && (
          <div style={{ marginTop: 32 }}>
            <h2>SPACE Metrics</h2>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
              <md-filled-button onClick={() => downloadCSV(data.space!, 'space.csv')}>Download CSV</md-filled-button>
              <md-filled-button onClick={() => downloadJSON(data.space!, 'space.json')}>Download JSON</md-filled-button>
            </div>
            <div style={{ overflowX: 'auto' }}>
>>>>>>> 3778a48 (Resolve README.md merge conflict)
              <table className="md-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>ID</th><th>Team Name</th><th>Team Satisfaction</th><th># T-Shaped</th><th>Performance</th><th>Activity</th><th>Communication</th><th>Efficiency</th><th>Month</th>
                  </tr>
                </thead>
                <tbody>
                  {data.space.map(row => (
                    <tr key={row.id}>
                      <td>{row.id}</td>
                      <td>{row.teamName}</td>
                      <td>{row.satisfaction.teamSatisfaction}</td>
                      <td>{row.satisfaction.numberOfTShaped}</td>
                      <td>{row.performance}</td>
                      <td>{row.activity}</td>
                      <td>{row.communication}</td>
                      <td>{row.efficiency}</td>
                      <td>{row.month ? new Date(row.month).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}</td>
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
          </div>
        )}
      </div>
    </div>
  )
}

export default App
>>>>>>> 3778a48 (Resolve README.md merge conflict)
