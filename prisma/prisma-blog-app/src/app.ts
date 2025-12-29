import express, { Application } from "express";

const app: Application = express();

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Prisma Blog App is running successfully",
  });
});

export default app;
