import { Header } from "@/components/Header";
import { Geometry } from "@/components/Geometry";
import { GlitchText } from "@/components/GlitchText";
import { Arrow } from "@/components/Icon";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { ContactForm } from "@/components/ContactForm";
import {
  content,
  services,
  about,
  projects,
  projectsSection,
  contactSection,
  whatsappHref,
  emailHref,
} from "@/lib/content";
import s from "@/components/Portfolio.module.css";
function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className={s.sectionLabel}>
      <span>{number}</span>
      <span>{children}</span>
      <i aria-hidden="true" />
    </div>
  );
}
export default function Home() {
  return (
    <>
      <div className={s.shell}>
        <Header />
        <main id="conteudo">
          <section id="inicio" className={s.hero}>
            <div className={s.heroCopy}>
              <div className={s.welcome}>
                <span aria-hidden="true">{"//"}</span>{" "}
                <GlitchText>{content.experience.welcome.text}</GlitchText>
              </div>
              <p className={s.eyebrow}>{content.hero.eyebrow}</p>
              <h1>
                {content.hero.titleLines[0]}
                <br />
                {content.hero.titleLines[1]} <span>{content.hero.titleAccent}</span>
              </h1>
              <p className={s.heroDescription}>{content.hero.description}</p>
              <div className={s.heroActions}>
                <a className={s.primary} href={whatsappHref ?? "#contato"}>
                  {content.hero.cta.label}
                  <Arrow diagonal />
                </a>
                <a className={s.textLink} href={content.hero.secondaryCta.href}>
                  {content.hero.secondaryCta.label}
                  <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <div className={s.heroArt}>
              <Geometry />
            </div>
            <div className={s.heroFoot}>
              <span>DESIGN COM INTENÇÃO. CÓDIGO COM PROPÓSITO.</span>
              <a href="#servicos">
                Explore o portfólio <span aria-hidden="true">↓</span>
              </a>
            </div>
          </section>
          <section id="servicos" className={s.section}>
            <SectionLabel number="01">SERVIÇOS</SectionLabel>
            <div className={s.sectionHeading}>
              <h2>{services.title}</h2>
              <p>
                Uma presença digital que acompanha
                <br />o momento do seu negócio.
              </p>
            </div>
            <div className={s.services}>
              {services.items.map((item, i) => (
                <article className={s.service} key={item.title}>
                  <span className={s.serviceIndex}>
                    0{i + 1}
                    <span aria-hidden="true"> /</span>
                  </span>
                  <div className={s.serviceIcon} aria-hidden="true">
                    {i === 0 ? "[ / ]" : i === 1 ? "↗" : "⟳"}
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <a href="#contato" className={s.textLink}>
                    Vamos criar <Arrow diagonal />
                  </a>
                </article>
              ))}
            </div>
          </section>
          <section id="projetos" className={s.section}>
            <SectionLabel number="02">PROJETOS</SectionLabel>
            <div className={s.sectionHeading}>
              <h2>
                {projectsSection.displayTitle}
                <br />
                <span>{projectsSection.titleAccent}</span>
              </h2>
              <p>
                {projectsSection.description}
              </p>
            </div>
            <ProjectCarousel projects={projects} />
          </section>
          <section id="sobre" className={`${s.section} ${s.about}`}>
            <SectionLabel number="03">SOBRE MIM</SectionLabel>
            <div className={s.aboutGrid}>
              <div className={s.aboutMark} aria-hidden="true">
                <span>
                  PS<span>_</span>
                </span>
                <small>
                  PEDRO SODRÉ
                  <br />
                  DESIGN + CÓDIGO
                </small>
                <i />
              </div>
              <div>
                <p className={s.eyebrow}>QUEM ESTÁ POR TRÁS DO CÓDIGO</p>
                <h2>{about.title}</h2>
                <p className={s.aboutText}>{about.body}</p>
                <div className={s.experience}>
                  <strong>
                    5<span>+</span>
                  </strong>
                  <span>
                    anos de experiência em
                    <br />
                    desenvolvimento de software
                  </span>
                </div>
              </div>
            </div>
          </section>
          <section id="contato" className={`${s.section} ${s.contact}`}>
            <SectionLabel number="04">VAMOS CONVERSAR</SectionLabel>
            <div className={s.contactGrid}>
              <div>
                <h2>
                  {contactSection.displayTitle?.[0]}
                  <br />
                  {contactSection.displayTitle?.[1]}
                  <br />
                  <span>{contactSection.titleAccent}</span>
                </h2>
                <p>{contactSection.body}</p>
                <div className={s.contacts}>
                  {whatsappHref && (
                    <a href={whatsappHref}>
                      <span>
                        <small>PELO WHATSAPP</small>Vamos falar sobre sua ideia
                      </span>
                      <Arrow diagonal />
                    </a>
                  )}
                  {emailHref && (
                    <a href={emailHref}>
                      <span>
                        <small>POR E-MAIL</small>
                        {content.contact.email}
                      </span>
                      <Arrow diagonal />
                    </a>
                  )}
                </div>
                <span className={s.contactNote}>
                  De uma ideia no papel à sua presença digital.
                </span>
              </div>
              <ContactForm />
            </div>
          </section>
        </main>
        <footer className={s.footer}>
          <a className={s.brand} href="#inicio">
            PEDRO SODRÉ<span>DESENVOLVIMENTO WEB</span>
          </a>
          <p>© {new Date().getFullYear()} Pedro Sodré.</p>
          <a className={s.textLink} href="#inicio">
            Voltar ao topo <span aria-hidden="true">↑</span>
          </a>
        </footer>
      </div>
    </>
  );
}
