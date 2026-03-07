import express, { Application, Request, Response } from "express";
import indexRoutes from "./app/routes/indexRoutes";
import globalErrorHandler from "./app/middleware/globalErrorHandler";
import notFound from "./app/middleware/notFound";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./app/lib/auth";
import path from "node:path";
import cors from "cors";
import { envVars } from "./app/config/env";
import qs from "qs";

const app: Application = express();

app.set("query parser", (str: string) => qs.parse(str));

app.set("view engine", "ejs");
app.set("views", path.resolve(process.cwd(), `src/app/templates`));

app.use(
  cors({
    origin: [
      envVars.FRONTEND_URL,
      envVars.BETTER_AUTH_URL,
      "http://localhost:3000",
      "http://localhost:5000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Enable URL-encoded from data passing
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//* Better Auth API endpoint
app.all("/api/auth/*", toNodeHandler(auth));

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
