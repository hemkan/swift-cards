import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Swift-cards",
  description: "Fastest way to make flashcards",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    //   publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    //   signInFallbackRedirectUrl="/dashboard"
    //   signUpFallbackRedirectUrl="/onboarding"
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
