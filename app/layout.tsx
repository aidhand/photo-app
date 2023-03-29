import "@/styles/globals.css";

import { inter, playfair } from "@/lib/fonts";
import Header from '@/components/header';

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

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans subpixel-antialiased min-h-screen">
        <Header />
        {props.children}
      </body>
    </html>
  );
}
