import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { AuthProvider } from "../store/auth-context";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["vietnamese", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AutoFixAI - Hệ Thống Garage Sửa Chữa & Bảo Dưỡng Thông Minh",
  description: "Dịch vụ sửa chữa xe máy, ô tô chuyên nghiệp, thay nhớt, vệ sinh kim phun, bảo dưỡng toàn diện với AI chẩn đoán bệnh tức thì.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} h-full antialiased font-sans scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

