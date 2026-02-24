import { auth } from "../../lib/auth";

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

  // const patient= await prisma.$transaction(async(tx)=>{

  // })

  return result;
};

export const AuthService = {
  registerPatient,
};
