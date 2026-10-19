import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { cpSync, existsSync } from 'fs';
import {defineConfig} from 'vite';

// Runtime-string image references use the "/src/assets/..." convention, which the
// Vite dev server serves from the project root. Copy that folder into dist on build
// so the same URLs keep resolving in production.
const copySourceAssets = () => ({
  name: 'copy-source-assets',
  apply: 'build' as const,
  closeBundle() {
    const root = import.meta.dirname || process.cwd();
    const src = path.resolve(root, 'src/assets');
    const dest = path.resolve(root, 'dist/src/assets');
    if (existsSync(src)) {
      cpSync(src, dest, { recursive: true });
    }
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), copySourceAssets()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || process.cwd(), './src'),
      },
      build: { outDir: 'dist' },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
