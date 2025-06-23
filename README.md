# Dummy Data Generator for DORA & SPACE Metrics

This is a full stack TypeScript web app with a Vite/React frontend and a Node.js/Express backend. The app generates and displays dummy data for DORA and SPACE metrics, allows users to select which metrics to generate, and provides options to download the data as CSV or JSON. The app is runnable locally.

## Getting Started

### 1. Install dependencies

```
npm install
cd backend && npm install
```

### 2. Run the backend server

```
cd backend
npm run dev
```

### 3. Run the frontend (in a separate terminal)

```
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:4000`.

## Linting and ESLint Configuration

This project uses ESLint for code quality. You can expand the ESLint configuration for type-aware and stylistic rules. See the comments in the config files for more details.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
