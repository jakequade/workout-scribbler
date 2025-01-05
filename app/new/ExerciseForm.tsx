import { Exercise } from "@/types/Workout";

type Props = {
  exercise?: Exercise;
  onChange: (exercise: Exercise) => void;
};

export const ExerciseForm = ({ exercise, onChange }: Props) => {
  return (
    <>
      <input defaultValue={exercise?.name} />
    </>
  );
};
