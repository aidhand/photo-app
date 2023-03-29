import type { NextApiRequest, NextApiResponse, NextConfig } from "next";

import NextAuth from "next-auth";

import EmailProvider from "next-auth/providers/email";
import { EmailUserConfig } from "next-auth/providers/email";
import { createTransport } from "nodemailer";
import postmarkTransport from "nodemailer-postmark-transport";

import CredentialsProvider from "next-auth/providers/credentials";
import { CredentialsConfig } from "next-auth/providers/credentials";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { env } from "process";

const CredentialsOptions: CredentialsConfig = {
  id: "",
  type: "credentials",
  name: "password",
  credentials: {
    email: { label: "Email", type: "text", placeholder: "jim@mow.in" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials, req) {
    throw new Error("Function not implemented.");
  },
};

const EmailOptions: EmailUserConfig = {
  id: "",
  type: "email",
  name: "magic link",

  // Server can be an SMTP connection string or a nodemailer config object
  //server: postmarkTransport({
  //  auth: {
  //    apiKey: env.POSTMARK_API_TOKEN ?? "1441bdf8-203a-4611-83fc-4fbc4da65368",
  //  },
  //}),

  server: {
    host: "smtp.postmarkapp.com",
    port: 2525,
    auth: {
      user: env.POSTMARK_API_TOKEN,
      pass: env.POSTMARK_API_TOKEN,
    },
  },

  from: "Photo App <hey@aidhan.photo>",
  maxAge: 60 * 60 * 24,
};

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    theme: {
      logo: "",
    },
    //adapter: PrismaAdapter(prisma),
    providers: [
      EmailProvider(EmailOptions),
      CredentialsProvider(CredentialsOptions),
    ],
    session: { strategy: "jwt" },
  });
}
