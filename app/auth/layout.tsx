import { ReactElement } from "react";

import { Button } from "@/components/form";

export default function AuthLayout(props: ReactElement) {
  return (
    <div className="container min-h-screen mx-auto flex items-center justify-center">
      <main className="bg-stone-50 p-10 border rounded-lg border-amber-400 text-lg text-stone-700 leading-loose">
        {props.children}
      </main>
    </div>
  );
}
