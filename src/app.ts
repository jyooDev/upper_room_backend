import express, { type Request, type Response } from 'express'; // import express package

import apiRoutes from './routes'

const app = express(); // instantiate the express server

app.use("/api", apiRoutes)

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong from Jinah")
})

export default app