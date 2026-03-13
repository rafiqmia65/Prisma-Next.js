import { Router } from "express";
import SpecialtyRoutes from "../modules/specialty/specialty.route";
import AuthRoutes from "../modules/auth/auth.route";
import doctorRoutes from "../modules/doctor/doctor.route";
import userRoutes from "../modules/user/user.route";
import AdminRoutes from "../modules/admin/admin.route";
import doctorScheduleRoutes from "../modules/doctorSchedule/doctorSchedule.route";
import scheduleRouter from "../modules/schedule/schedule.route";
import AppointmentRoutes from "../modules/appointment/appointment.route";
import PatientRoutes from "../modules/patient/patient.route";
import PrescriptionRoutes from "../modules/prescription/prescription.route";
import ReviewRoutes from "../modules/review/review.route";
import StatsRoutes from "../modules/stats/stats.route";
import PaymentRoutes from "../modules/payment/payment.route";

//  type the router
const indexRoutes: Router = Router();

// Authentication Routes
indexRoutes.use("/auth", AuthRoutes);

// User Routes
indexRoutes.use("/users", userRoutes);

// Admin Routes
indexRoutes.use("admin", AdminRoutes);

// Specialty Route
indexRoutes.use("/specialties", SpecialtyRoutes);

// Doctor Route
indexRoutes.use("/doctors", doctorRoutes);

// Doctor Schedule Route
indexRoutes.use("/doctor-schedules", doctorScheduleRoutes);

// Schedule Route
indexRoutes.use("/schedules", scheduleRouter);

// Schedule Route
indexRoutes.use("/appointments", AppointmentRoutes);

indexRoutes.use("/patients", PatientRoutes);

indexRoutes.use("/prescriptions", PrescriptionRoutes);

indexRoutes.use("/reviews", ReviewRoutes);

indexRoutes.use("/stats", StatsRoutes);

indexRoutes.use("/payments", PaymentRoutes);

export default indexRoutes;
