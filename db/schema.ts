import {
  pgTable,
  text,
  varchar,
  boolean,
  integer,
  smallint,
  pgEnum,
  index,
  check,
} from "drizzle-orm/pg-core";

import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const workout = pgTable(
  "workouts",
  {
    id: text(`id`)
      .primaryKey()
      .$defaultFn(() => createId())
      .unique(),
    name: varchar("name").notNull(),
    note: text("note"),
    rating_feel: smallint("rating_feel").notNull(),
    rating_food: smallint("rating_food").notNull(),
    rating_sleep: smallint("rating_sleep").notNull(),
    rating_stress: smallint("rating_stress").notNull(),
  },
  () => [
    {
      withCheck: check(
        "rating_feel",
        sql`rating_feel >= 0 AND rating_feel <= 10`
      ),
    },
    {
      withCheck: check(
        "rating_food",
        sql`rating_food >= 0 AND rating_food <= 10`
      ),
    },
    {
      withCheck: check(
        "rating_sleep",
        sql`rating_sleep >= 0 AND rating_sleep <= 10`
      ),
    },
    {
      withCheck: check(
        "rating_stress",
        sql`rating_stress >= 0 AND rating_stress <= 10`
      ),
    },
  ]
);

export const exercises = pgTable("exercises", {
  id: text(`id`)
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  order_placed_in_workout: smallint("order_placed_in_workout").notNull(),
  definition_id: varchar("definition_id").notNull(),
});

const commonSetProps = {
  actual_reps: integer("actual_reps").notNull(),
  actual_weight: integer("actual_weight").notNull(),
  comment: text("comment"),
  target_reps_max: integer("target_reps_max").notNull(),
  target_reps_min: integer("target_reps_min").notNull(),
  target_rpe: integer("target_rpe").notNull(),
  target_weight: integer("target_weight").notNull(),
};

export const sets = pgTable("sets", {
  id: text(`id`)
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  exercise_id: varchar("exercise_id")
    .notNull()
    .references(() => exercises.id, {
      onDelete: "cascade",
    }),
  is_dropset: boolean("is_dropset").notNull().default(false),
  order_placed_in_exercise: smallint("order_placed_in_exercise").notNull(),
  ...commonSetProps,
});

export const dropsets = pgTable("dropsets", {
  id: text(`id`)
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  order_placed_in_set: smallint("order_placed_in_set").notNull(),
  set_id: varchar("set_id")
    .notNull()
    .references(() => sets.id, { onDelete: "cascade" }),
  ...commonSetProps,
});

export const equipmentEnum = pgEnum("equipment", [
  "barbell",
  "dumbell",
  "machine",
  "bodyweight",
]);

export const exerciseCategoryEnum = pgEnum("exercise_category", [
  "strength",
  "cardio",
  "plyometrics",
]);

export const exerciseDefinitions = pgTable("exercise_definitions", {
  id: text(`id`)
    .primaryKey()
    .$defaultFn(() => createId())
    .unique(),
  name: varchar("name").notNull(),
  instructions: text("description"),
  primary_muscles: text("primary_muscles").notNull(),
  secondary_muscles: text("secondary_muscles").notNull(),
  unilateral: boolean("unilateral").notNull().default(false),
  equipment: equipmentEnum("equipment").notNull(),
  category: exerciseCategoryEnum("category").notNull(),
  is_seeded: boolean("is_seeded").notNull().default(false),
});
