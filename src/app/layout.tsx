import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./components/Provider";
import ReduxProvider from "@/redux/ReduxProvider";
import InitUser from "@/InitUser";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RYDEX - Smart Vehicle Booking Platform",
  description: "Smart Vehicle Booking Platform",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <Provider>
          <ReduxProvider>
            <InitUser />
            {children}
            <Toaster position="top-right"
              toastOptions={{
                classNames: {
                  // Tailor your custom red or green background variations
                  error: 'bg-red-500 text-white border-red-600',
                  success: 'bg-green-500 text-white border-green-600',
                }
              }}
            />
          </ReduxProvider>

        </Provider>

      </body>
    </html>
  );
}
