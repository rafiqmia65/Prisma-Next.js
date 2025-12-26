import { Post } from "./generated/prisma/client";
import { prisma } from "./lib/prisma";

async function run() {
  // const createUser = await prisma.user.create({
  //   data: {
  //     name: "Rafiq Mia",
  //     email: "rafiq1@gmail.com",
  //   },
  // });
  // create Post
  // const createPost = await prisma.post.create({
  //   data: {
  //     title: "this is title",
  //     content: "This is big content",
  //     userId: 1,
  //   },
  // });
  // Create Profile
  // const createProfile = await prisma.profile.create({
  //   data: {
  //     bio: "this is bio",
  //     userId: 1,
  //   },
  // });
  // console.log("Created User: ", createProfile);

  // Read Data

  // const readData = await prisma.user.findMany({
  //   // include: {
  //   //   posts: true,
  //   //   profile: true,
  //   // },

  //   select: {
  //     id: true,
  //     name: true,
  //     email: true,
  //     posts: true,
  //     profile: true,
  //   },
  // });

  // console.dir(readData, { depth: Infinity });

  // Update profile data

  const updateProfile = await prisma.profile.update({
    where: {
      userId: 1,
    },
    data: {
      bio: "this is updated bio",
      dateOfBirth: "2025-12-26T10:59:04.422Z",
    },
    select: {
      id: true,
      bio: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  console.log("Updated Data: ", updateProfile);
}

run();
