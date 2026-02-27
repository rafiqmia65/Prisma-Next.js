import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";

//  type the router
const SpecialtyRoutes: Router = Router();

SpecialtyRoutes.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SpecialtyController.createSpecialty,
);
SpecialtyRoutes.get("/", SpecialtyController.getAllSpecialties);
SpecialtyRoutes.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  SpecialtyController.deleteSpecialty,
);

export default SpecialtyRoutes;
