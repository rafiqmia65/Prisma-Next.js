import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { StatsController } from "./stats.controller";
import { Role } from "../../../../generated/prisma/enums";

const StatsRoutes: Router = Router();

StatsRoutes.get(
  "/",
  checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR, Role.PATIENT),
  StatsController.getDashboardStatsData,
);

export default StatsRoutes;
