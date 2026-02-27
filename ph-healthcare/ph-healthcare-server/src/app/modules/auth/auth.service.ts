import { auth } from "../../lib/auth";
import { UserStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import AppError from "../../helpers/errorHelpers/AppError";
import status from "http-status";
import { tokenUtils } from "../../utils/token";

interface IRegisterPatientPayload {
  name: string;
  email: string;
  password: string;
}

const registerPatient = async (payload: IRegisterPatientPayload) => {
  const { name, email, password } = payload;

  const data = await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  if (!data.user) {
    // throw new Error("Failed to register patient");
    throw new AppError(status.BAD_REQUEST, "Failed to register patient");
  }

  //TODO : Create Patient Profile In Transaction After Sign Up Of Patient In USer Model
  try {
    const patient = await prisma.$transaction(async (tx) => {
      const patientTx = await tx.patient.create({
        data: {
          userId: data.user.id,
          name: payload.name,
          email: payload.email,
        },
      });

      return patientTx;
    });

    const accessToken = tokenUtils.getAccessToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    });

    const refreshToken = tokenUtils.getRefreshToken({
      userId: data.user.id,
      role: data.user.role,
      name: data.user.name,
      email: data.user.email,
      status: data.user.status,
      isDeleted: data.user.isDeleted,
      emailVerified: data.user.emailVerified,
    });

    return {
      ...data,
      accessToken,
      refreshToken,
      patient,
    };
  } catch (error) {
    console.log("Transaction error : ", error);
    await prisma.user.delete({
      where: {
        id: data.user.id,
      },
    });
    throw error;
  }
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

  const accessToken = tokenUtils.getAccessToken({
    id: result.user.id,
    email: result.user.email,
    role: result.user.role,
    name: result.user.name,
    status: result.user.status,
    isDeleted: result.user.isDeleted,
    emailVerified: result.user.emailVerified,
  });

  const refreshToken = tokenUtils.getRefreshToken({
    id: result.user.id,
    email: result.user.email,
    role: result.user.role,
    name: result.user.name,
    status: result.user.status,
    isDeleted: result.user.isDeleted,
    emailVerified: result.user.emailVerified,
  });

  return {
    ...result,
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  registerPatient,
  loginUser,
};
