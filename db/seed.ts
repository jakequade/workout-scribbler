import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { exerciseDefinitions } from "./schema";
import * as dotenv from "dotenv";
import fs from "fs";
import { and, eq } from "drizzle-orm";
dotenv.config({ path: "./.env" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env");

const main = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);

  const files = fs.readdirSync("./db/seed_exercises/");

  console.log("Seed start");

  for (const file of files) {
    const fileData = fs.readFileSync("./db/seed_exercises/" + file, "utf8");
    const exercise = JSON.parse(fileData);

    let equipment: "barbell" | "bodyweight" | "dumbbell" | "machine" | "other";

    if (exercise.equipment === "body only") {
      equipment = "bodyweight";
    }

    if (
      ["barbell", "bodyweight", "dumbbell", "machine", "other"].includes(
        exercise.equipment
      )
    ) {
      equipment = exercise.equipment;
    } else {
      equipment = "other";
    }

    let category:
      | "cardio"
      | "plyometrics"
      | "strength"
      | "stretching"
      | "other";

    if (
      ["cardio", "plyometrics", "strength", "stretching"].includes(
        exercise.category
      )
    ) {
      category = exercise.category;
    } else {
      category = "other";
    }

    const values = {
      name: exercise.name,
      primary_muscles: exercise?.primaryMuscles?.join(",") || "",
      instructions: exercise.instructions,
      secondary_muscles: exercise?.secondaryMuscles?.join(",") || "",
      equipment,
      category,
      is_seeded: true,
    };

    const existing = await db
      .select()
      .from(exerciseDefinitions)
      .where(
        and(
          eq(exerciseDefinitions.name, exercise.name),
          eq(exerciseDefinitions.is_seeded, true)
        )
      )
      .execute();

    if (existing.length > 0) {
      console.log(`Skipping ${exercise.name} as already exists`);
      continue;
    } else {
      console.log(`Seeding ${exercise.name}`);
    }

    await db.insert(exerciseDefinitions).values([values]);
  }

  console.log("Seed done");
};

main();
