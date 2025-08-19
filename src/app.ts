import express, { type Request, type Response } from 'express'; // import express package

const app = express(); // instantiate the express server

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong from Jinah")
})

export default app