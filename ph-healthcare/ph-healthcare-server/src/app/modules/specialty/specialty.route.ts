import { Router } from "express";
import { SpecialtyController } from "./specialty.controller";

//  type the router
const SpecialtyRoutes: Router = Router();

SpecialtyRoutes.post("/", SpecialtyController.createSpecialty);
SpecialtyRoutes.get("/", SpecialtyController.getAllSpecialties);
SpecialtyRoutes.delete("/:id", SpecialtyController.deleteSpecialty);

export default SpecialtyRoutes;
