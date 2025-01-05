import { db } from "@/db/db";
import { exerciseDefinitions } from "@/db/schema";
import { ilike } from "drizzle-orm";

export async function POST(req: Request) {
  const json = await req.json();

  const name = json.name;

  if (!name) {
    return new Response("Name is required", { status: 400 });
  }

  const suggestions = await db
    .select()
    .from(exerciseDefinitions)
    .where(ilike(exerciseDefinitions.name, `%${name}%`));

  if (!suggestions) return new Response("[]", { status: 404 });

  return new Response(JSON.stringify(suggestions), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
