import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { ScheduleController } from "./schedule.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { Role } from "../../../../generated/prisma/enums";
import { ScheduleValidation } from "./schedule.validation";

const scheduleRouter: Router = Router();

scheduleRouter.post(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(ScheduleValidation.createScheduleZodSchema),
  ScheduleController.createSchedule,
);
scheduleRouter.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
  ScheduleController.getAllSchedules,
);
scheduleRouter.get(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN, Role.DOCTOR),
  ScheduleController.getScheduleById,
);
scheduleRouter.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(ScheduleValidation.updateScheduleZodSchema),
  ScheduleController.updateSchedule,
);
scheduleRouter.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ScheduleController.deleteSchedule,
);

export default scheduleRouter;
