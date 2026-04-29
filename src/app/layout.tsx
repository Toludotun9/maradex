import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppProvider } from "@/context/AppContext";

export const metadata: Metadata = {
  title: "Sallie Mae | Undergraduate Student Loan Application",
  description: "Start your student loan application with Sallie Mae. Choose your role and begin the process.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Header />
          <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
