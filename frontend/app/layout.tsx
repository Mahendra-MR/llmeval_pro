import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load Geist fonts with CSS variable support
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// App-wide metadata
export const metadata: Metadata = {
  title: "LLM Eval Uploader",
  description:
    "Upload and visualize LLM evaluation results with prompt previews and model scores.",
  keywords: ["LLM Evaluation", "OpenAI", "Hugging Face", "Prompt", "Score", "AI Benchmark"],
  authors: [{ name: "Your Name", url: "https://your-portfolio.com" }],
  openGraph: {
    title: "LLM Evaluation Dashboard",
    description: "Interactive viewer for evaluating and comparing LLM results from .jsonl files.",
    url: "https://your-domain.com/upload",
    siteName: "LLM Eval Viewer",
    images: [
      {
        url: "https://your-domain.com/og-preview.png",
        width: 1200,
        height: 630,
        alt: "LLM Eval Dashboard Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LLM Eval Dashboard",
    description: "Upload .jsonl LLM results and visualize metrics and predictions.",
    creator: "@yourhandle",
    images: ["https://your-domain.com/og-preview.png"],
  },
};

// Root layout for the App Router
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[var(--background)] text-[var(--foreground)] transition-colors duration-300`}
      >
        {children}
      </body>
    </html>
  );
}
