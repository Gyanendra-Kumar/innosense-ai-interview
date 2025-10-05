import { getUser } from "./getUser";
import prisma from "./prisma";

export const getSessionUser = async () => {
  // fetch the session user
  const user = await getUser();
  if (!user) {
    return null;
  }

  const id = user.id;
  
  const sessionUser = await prisma.user.findUnique({
    where: { id }, // replace with your session logic
    select: { id: true, name: true, slug: true },
  });
  return sessionUser;
};
