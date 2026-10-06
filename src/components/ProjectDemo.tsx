"use client";
import { useState } from "react";
import { ProjectCarousel, type Simulation } from "./ProjectCarousel";
import type { Project } from "@/lib/content";
export function ProjectDemo() {
  const [count, setCount] = useState(6);
  const [simulation, setSimulation] = useState<Simulation>("natural");
  const projects: Project[] = Array.from({ length: count }, (_, i) => ({
    id: `demo-${i}`,
    name: `Exemplo visual ${String(i + 1).padStart(2, "0")}`,
    category: "DEMONSTRAÇÃO — SEM CLIENTE",
    description:
      "Composição para testar o carrossel. Não representa um trabalho realizado.",
    image: "/projects/demo.svg",
    alt: "Composição abstrata de demonstração",
    url: "https://example.com",
  }));
  return (
    <>
      <div
        style={{ display: "flex", flexWrap: "wrap", gap: 20, margin: "30px 0" }}
      >
        <label>
          Quantidade{" "}
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          >
            {[0, 1, 3, 6].map((n) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </label>
        <label>
          Estado da imagem{" "}
          <select
            value={simulation}
            onChange={(e) => setSimulation(e.target.value as Simulation)}
          >
            <option value="natural">Carregamento real</option>
            <option value="loading">Simular loading</option>
            <option value="success">Simular sucesso</option>
            <option value="error">Simular erro</option>
          </select>
        </label>
      </div>
      <ProjectCarousel
        key={count}
        projects={projects}
        placeholderCount={count}
        simulation={simulation}
        demo
      />
    </>
  );
}
