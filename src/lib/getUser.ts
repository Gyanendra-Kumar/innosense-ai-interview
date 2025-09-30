import { UserType } from "../../types.ts";
import { getSession } from "./getSession";

let cachedUser: UserType | null = null;

export const getUser = async (): Promise<UserType | null> => {
  if (cachedUser) return cachedUser;

  const session = await getSession();
  cachedUser = (session?.user as UserType) ?? null;
  return cachedUser;
};
