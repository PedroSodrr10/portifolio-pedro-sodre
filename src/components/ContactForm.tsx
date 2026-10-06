"use client";
import { useRef, useState, type FormEvent } from "react";
import { inquirySchema, serviceOptions } from "@/lib/inquiry-schema";
import { contactSection } from "@/lib/content";
import { Arrow } from "./Icon";
import p from "./Portfolio.module.css";
import s from "./ContactForm.module.css";
export function ContactForm() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uncertain, setUncertain] = useState(false);
  const [success, setSuccess] = useState(false);
  const submission = useRef("");
  const inFlight = useRef(false);
  const statusRef = useRef<HTMLParagraphElement>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current || uncertain || success) return;
    const form = e.currentTarget;
    if (!submission.current) submission.current = crypto.randomUUID();
    const data = {
      ...Object.fromEntries(new FormData(form)),
      submissionId: submission.current,
    };
    const parsed = inquirySchema.safeParse(data);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fields[String(i.path[0])] = i.message;
      });
      setErrors(fields);
      setStatus("Revise os campos indicados.");
      form
        .querySelector<HTMLElement>(`[name="${Object.keys(fields)[0]}"]`)
        ?.focus();
      return;
    }
    setErrors({});
    setStatus("");
    inFlight.current = true;
    setBusy(true);
    try {
      const res = await fetch("/api/orcamento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(30000),
      });
      const result = await res.json();
      setStatus(result.message);
      if (result.errors) setErrors(result.errors);
      if (result.uncertain) setUncertain(true);
      if (res.ok) {
        setSuccess(true);
        form.reset();
      }
    } catch {
      setUncertain(true);
      setStatus(
        "Não foi possível confirmar o envio. Para evitar duplicidade, não reenvie agora. Confira comigo pelo WhatsApp ou e-mail.",
      );
    } finally {
      setBusy(false);
      inFlight.current = false;
      setTimeout(() => statusRef.current?.focus(), 0);
    }
  }
  function props(name: string) {
    return {
      id: name,
      name,
      "aria-invalid": !!errors[name],
      "aria-describedby": errors[name] ? `${name}-error` : undefined,
    };
  }
  function error(name: string) {
    return errors[name] ? (
      <small id={`${name}-error`} className={s.error}>
        {errors[name]}
      </small>
    ) : null;
  }
  return (
    <form
      className={s.form}
      onSubmit={submit}
      noValidate
      aria-label="Solicitar orçamento"
    >
      <div className={s.formTitle}>
        <span>CONTE SUA IDEIA</span>
        <span aria-hidden="true">↗</span>
      </div>
      <p className={s.required}>Campos com * são obrigatórios.</p>
      <div className={s.fields}>
        <div>
          <label htmlFor="name">Nome *</label>
          <input
            {...props("name")}
            required
            autoComplete="name"
            maxLength={100}
            placeholder="Como posso te chamar?"
          />
          {error("name")}
        </div>
        <div>
          <label htmlFor="email">E-mail *</label>
          <input
            {...props("email")}
            type="email"
            required
            autoComplete="email"
            maxLength={254}
            placeholder="voce@exemplo.com"
          />
          {error("email")}
        </div>
        <div>
          <label htmlFor="phone">
            WhatsApp <span>(opcional)</span>
          </label>
          <input
            {...props("phone")}
            type="tel"
            autoComplete="tel"
            maxLength={30}
            placeholder="(DDD) Seu número"
          />
          {error("phone")}
        </div>
        <div>
          <label htmlFor="service">Serviço desejado *</label>
          <select {...props("service")} required defaultValue="">
            <option value="" disabled>
              Selecione uma opção
            </option>
            {serviceOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          {error("service")}
        </div>
        <div className={s.full}>
          <label htmlFor="message">Sobre o projeto *</label>
          <textarea
            {...props("message")}
            required
            rows={4}
            minLength={20}
            maxLength={5000}
            placeholder="O que você precisa criar ou melhorar?"
          />
          {error("message")}
        </div>
        <div>
          <label htmlFor="website">
            Site atual <span>(opcional)</span>
          </label>
          <input
            {...props("website")}
            type="url"
            maxLength={500}
            placeholder="https://"
          />
          {error("website")}
        </div>
        <div>
          <label htmlFor="timeline">
            Prazo desejado <span>(opcional)</span>
          </label>
          <input
            {...props("timeline")}
            maxLength={100}
            placeholder="Tem uma data em mente?"
          />
          {error("timeline")}
        </div>
      </div>
      <div className={s.honeypot} aria-hidden="true">
        <label htmlFor="company">Empresa (deixe vazio)</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        className={`${p.primary} ${s.submit}`}
        disabled={busy || uncertain || success}
        type="submit"
      >
        {busy
          ? "Enviando…"
          : success
            ? "Solicitação aceita para envio"
            : "Enviar solicitação de orçamento"}
        <Arrow diagonal />
      </button>
      <p className={s.privacy}>{contactSection.form?.privacyNotice}</p>
      <p className={s.status} ref={statusRef} tabIndex={-1} role="status">
        {status}
      </p>
      <noscript>
        Ative o JavaScript para usar o formulário ou fale pelos contatos ao
        lado.
      </noscript>
    </form>
  );
}
