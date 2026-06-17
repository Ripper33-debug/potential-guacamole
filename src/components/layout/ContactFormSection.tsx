"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, type ContactFormData } from "@/lib/schemas";
import { Button } from "@/components/ui";
import Image from "next/image";
import { useState } from "react";

export default function ContactFormSection({ markets }: { markets: string[] }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="wh-section-alt py-20">
      <div className="wh-container">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-sm border border-wh-gray-muted bg-white shadow-xl shadow-wh-navy/5">
          <div className="bg-gradient-to-r from-wh-navy to-wh-navy-mid px-8 py-10 text-center">
            <Image src="/images/logo.png" alt="Weatherhaven" width={160} height={40} className="mx-auto mb-4 h-9 w-auto brightness-0 invert" />
            <p className="text-sm leading-relaxed text-white/75">
              Contact us for more information on our redeployable infrastructure solutions.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="wh-label">First name *</label>
                <input {...register("firstName")} className="wh-input" />
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="wh-label">Last name *</label>
                <input {...register("lastName")} className="wh-input" />
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
              </div>
              <div>
                <label className="wh-label">Company / Organisation *</label>
                <input {...register("company")} className="wh-input" />
                {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
              </div>
              <div>
                <label className="wh-label">Email *</label>
                <input type="email" {...register("email")} className="wh-input" />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="wh-label">Phone</label>
                <input {...register("phone")} className="wh-input" />
              </div>
              <div>
                <label className="wh-label">Your Country</label>
                <input {...register("country")} className="wh-input" placeholder="Select country" />
              </div>
            </div>
            <div>
              <label className="wh-label">Market *</label>
              <select {...register("market")} className="wh-input">
                <option value="">— Select —</option>
                {markets.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.market && <p className="mt-1 text-xs text-red-600">{errors.market.message}</p>}
            </div>
            <div>
              <label className="wh-label">How can we help?</label>
              <textarea {...register("message")} rows={4} className="wh-input resize-y" />
            </div>
            <p className="text-xs leading-relaxed text-wh-gray-text">
              Weatherhaven is committed to protecting your privacy. We use your information to provide the services you have requested.
            </p>
            {status === "success" && (
              <p className="rounded-sm bg-green-50 px-4 py-3 text-sm text-green-800">Thank you — we will be in touch shortly.</p>
            )}
            {status === "error" && (
              <p className="rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700">Something went wrong. Please try again.</p>
            )}
            <Button label={isSubmitting ? "Submitting..." : "Submit"} type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
}
