type ID = string;

export type Workout = {
  name: string;
  note: string;
  rating_feel: number;
  rating_food: number;
  rating_sleep: number;
  rating_stress: number;

  exercises: Exercise[];
};

export type Exercise = {
  id: ID;
  name: string;
  order_placed_in_workout: number;
  sets: ExerciseSet;

  definition: ExerciseDefinition;
};

type ExerciseSet = CommonSetProps & {
  order_placed_in_exercise: number;
  exercise_id: ID;
  drop_sets: DropSet | undefined;
};

type DropSet = CommonSetProps & {
  order_placed_in_set: number;
};

type CommonSetProps = {
  actual_reps: number;
  actual_weight: number;
  comment: string;
  target_reps_max: number;
  target_reps_min: number;
  target_rpe: number;
  target_weight: number;
};

type ExerciseDefinition = {
  id: ID;
  primary_muscles: Muscle[];
  secondary_muscles: Muscle[];
  unilateral: boolean;

  equipment: Equipment;
};

enum Equipment {
  Barbell = "barbell",
  Dumbell = "dumbell",
  Machine = "machine",
  Cardio = "cardio",
}

type Muscle = {
  name: string;
  description: string;
  // todo: some unique identifier for displaying it on body diagram
  // todo: muscle_group? for what purpose?
};
