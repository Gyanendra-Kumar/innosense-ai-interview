import { UserType } from "../../types";
import { getSession } from "./getSession";

export const getUser = async (): Promise<UserType | null> => {
  const session = await getSession();
  return session?.user ?? null;
};
