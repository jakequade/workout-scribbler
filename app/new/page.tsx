"use client";

import { Button } from "@/components/Button";
import { Pen } from "lucide-react";
import { createRef, useCallback, useMemo } from "react";

export default function New() {
  const onAddNewExercise = useCallback(() => {}, []);

  const nameRef = createRef<HTMLInputElement>();

  return (
    <>
      {/* large screens */}
      <div className="w-fill h-fill flex-row hidden md:flex py-4 px-8">
        {/* left 2/3 - workout planner */}
        <div className="flex flex-auto w-64 flex-col h-screen">
          <div className="flex flex-row">
            <input
              className="placeholder-gray-300 focus:placeholder:transparent text-white bg-transparent font-bold pb-2 max-w-96 focus:outline-none"
              placeholder="New workout"
              ref={nameRef}
            />
            <button onClick={() => nameRef?.current?.focus()}>
              <Pen />
            </button>
          </div>
          <div>
            <Button>Add new exercise</Button>
          </div>
        </div>
        {/* right 1/3 - workout summary, timer, save buttons etc */}
        <div className="flex flex-1 flex-auto w-16  h-screen">
          <h1 className="text-4xl font-semibold">Workout summary</h1>
        </div>
      </div>
      {/* small screens */}
      <div className="w-fill md:hidden flex" />
    </>
  );
}
