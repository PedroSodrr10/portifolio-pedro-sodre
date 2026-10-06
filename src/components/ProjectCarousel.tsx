"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/content";
import { Arrow } from "./Icon";
import s from "./Projects.module.css";
export type Simulation = "natural" | "loading" | "success" | "error";
function ProjectImage({
  project,
  simulation,
}: {
  project: Project;
  simulation: Simulation;
}) {
  const [state, setState] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const display = simulation === "natural" ? state : simulation;
  return (
    <div className={s.image} aria-busy={display === "loading"}>
      {display === "loading" && (
        <span className={s.loading}>Carregando prévia…</span>
      )}
      {display === "error" ? (
        <span className={s.fallback}>Prévia indisponível</span>
      ) : (
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 30vw"
          className={display === "loading" ? s.hidden : undefined}
          onLoad={() => setState("success")}
          onError={() => setState("error")}
        />
      )}
    </div>
  );
}
export function ProjectCarousel({
  projects,
  placeholderCount = 3,
  simulation = "natural",
  demo = false,
}: {
  projects: Project[];
  placeholderCount?: number;
  simulation?: Simulation;
  demo?: boolean;
}) {
  const rail = useRef<HTMLDivElement>(null);
  const [limits, setLimits] = useState({ start: true, end: true, index: 1 });
  const count = projects.length || placeholderCount;
  useEffect(() => {
    const el = rail.current;
    if (!el) return;
    const update = () => {
      const step =
        (el.firstElementChild?.getBoundingClientRect().width ?? 1) + 20;
      setLimits({
        start: el.scrollLeft < 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
        index: Math.round(el.scrollLeft / step) + 1,
      });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.classList.add(s.revealed);
            io.unobserve(e.target);
          }
      },
      { threshold: 0.12 },
    );
    for (const card of el.children) io.observe(card);
    return () => {
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [count]);
  function move(dir: number) {
    const el = rail.current;
    if (!el) return;
    const step =
      (el.firstElementChild?.getBoundingClientRect().width ?? 0) + 20;
    el.scrollBy({
      left: step * dir,
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <div
      className={s.carousel}
      role="region"
      aria-label={demo ? "Demonstração de projetos" : "Projetos selecionados"}
      aria-roledescription="carrossel"
    >
      <div
        className={s.rail}
        ref={rail}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            move(e.key === "ArrowRight" ? 1 : -1);
          }
        }}
      >
        {projects.length
          ? projects.map((project, i) => (
              <article
                key={project.id}
                className={s.card}
                aria-label={`${i + 1} de ${count}`}
              >
                <div className={s.cardTop}>
                  <span>
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {demo ? "DEMONSTRAÇÃO" : "PROJETO"}
                  </span>
                  <span aria-hidden="true">↗</span>
                </div>
                <ProjectImage
                  key={`${project.id}-${simulation}`}
                  project={project}
                  simulation={simulation}
                />
                <div className={s.cardBody}>
                  <small>{project.category}</small>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  {!demo && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visitar ${project.name}`}
                      onFocus={(e) =>
                        e.currentTarget
                          .closest("article")
                          ?.scrollIntoView({
                            block: "nearest",
                            inline: "nearest",
                          })
                      }
                    >
                      Visitar projeto <Arrow diagonal />
                    </a>
                  )}
                </div>
              </article>
            ))
          : Array.from({ length: placeholderCount }, (_, i) => (
              <article className={`${s.card} ${s.placeholder}`} key={i}>
                <div className={s.cardTop}>
                  <span>0{i + 1} / EM BREVE</span>
                  <span aria-hidden="true">＋</span>
                </div>
                <div className={s.placeholderArt} aria-hidden="true">
                  <div className={s.wire}>
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className={s.largeNumber}>0{i + 1}</span>
                  <small>PRÓXIMO PROJETO</small>
                </div>
                <div className={s.cardBody}>
                  <small>PORTFÓLIO EM CONSTRUÇÃO</small>
                  <h3>Projeto em preparação</h3>
                  <p>
                    Um novo trabalho vai ocupar este espaço. Volte em breve para
                    conhecer.
                  </p>
                  <div className={s.preparing}>
                    <span aria-hidden="true">▰</span> Em preparação
                  </div>
                </div>
              </article>
            ))}
      </div>
      {!(limits.start && limits.end) && (
        <div className={s.controls}>
          <span aria-live="polite">
            {String(limits.index).padStart(2, "0")}{" "}
            <span>/ {String(count).padStart(2, "0")}</span>
          </span>
          <div>
            <button
              aria-label="Projeto anterior"
              disabled={limits.start}
              onClick={() => move(-1)}
            >
              ←
            </button>
            <button
              aria-label="Próximo projeto"
              disabled={limits.end}
              onClick={() => move(1)}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
