import express, { Application, Request, Response } from "express";

const app: Application = express();

// Enable URL-encoded from data passing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

// Basic Route

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "PH Healthcare server is running successfully",
  });
});

export default app;
