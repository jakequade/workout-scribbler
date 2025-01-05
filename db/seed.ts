import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { exerciseDefinitions } from "./schema";
import * as dotenv from "dotenv";
import fs from "fs";
dotenv.config({ path: "./.env" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env");

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle(client);
  const data: (typeof exerciseDefinitions.$inferInsert)[] = [];

  const files = fs.readdirSync("./db/seed_exercises/");

  console.log("Seed start");

  for (const file of files) {
    const fileData = fs.readFileSync("./db/seed_exercises/" + file, "utf8");
    const exercise = JSON.parse(fileData);

    const values = {
      name: exercise.name,
      primary_muscles: exercise.primary_muscles,
      instructions: exercise.instructions,
      secondary_muscles: exercise.secondary_muscles,
      equipment: exercise.equipment,
      category: exercise.category,
      is_seeded: true,
    };

    await db.insert(exerciseDefinitions).values(values);
  }

  console.log("Seed done");
};

main();
