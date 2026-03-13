import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ReviewController } from "./review.controller";
import { Role } from "../../../../generated/prisma/enums";
import { ReviewValidation } from "./review.validation";

const ReviewRoutes: Router = Router();

ReviewRoutes.get("/", ReviewController.getAllReviews);

ReviewRoutes.post(
  "/",
  checkAuth(Role.PATIENT),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.giveReview,
);

ReviewRoutes.get(
  "/my-reviews",
  checkAuth(Role.PATIENT, Role.DOCTOR),
  ReviewController.myReviews,
);

ReviewRoutes.patch(
  "/:id",
  checkAuth(Role.PATIENT),
  validateRequest(ReviewValidation.updateReviewZodSchema),
  ReviewController.updateReview,
);

ReviewRoutes.delete(
  "/:id",
  checkAuth(Role.PATIENT),
  ReviewController.deleteReview,
);

export default ReviewRoutes;
