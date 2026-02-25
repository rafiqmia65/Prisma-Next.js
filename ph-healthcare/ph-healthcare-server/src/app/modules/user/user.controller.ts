import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { UserService } from "./user.service";
import status from "http-status";
import { Request, Response } from "express";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await UserService.createDoctor(payload);
    sendResponse(res, {
        httpStatusCode: status.OK,
        success: true,
        message: "Doctor created successfully",
        data: result,
    });
});

export const UserController = {
    createDoctor,
};