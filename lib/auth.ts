import { getServerSession } from "next-auth/next";

export default async function Auth() {
  const session = await getServerSession();
  return (session)
}
