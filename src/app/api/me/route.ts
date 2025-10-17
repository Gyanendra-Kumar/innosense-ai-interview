import { getUser } from "../../../lib/getUser";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    return Response.json(user);
  } catch (error) {
    console.error("Error while fetching user: ", error);
    return Response.json({ error: "Failed to fetch user: " }, { status: 500 });
  }
}
