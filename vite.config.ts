import path from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import wyw from '@wyw-in-js/vite';
// @ts-ignore
import { pluginSsrDevFoucFix } from './src/plugins/vite-css-plugin';

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  plugins: [
    react(),
    pluginSsrDevFoucFix(),
    wyw({
      include: ['**/*.{ts,tsx}'],
      babelOptions: {
        presets: ['@babel/preset-typescript', '@babel/preset-react'],
      },
    }),
  ],
});
