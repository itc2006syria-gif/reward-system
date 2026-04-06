import "./globals.css";

export const metadata = {
  title: "Reward System",
  description: "Dashboard and rewards platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
