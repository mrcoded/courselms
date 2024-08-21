import "../../globals.css";

export const metadata = {
  title: "Threads",
  description: "A Next.JS 14 Meta Threads Application",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex justify-center items-center ">{children}</div>
  );
}
