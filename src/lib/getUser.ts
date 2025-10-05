"use server";

import { UserType } from "../types";
import { generateSlug } from "./generateSlug";
import { getSession } from "./getSession";
import prisma from "./prisma";

export const getUser = async (): Promise<UserType | null> => {
  const session = await getSession();
  if (!session?.user) return null;

  const userId = session.user.id;

  // fetch user first
  let user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) return null;

  // Only generate slug if it doesn't exist
  if (!user.slug) {
    const baseSlug = generateSlug(user.email);
    let slug = baseSlug;
    let count = 0;

    // Ensure uniqueness
    while (await prisma.user.findFirst({ where: { slug } })) {
      count++;
      slug = `${baseSlug}-${count}`;
    }

    user = await prisma.user.update({
      where: { id: userId },
      data: { slug },
    });
  }

  // Map user to your UserType
  const mappedUser: UserType = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    slug: user.slug,
    image: user.image,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return mappedUser;
};
