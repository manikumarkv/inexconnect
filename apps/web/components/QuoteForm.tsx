"use client";

import { useState } from "react";
import { SITE } from "@inexconnect/ui";
import { quoteServiceOptions } from "@/content/site";

/**
 * Email-only quote intake (v1): submitting composes an email in the visitor's
 * own mail app, addressed to the business inbox. Nothing is stored and there
 * is no backend — the form says so, on the page, before anyone submits.
 */
export default function QuoteForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: quoteServiceOptions[0] as string,
    budget: "",
    timeline: "",
    message: "",
  });

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.company ? `Company: ${form.company}` : null,
      `Service: ${form.service}`,
      form.budget ? `Budget: ${form.budget}` : null,
      form.timeline ? `Timeline: ${form.timeline}` : null,
      "",
      form.message,
    ].filter(Boolean);
    const subject = encodeURIComponent(`Quote request — ${form.service} (${form.name})`);
    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="card !border-t-coral">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="q-name">
            Your name *
          </label>
          <input
            id="q-name"
            className="field"
            required
            value={form.name}
            onChange={update("name")}
            autoComplete="name"
          />
        </div>
        <div>
          <label className="label" htmlFor="q-email">
            Email *
          </label>
          <input
            id="q-email"
            className="field"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            autoComplete="email"
          />
        </div>
        <div>
          <label className="label" htmlFor="q-company">
            Company (optional)
          </label>
          <input
            id="q-company"
            className="field"
            value={form.company}
            onChange={update("company")}
            autoComplete="organization"
          />
        </div>
        <div>
          <label className="label" htmlFor="q-service">
            What do you need?
          </label>
          <select
            id="q-service"
            className="field"
            value={form.service}
            onChange={update("service")}
          >
            {quoteServiceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="q-budget">
            Budget (optional)
          </label>
          <input
            id="q-budget"
            className="field"
            placeholder="e.g. $2,000 – $5,000"
            value={form.budget}
            onChange={update("budget")}
          />
        </div>
        <div>
          <label className="label" htmlFor="q-timeline">
            Timeline (optional)
          </label>
          <input
            id="q-timeline"
            className="field"
            placeholder="e.g. ready to start in March"
            value={form.timeline}
            onChange={update("timeline")}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor="q-message">
            Tell us about the project *
          </label>
          <textarea
            id="q-message"
            className="field"
            rows={5}
            required
            value={form.message}
            onChange={update("message")}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Send request
      </button>
      <p className="mt-4 text-xs leading-relaxed text-slate">
        This form opens your email app with the request addressed to {SITE.email} — nothing is
        stored on this website. Prefer email directly? Write to {SITE.email}. We reply within one
        business day.
      </p>
    </form>
  );
}
