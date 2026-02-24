import { auth } from "../../lib/auth";
import { UserStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

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
    throw new Error("Failed to create user");
  }

  const patient = await prisma.$transaction(async (tx) => {
    const patientTx = await tx.patient.create({
      data: {
        name: payload.name,
        email: payload.email,
        userId: result.user.id,
      },
    });
    return patientTx;
  });

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
    throw new Error("User is blocked");
  }
  if (result.user.isDeleted) {
    throw new Error("User is deleted");
  }

  return result;
};

export const AuthService = {
  registerPatient,
  loginUser,
};
