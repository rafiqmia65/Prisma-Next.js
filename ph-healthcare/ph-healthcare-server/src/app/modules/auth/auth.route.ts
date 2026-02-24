import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRoutes: Router = Router();

AuthRoutes.post("/register", AuthController.registerPatient);

export default AuthRoutes;
