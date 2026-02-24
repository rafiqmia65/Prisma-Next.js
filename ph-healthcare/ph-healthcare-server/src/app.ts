import express, { Application, Request, Response } from "express";
import indexRoutes from "./app/routes/indexRoutes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
// import { toNodeHandler } from "better-auth/node";
// import { auth } from "./app/lib/auth";

const app: Application = express();

// Enable URL-encoded from data passing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());

//* Better Auth API endpoint
// app.all("/api/auth/*", toNodeHandler(auth));

//* Mount all API routes under /api/v1
app.use("/api/v1", indexRoutes);

// Basic Route

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "PH Healthcare server is running successfully",
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
