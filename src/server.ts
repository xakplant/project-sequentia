import fs from 'node:fs/promises';
import express, { Request, Response } from 'express';
import path from 'node:path';
import { sequelize } from './db';
import { initModels } from './models';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile(path.resolve(__dirname, 'index.html'), 'utf-8')
  : '';

// Create http server
const app = express();

// Add Vite or respective production middlewares
/** @type {import('vite').ViteDevServer | undefined} */
let vite: import('vite').ViteDevServer | undefined;
if (!isProduction) {
  const { createServer } = await import('vite');
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import('compression')).default;
  const sirv = (await import('sirv')).default;
  app.use(compression());
  app.use(base, sirv('./dist/client', { extensions: [] }));
}

app.use(express.static(path.join(__dirname, 'dist')));

// Serve HTML
app.use('*all', async (req: Request, res: Response) => {
  try {
    const url = req.originalUrl.replace(base, '');

    /** @type {string} */
    let template;
    /** @type {import('./src/entry-server.ts').render} */
    let render;
    if (!isProduction) {
      // Always read fresh template in development

      template = await fs.readFile(
        path.resolve(__dirname, 'index.html'),
        'utf-8',
      );
      template = await vite?.transformIndexHtml(url, template);
      render = (await vite?.ssrLoadModule('client/entry-server.tsx'))?.render;
    } else {
      template = templateHtml;
      // @ts-ignore
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url);

    const html = (template as string)
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-html-->`, rendered.html ?? '');

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (e) {
    // @ts-ignore
    vite?.ssrFixStacktrace(e);
    // @ts-ignore
    console.log(e.stack);
    // @ts-ignore
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, async () => {
  await initModels();
  await sequelize.authenticate();
  console.log(`Server started at http://localhost:${port}`);
});
