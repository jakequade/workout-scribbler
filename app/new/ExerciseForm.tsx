import { Exercise } from "@/types/Workout";

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import { CommandGroup } from "cmdk";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  exercise?: Exercise;
  onChange: (exercise: Exercise) => void;
};

export const ExerciseForm = ({ exercise, onChange }: Props) => {
  const [name, setName] = useState(exercise?.name || "");
  const [nameOpen, setNameOpen] = useState<boolean>(false);

  const [suggestions, setSuggestions] = useState<Exercise[]>([]);

  const onNameChange = async (text: string) => {
    console.log(text);
    if (text.length < 3) return;

    const res = await fetch("/api/exercises", {
      method: "POST",
      body: JSON.stringify({ name: text }),
    });

    const suggestions: Exercise[] = await res.json();

    if (!suggestions) return;

    setSuggestions(suggestions);
  };

  return (
    <div className="pt-4">
      <Popover open={nameOpen} onOpenChange={setNameOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={nameOpen}
            className="w-[200px] justify-between"
          >
            {name
              ? suggestions.find((exercise) => exercise.name === name)?.name
              : "Select exercise..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput
              defaultValue={name}
              placeholder="Add an exercise"
              onInput={(e) => onNameChange(e.currentTarget.value)}
            />
            <CommandList>
              <CommandGroup>
                {suggestions.map((s) => (
                  <CommandItem
                    onSelect={() => {
                      setName(s.name);
                      setNameOpen(false);
                    }}
                    key={s.name}
                    value={s.name}
                  >
                    {s.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
