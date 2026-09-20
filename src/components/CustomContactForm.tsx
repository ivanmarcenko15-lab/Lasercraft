"use client";

import { FormEvent, useState } from "react";
import { IconCheck } from "./Icons";

export function CustomContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card-surface space-y-3 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-gold">
          <IconCheck size={24} />
        </div>
        <h2 className="font-serif text-2xl">Enquiry received</h2>
        <p className="text-charcoal/65">
          Thank you — this is a demo form, so nothing was emailed. In a live
          site we would reply within one working day.
        </p>
        <button
          type="button"
          className="btn-outline mt-2"
          onClick={() => setSent(false)}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            Name
          </label>
          <input required className="input-field" name="name" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            Email
          </label>
          <input required type="email" className="input-field" name="email" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            Phone (optional)
          </label>
          <input type="tel" className="input-field" name="phone" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
            Enquiry type
          </label>
          <select className="input-field" name="type" defaultValue="custom">
            <option value="custom">Custom design</option>
            <option value="product">Product question</option>
            <option value="wholesale">Wholesale / trade</option>
            <option value="wedding">Wedding &amp; events</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
          Preferred material
        </label>
        <div className="flex flex-wrap gap-3 text-sm">
          {["Wood", "Acrylic", "Leather", "Not sure"].map((m) => (
            <label key={m} className="flex items-center gap-2">
              <input type="checkbox" name="material" value={m} className="accent-gold" />
              {m}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal/60">
          Project details
        </label>
        <textarea
          required
          rows={6}
          name="details"
          className="input-field resize-y"
          placeholder="Describe sizes, quantities, wording to engrave, logo files, deadlines…"
        />
      </div>

      <button type="submit" className="btn-gold">
        Send enquiry
      </button>
      <p className="text-xs text-charcoal/45">
        Demo form — submissions are not emailed. Contact us directly at
        info@lasecraft.co.uk for real projects.
      </p>
    </form>
  );
}
