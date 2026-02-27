import { Router } from "express";
import { DoctorController } from "./doctor.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { updateDoctorZodSchema } from "./doctor.validation";

const doctorRoutes: Router = Router();

doctorRoutes.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorController.getAllDoctors,
);
doctorRoutes.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorController.getDoctorById,
);
doctorRoutes.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateDoctorZodSchema),
  DoctorController.updateDoctor,
);
doctorRoutes.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorController.deleteDoctor,
);

export default doctorRoutes;
