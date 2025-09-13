import express, { Request, Response } from 'express';
import { sequelize } from './db';
import { initModels } from './models';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, async () => {
  await initModels();
  await sequelize.authenticate();
  console.log(`Server running at http://localhost:${port}`);
});
