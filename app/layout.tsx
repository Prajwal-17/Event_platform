import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import SessionProviderWrapper from "@/lib/SessionProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Event Platform",
  description: "An event platform web app that allows users to create, view, and purchase tickets for upcoming events.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={cn("min-h-screen flex flex-col", poppins.className)}>
        <SessionProviderWrapper session={session}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html >
  );
}
