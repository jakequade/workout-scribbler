import { PropsWithChildren } from "react";

/**
 * Core, blank page styling. practically the same as NextJS, but that's pretty similar to the desired look and feel anyway.
 */
export const Page = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {children}
      </main>
    </div>
  );
};
