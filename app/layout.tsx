import "@/styles/globals.css";
import { ReactPortal } from "react";

import { inter, playfair } from "@/lib/fonts";
import Chakra from "@/components/wrappers/chakra";

export const metadata = {
  title: {
    default: "Photo App",
    template: "%s | Photo App",
  },
  applicationName: "Photo App",
  description: "Manage, share and sell your photo portfolio",
  keywords: [],
  authors: {},
  creator: "",
  publisher: "",
  openGraph: {
    title: "",
    description: "",
    url: "https://aidhan.photo/",
    siteName: "Photo App",
    locale: "en-AU",
  },
};

export default async function RootLayout(props: ReactPortal) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans subpixel-antialiased ">{props.children}</body>
    </html>
  );
}
