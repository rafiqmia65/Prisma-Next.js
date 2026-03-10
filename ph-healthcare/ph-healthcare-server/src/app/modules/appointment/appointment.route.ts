import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { AppointmentController } from "./appointment.controller";
import { Role } from "../../../../generated/prisma/enums";

const AppointmentRoutes: Router = Router();

AppointmentRoutes.post(
  "/book-appointment",
  checkAuth(Role.PATIENT),
  AppointmentController.bookAppointment,
);
AppointmentRoutes.get(
  "/my-appointments",
  checkAuth(Role.PATIENT, Role.DOCTOR),
  AppointmentController.getMyAppointments,
);
AppointmentRoutes.patch(
  "/change-appointment-status/:id",
  checkAuth(Role.PATIENT, Role.DOCTOR, Role.ADMIN, Role.SUPER_ADMIN),
  AppointmentController.changeAppointmentStatus,
);
AppointmentRoutes.get(
  "/my-single-appointment/:id",
  checkAuth(Role.PATIENT, Role.DOCTOR),
  AppointmentController.getMySingleAppointment,
);
AppointmentRoutes.get(
  "/all-appointments",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  AppointmentController.getAllAppointments,
);
AppointmentRoutes.post(
  "/book-appointment-with-pay-later",
  checkAuth(Role.PATIENT),
  AppointmentController.bookAppointmentWithPayLater,
);
AppointmentRoutes.post(
  "/initiate-payment/:id",
  checkAuth(Role.PATIENT),
  AppointmentController.initiatePayment,
);

export default AppointmentRoutes;
