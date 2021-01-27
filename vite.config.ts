import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [reactRefresh()],
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
});
