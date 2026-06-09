import { ApplicationForm } from "@/components/public/ApplicationForm";
import { CaseStudies } from "@/components/public/CaseStudies";
import { Footer } from "@/components/public/Footer";
import { Hero } from "@/components/public/Hero";
import { Navbar } from "@/components/public/Navbar";
import { getCases, getContent } from "@/lib/google-sheets";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [content, cases] = await Promise.all([getContent(), getCases()]);

  return (
    <>
      <Navbar />
      <main>
        <Hero content={content} />
        <CaseStudies cases={cases} content={content} />
        <ApplicationForm content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
