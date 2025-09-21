import { Navigation } from "@/components/layout/navigation";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}