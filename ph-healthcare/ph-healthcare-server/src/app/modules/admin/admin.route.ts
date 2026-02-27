import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { AdminController } from "./admin.controller";
import { Role } from "../../../../generated/prisma/enums";
import { updateAdminZodSchema } from "./admin.validation";

const AdminRoutes: Router = Router();

AdminRoutes.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAllAdmins,
);
AdminRoutes.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AdminController.getAdminById,
);
AdminRoutes.patch(
  "/:id",
  checkAuth(Role.SUPER_ADMIN),
  validateRequest(updateAdminZodSchema),
  AdminController.updateAdmin,
);
AdminRoutes.delete(
  "/:id",
  checkAuth(Role.SUPER_ADMIN),
  AdminController.deleteAdmin,
);

export default AdminRoutes;
