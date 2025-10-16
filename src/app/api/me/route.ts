import { getUser } from "../../../lib/getUser";

export async function GET() {
  const user = await getUser();
  return Response.json(user);
}
