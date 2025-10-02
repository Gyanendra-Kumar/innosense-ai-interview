import { UserType } from "../../types.ts";
import { getSession } from "./getSession";

export const getUser = async (): Promise<UserType | null> => {
  const session = await getSession();
  return session?.user ?? null;
};
