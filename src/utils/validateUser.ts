import prisma from "../lib/prisma";

export async function validateUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}
