import { Button } from "@/components/Button";
import { Page } from "@/components/Page";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Page>
      <h1 className="text-6xl">
        <b>workout</b>scribbler
      </h1>
      <div className="flex flex-col self-center mx-4 space-between">
        <Button href="/new">new workout</Button>
        <Button href="/login" variant="filled">
          login
        </Button>
      </div>
    </Page>
  );
}
