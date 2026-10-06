"use client";
import { useEffect, useRef, useState } from "react";
import s from "./Portfolio.module.css";
const links = [
  ["servicos", "Serviços"],
  ["projetos", "Projetos"],
  ["sobre", "Sobre"],
  ["contato", "Contato"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    links.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return (
    <header className={s.header}>
      <a className={s.brand} href="#inicio" aria-label="Pedro Sodré, início">
        PEDRO SODRÉ<span>DESENVOLVIMENTO WEB</span>
      </a>
      <button
        ref={button}
        className={s.menuToggle}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? "Fechar −" : "Menu +"}
      </button>
      <nav
        id="navigation"
        className={`${s.nav} ${open ? s.open : ""}`}
        aria-label="Navegação principal"
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            button.current?.focus();
          }
        }}
      >
        {links.map(([id, label]) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <a
          href="#contato"
          className={s.headerCta}
          onClick={() => setOpen(false)}
        >
          Solicitar orçamento <span aria-hidden="true">↗</span>
        </a>
      </nav>
    </header>
  );
}
