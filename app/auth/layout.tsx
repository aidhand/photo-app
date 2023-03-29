import { ReactElement } from "react";

export default function AuthLayout(props: { children: ReactElement }) {
  return (
    <div className="container mx-auto flex">
      <main className="m-6 p-6 bg-stone-50 border rounded-lg border-amber-400 text-stone-700">
        {props.children}
      </main>
      <aside className="m-6 p-6">
        tuna is a fish
      </aside>
    </div>
  );
}
