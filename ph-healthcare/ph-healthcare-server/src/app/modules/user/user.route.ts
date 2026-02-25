import { Router } from "express";
import { UserController } from "./user.controller";

const userRoputes: Router=Router();

userRoputes.post("/create-doctor", UserController.createDoctor);

export default userRoputes;