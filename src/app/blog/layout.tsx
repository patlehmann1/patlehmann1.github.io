import { Navigation } from "@/components/layout/navigation";
import { ReadingProgressBar } from "@/components/blog/reading-progress-bar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ReadingProgressBar />
      <Navigation />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}