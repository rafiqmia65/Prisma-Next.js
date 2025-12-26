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
  const createProfile = await prisma.profile.create({
    data: {
      bio: "this is bio",
      userId: 1,
    },
  });

  console.log("Created User: ", createProfile);
}

run();
