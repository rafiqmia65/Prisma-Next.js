import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

const AuthRoutes: Router = Router();

AuthRoutes.post("/register", AuthController.registerPatient);
AuthRoutes.post("/login", AuthController.loginUser);
AuthRoutes.get(
  "/me",
  checkAuth(Role.ADMIN, Role.DOCTOR, Role.PATIENT, Role.SUPER_ADMIN),
  AuthController.getMe,
);

export default AuthRoutes;
