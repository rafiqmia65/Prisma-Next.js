import { auth } from "../../lib/auth";
import { UserStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import AppError from "../../helpers/errorHelpers/AppError";
import status from "http-status";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

const registerPatient = async (
  payload: IRegisterPatientPayload,
  headers: Headers,
) => {
  const { name, email, password } = payload;

  const result = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
    headers,
  });

  if (!result.user) {
    throw new AppError(status.BAD_REQUEST, "Failed to register patient");
  }

  let patient;
  try {
    patient = await prisma.$transaction(async (tx) => {
      const patientTx = await tx.patient.create({
        data: {
          name: payload.name,
          email: payload.email,
          userId: result.user.id,
        },
      });
      return patientTx;
    });
  } catch (error) {
    console.log("Transction error", error);
    await prisma.user.delete({
      where: {
        id: result.user.id,
      },
    });

    throw error;
  }

  return {
    ...result,
    patient,
  };
};

interface ILoginUserPayload {
  email: string;
  password: string;
}

const loginUser = async (payload: ILoginUserPayload) => {
  const { email, password } = payload;
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (result.user.status === UserStatus.BLOCKED) {
    throw new AppError(status.BAD_REQUEST, "User is blocked");
  }
  if (result.user.isDeleted) {
    throw new AppError(status.BAD_REQUEST, "User is deleted");
  }

  return result;
};

export const AuthService = {
  registerPatient,
  loginUser,
};
