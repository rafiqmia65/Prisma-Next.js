import { Router } from "express";
import SpecialtyRoutes from "../modules/specialty/specialty.route";

//  type the router
const indexRoutes: Router = Router();

// Specialty Route
indexRoutes.use("/specialties", SpecialtyRoutes);

export default indexRoutes;
