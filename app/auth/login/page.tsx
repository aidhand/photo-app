import Link from "next/link";

import { Input, Button } from "@/components/form";

export const metadata = {
  title: "Login",
};

export default function Register() {
  return (
    <>
      <h3 className="mb-8 font-serif font-bold text-4xl text-center">
        {metadata.title}
      </h3>

      <form method="POST">
        <Input
          name="email"
          label="Email address"
          type="email"
          placeholder="jim@smowin.gg"
        />

        <Input
          name="password"
          label="Password"
          type="password"
          placeholder="Please be strong..."
        />

        <div className="w-full flex items-center justify-between">
          <Link href="/auth/register">Need to register?</Link>
          <Button type="submit">Login</Button>
        </div>
      </form>
    </>
  );
}
