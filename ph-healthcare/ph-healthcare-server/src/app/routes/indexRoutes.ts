import { Router } from "express";
import SpecialtyRoutes from "../modules/specialty/specialty.route";
import AuthRoutes from "../modules/auth/auth.route";
import userRoputes from "../modules/user/user.route";
import doctorRoutes from "../modules/doctor/doctor.route";

//  type the router
const indexRoutes: Router = Router();

// Authentication Routes
indexRoutes.use("/auth", AuthRoutes);

// User Routes
indexRoutes.use("/users", userRoputes);

// Specialty Route
indexRoutes.use("/specialties", SpecialtyRoutes);

// Doctor Route
indexRoutes.use("/doctors", doctorRoutes);

export default indexRoutes;
