import express, { type Request, type Response } from 'express'; // import express package
import cors from 'cors';

import apiRoutes from './routes';

const app = express(); // instantiate the express server

app.use(cors()); // This enables CORS for all origins and methods
app.use(express.json());
app.use('/api', apiRoutes);

app.get('/ping', (req: Request, res: Response) => {
  res.send('pong from Jinah');
});

export default app;
