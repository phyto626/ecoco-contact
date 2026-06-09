import type { CaseStudy, SiteContent } from "@/types";
import { CaseStudiesFilmstrip } from "@/components/public/CaseStudiesFilmstrip";
import "./public.css";

export function CaseStudies({ cases, content }: { cases: CaseStudy[]; content: SiteContent }) {
  const visibleCases = cases.filter((item) => item.isPublic).sort((a, b) => a.sortOrder - b.sortOrder);

  return <CaseStudiesFilmstrip cases={visibleCases} content={content} />;
}
