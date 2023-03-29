import NextAuth from "next-auth";
import prisma from "@/lib/prisma";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

import { hash } from "bcrypt";
import { env } from "process";

const supaUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supaAnonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

//async function register(req: NextApiRequest, res: NextApiResponse) {
//  const newUser: { firstName: string; email: string; password: string } = {
//    firstName: req.body.firstName,
//    email: req.body.email,
//    password: await hash(req.body.password, 10),
//  };
//
//  const existingUser = await prisma.user.findUnique({
//    where: { email: req.body.email },
//  });
//
//  if (existingUser) {
//    res.status(409).send("User already exists");
//  } else {
//    const user = await prisma.user.create({ data: newUser });
//    res.status(200).json(user);
//  }
//
//  res.status(400);
//}

async function register(
  req: NextApiRequest,
  res: NextApiResponse,
  supa: SupabaseClient
) {
  const { data, error } = await supa.auth.signUp({
    email: req.body.email,
    password: req.body.password,
  });
}

async function login(
  req: NextApiRequest,
  res: NextApiResponse,
  supa: SupabaseClient
) {
  const { data, error } = await supabase.auth.getSession();
  
  
  const { data, error } = await supa.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });
  
  
}

async function signout() {}

async function resetPw() {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!supaUrl || !supaAnonKey) {
    res.status(500);
  }

  let supa = createClient(supaUrl, supaAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  return login(req, res, supa);
}
