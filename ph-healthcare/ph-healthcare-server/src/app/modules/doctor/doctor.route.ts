import { Router } from "express";
import { DoctorController } from "./doctor.controller";

const doctorRoutes: Router = Router();

// Get All Doctors
doctorRoutes.get("/", DoctorController.getAllDoctors);

// Get Doctor By Id
doctorRoutes.get("/:id", DoctorController.getDoctorById);

// Update Doctor
doctorRoutes.patch("/:id", DoctorController.updateDoctor);

// Delete Doctor
doctorRoutes.delete("/:id", DoctorController.deleteDoctor);

export default doctorRoutes;
