"use client";

import Image from "next/image";
import { BarChart3, ChevronLeft, ChevronRight, Leaf, Users } from "lucide-react";
import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import type { CaseStudy, SiteContent } from "@/types";
import { Badge } from "@/components/ui/Badge";

const metricIcons = {
  eco: Leaf,
  groups: Users,
  trending_up: BarChart3
};

function getMetricIcon(name?: string) {
  return metricIcons[name as keyof typeof metricIcons] ?? BarChart3;
}

export function CaseStudiesFilmstrip({ cases, content }: { cases: CaseStudy[]; content: SiteContent }) {
  const filmstripRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const scrollByCard = (direction: 1 | -1) => {
    const filmstrip = filmstripRef.current;
    const firstCard = filmstrip?.querySelector<HTMLElement>(".filmstrip-card");
    if (!filmstrip || !firstCard) return;

    const styles = window.getComputedStyle(filmstrip);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "32");
    filmstrip.scrollBy({ left: direction * (firstCard.offsetWidth + gap), behavior: "smooth" });
  };

  const handleMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    const filmstrip = filmstripRef.current;
    if (!filmstrip) return;

    dragState.current = {
      active: true,
      startX: event.pageX - filmstrip.offsetLeft,
      scrollLeft: filmstrip.scrollLeft
    };
    setIsDragging(true);
  };

  const stopDragging = () => {
    dragState.current.active = false;
    setIsDragging(false);
  };

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const filmstrip = filmstripRef.current;
    if (!filmstrip || !dragState.current.active) return;

    event.preventDefault();
    const x = event.pageX - filmstrip.offsetLeft;
    filmstrip.scrollLeft = dragState.current.scrollLeft - (x - dragState.current.startX);
  };

  return (
    <section className="section cases cases--filmstrip" id="cases">
      <div className="container">
        <div className="cases__header">
          <div className="section-heading section-heading--left">
            <span className="eyebrow">Success Stories</span>
            <h2 className="section-title">{content.casesTitle}</h2>
            <p className="muted">{content.casesSubtitle}</p>
          </div>
          <div className="filmstrip-nav" aria-label="Success stories navigation">
            <button type="button" aria-label="Previous success story" onClick={() => scrollByCard(-1)}>
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
            <button type="button" aria-label="Next success story" onClick={() => scrollByCard(1)}>
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="filmstrip-wrapper">
        <div
          className={`filmstrip${isDragging ? " is-dragging" : ""}`}
          ref={filmstripRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={stopDragging}
          onMouseUp={stopDragging}
          onMouseMove={handleMouseMove}
        >
          {cases.map((item, index) => {
            const MetricIcon = getMetricIcon(item.metricIcon);
            const tone = item.badgeTone === "secondary" ? "secondary" : "primary";

            return (
              <article className="filmstrip-card" key={item.id}>
                <div className={`filmstrip-card__inner ${index % 2 === 0 ? "is-tilted-left" : "is-tilted-right"}`}>
                  <div className="filmstrip-card__image">
                    <Image src={item.imageUrl} alt={item.title} width={720} height={520} />
                    <Badge tone={tone}>{item.category}</Badge>
                  </div>
                  <div className="filmstrip-card__body">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <div className="card-details">
                      <div>
                        {(item.metricValue || item.metricLabel) && (
                          <div className="card-metric">
                            <span className={`card-metric__icon card-metric__icon--${tone}`}>
                              <MetricIcon size={22} aria-hidden="true" />
                            </span>
                            <span>
                              {item.metricValue && <strong>{item.metricValue}</strong>}
                              {item.metricLabel && <small>{item.metricLabel}</small>}
                            </span>
                          </div>
                        )}
                        {item.testimonial && <blockquote>{item.testimonial}</blockquote>}
                      </div>
                    </div>
                    <a href="#apply" className="case-card__link">
                      立即諮詢
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
          <div className="filmstrip-hint" aria-hidden="true">
            <div className="filmstrip-hint__bar">
              <div className="filmstrip-hint__pulse" />
            </div>
            <span>Scroll for more</span>
          </div>
        </div>
      </div>
    </section>
  );
}
