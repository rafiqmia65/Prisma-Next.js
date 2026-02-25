import { prisma } from "../../lib/prisma";
import { IUpdateDoctorPayload } from "./doctor.interface";

const getAllDoctors = async () => {
  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return doctors;
};

const getDoctorById = async (id: string) => {
  const doctor = await prisma.doctor.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      specialties: {
        include: {
          specialty: true,
        },
      },
    },
  });
  return doctor;
};

const updateDoctor = async (id: string, payload: IUpdateDoctorPayload) => {
  const { doctor, specialties } = payload;

  const result = await prisma.$transaction(async (tx) => {
    if (doctor) {
      await tx.doctor.update({
        where: { id },
        data: doctor,
      });
    }

    if (specialties) {
      await tx.doctorSpecialty.deleteMany({
        where: { doctorId: id },
      });

      await tx.doctorSpecialty.createMany({
        data: specialties.map((specialtyId) => ({
          doctorId: id,
          specialtyId,
        })),
      });
    }

    // Final fresh fetch
    const updatedDoctor = await tx.doctor.findUniqueOrThrow({
      where: { id },
      include: {
        specialties: {
          include: {
            specialty: true,
          },
        },
      },
    });

    return updatedDoctor;
  });

  return result;
};

const deleteDoctor = async (id: string) => {
  const result = await prisma.$transaction(async (tx) => {

    const hasDoctor = await tx.doctor.findUnique({
      where: { id },
    });

    if (!hasDoctor) {
      throw new Error("Doctor not found");
    }

    if (hasDoctor.isDeleted) {
      throw new Error("Doctor already deleted");
    }

    await tx.doctor.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });

    // fetch with relations
    const deletedDoctor = await tx.doctor.findUniqueOrThrow({
      where: { id },
      include: {
        user: true,
        specialties: {
          include: {
            specialty: true,
          },
        },
      },
    });

    return deletedDoctor;
  });

  return result;
};

export const DoctorService = {
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor
};
