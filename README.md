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

### 4. Using Material Web Components

This project uses [Material Web Components](https://github.com/material-components/material-web). To use and customize Material Web components:

- Components are imported directly in the React code (see `src/App.tsx`).
- You can find documentation and usage examples at: https://github.com/material-components/material-web/blob/main/docs/quick-start.md

If you add new Material Web components, import them at the top of your React files, e.g.:

```ts
import '@material/web/button/filled-button.js';
```

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
