import express, { Application } from "express";
import { postRouter } from "./modules/post/post.router";

const app: Application = express();

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "Prisma Blog App is running successfully",
  });
});

export default app;
