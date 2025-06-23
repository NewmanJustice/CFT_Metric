<<<<<<< HEAD
<<<<<<< HEAD
import '../custom-elements.d.ts';
=======
>>>>>>> 3778a48 (Resolve README.md merge conflict)
=======
import '../custom-elements.d.ts';
>>>>>>> 2543601 (wip)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
<<<<<<< HEAD
<<<<<<< HEAD
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
=======

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
>>>>>>> 3778a48 (Resolve README.md merge conflict)
=======
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
>>>>>>> 2543601 (wip)
  </StrictMode>,
)
