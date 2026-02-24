import { Router } from "express";
import SpecialtyRoutes from "../modules/specialty/specialty.route";
import AuthRoutes from "../modules/auth/auth.route";

//  type the router
const indexRoutes: Router = Router();

// Authentication Routes
indexRoutes.use("/auth", AuthRoutes);

// Specialty Route
indexRoutes.use("/specialties", SpecialtyRoutes);

export default indexRoutes;
