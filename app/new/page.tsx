import { Page } from "@/components/Page";

export default function New() {
  return (
    <Page>
      <div className="flex w-fill h-fill">
        <div className="flex flex-2 flex-col bg-red-400 h-fill"></div>
        <div className="flex flex-1 flex-col bg-blue h-fill"></div>
      </div>
    </Page>
  );
}
