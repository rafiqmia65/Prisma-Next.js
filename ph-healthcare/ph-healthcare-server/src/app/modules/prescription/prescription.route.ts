import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { PrescriptionController } from "./prescription.controller";
import { Role } from "../../../../generated/prisma/enums";
import { PrescriptionValidation } from "./prescription.validation";

const PrescriptionRoutes: Router = Router();

PrescriptionRoutes.get(
  "/",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
  PrescriptionController.getAllPrescriptions,
);

PrescriptionRoutes.get(
  "/my-prescriptions",
  checkAuth(Role.PATIENT, Role.DOCTOR),
  PrescriptionController.myPrescriptions,
);

PrescriptionRoutes.post(
  "/",
  checkAuth(Role.DOCTOR),
  validateRequest(PrescriptionValidation.createPrescriptionZodSchema),
  PrescriptionController.givePrescription,
);

PrescriptionRoutes.patch(
  "/:id",
  checkAuth(Role.DOCTOR),
  validateRequest(PrescriptionValidation.updatePrescriptionZodSchema),
  PrescriptionController.updatePrescription,
);

PrescriptionRoutes.delete(
  "/:id",
  checkAuth(Role.DOCTOR),
  PrescriptionController.deletePrescription,
);

export default PrescriptionRoutes;
