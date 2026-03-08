import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { DoctorScheduleController } from "./doctorSchedule.controller";
import { Role } from "../../../../generated/prisma/enums";

const doctorScheduleRoutes: Router = Router();

doctorScheduleRoutes.post(
  "/create-my-doctor-schedule",
  checkAuth(Role.DOCTOR),
  DoctorScheduleController.createMyDoctorSchedule,
);
doctorScheduleRoutes.get(
  "/my-doctor-schedules",
  checkAuth(Role.DOCTOR),
  DoctorScheduleController.getMyDoctorSchedules,
);
doctorScheduleRoutes.get(
  "/",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorScheduleController.getAllDoctorSchedules,
);
doctorScheduleRoutes.get(
  "/:doctorId/schedule/:scheduleId",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  DoctorScheduleController.getDoctorScheduleById,
);
doctorScheduleRoutes.patch(
  "/update-my-doctor-schedule",
  checkAuth(Role.DOCTOR),
  DoctorScheduleController.updateMyDoctorSchedule,
);
doctorScheduleRoutes.delete(
  "/delete-my-doctor-schedule/:id",
  checkAuth(Role.DOCTOR),
  DoctorScheduleController.deleteMyDoctorSchedule,
);

export default doctorScheduleRoutes;
