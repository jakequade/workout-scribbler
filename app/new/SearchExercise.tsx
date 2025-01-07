import { Exercise } from "@/types/Workout";

import { createRef, useState } from "react";

type Props = {
  exercise?: Exercise;
  onChange: (exercise: Exercise) => void;
};

export const SearchExercise = ({ onChange }: Props) => {
  const [suggestions, setSuggestions] = useState<Exercise[]>([]);

  const inputRef = createRef<HTMLInputElement>();

  const onNameChange = async (text: string) => {
    if (!text) {
      setSuggestions([]);
      return;
    }
    if (text.length < 3) return;

    const res = await fetch("/api/exercises", {
      method: "POST",
      body: JSON.stringify({ name: text }),
    });

    const suggestions: Exercise[] = await res.json();

    if (!suggestions) return;

    setSuggestions(suggestions);
  };

  const addExercise = (suggestion: Exercise) => {
    onChange(suggestion);

    // clear input
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setSuggestions([]);
  };

  return (
    <div className="pt-4">
      <div>
        <div className="relative w-full">
          <input
            className="bg-transparent border-b-2 border-white"
            onChange={(e) => {
              onNameChange(e.target.value);
            }}
            ref={inputRef}
          />
          <div className="absolute top-10 left-3 w-full bg-black w-full">
            {!!suggestions.length && (
              <div className="bg-red rounded-lg text-white">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => addExercise(suggestion)}
                  >
                    {suggestion.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
