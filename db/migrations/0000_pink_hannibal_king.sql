CREATE TYPE "public"."equipment" AS ENUM('barbell', 'bodyweight', 'dumbell', 'machine');--> statement-breakpoint
CREATE TYPE "public"."exercise_category" AS ENUM('cardio', 'plyometrics', 'strength', 'stretching');--> statement-breakpoint
CREATE TABLE "dropsets" (
	"id" text PRIMARY KEY NOT NULL,
	"order_placed_in_set" smallint NOT NULL,
	"set_id" varchar NOT NULL,
	"actual_reps" integer NOT NULL,
	"actual_weight" integer NOT NULL,
	"comment" text,
	"target_reps_max" integer NOT NULL,
	"target_reps_min" integer NOT NULL,
	"target_rpe" integer NOT NULL,
	"target_weight" integer NOT NULL,
	CONSTRAINT "dropsets_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exercise_definitions" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"description" text,
	"primary_muscles" text NOT NULL,
	"secondary_muscles" text NOT NULL,
	"unilateral" boolean DEFAULT false NOT NULL,
	"equipment" "equipment" NOT NULL,
	"category" "exercise_category" NOT NULL,
	"is_seeded" boolean DEFAULT false NOT NULL,
	CONSTRAINT "exercise_definitions_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" text PRIMARY KEY NOT NULL,
	"order_placed_in_workout" smallint NOT NULL,
	"definition_id" varchar NOT NULL,
	CONSTRAINT "exercises_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "sets" (
	"id" text PRIMARY KEY NOT NULL,
	"exercise_id" varchar NOT NULL,
	"is_dropset" boolean DEFAULT false NOT NULL,
	"order_placed_in_exercise" smallint NOT NULL,
	"actual_reps" integer NOT NULL,
	"actual_weight" integer NOT NULL,
	"comment" text,
	"target_reps_max" integer NOT NULL,
	"target_reps_min" integer NOT NULL,
	"target_rpe" integer NOT NULL,
	"target_weight" integer NOT NULL,
	CONSTRAINT "sets_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE "workouts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"note" text,
	"rating_feel" smallint NOT NULL,
	"rating_food" smallint NOT NULL,
	"rating_sleep" smallint NOT NULL,
	"rating_stress" smallint NOT NULL,
	CONSTRAINT "workouts_id_unique" UNIQUE("id")
);
--> statement-breakpoint
ALTER TABLE "dropsets" ADD CONSTRAINT "dropsets_set_id_sets_id_fk" FOREIGN KEY ("set_id") REFERENCES "public"."sets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sets" ADD CONSTRAINT "sets_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE cascade ON UPDATE no action;