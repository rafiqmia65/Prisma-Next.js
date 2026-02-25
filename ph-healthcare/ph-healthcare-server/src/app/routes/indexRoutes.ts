import { Router } from "express";
import SpecialtyRoutes from "../modules/specialty/specialty.route";
import AuthRoutes from "../modules/auth/auth.route";
import doctorRoutes from "../modules/doctor/doctor.route";
import userRoutes from "../modules/user/user.route";

//  type the router
const indexRoutes: Router = Router();

// Authentication Routes
indexRoutes.use("/auth", AuthRoutes);

// User Routes
indexRoutes.use("/users", userRoutes);

// Specialty Route
indexRoutes.use("/specialties", SpecialtyRoutes);

// Doctor Route
indexRoutes.use("/doctors", doctorRoutes);

export default indexRoutes;
