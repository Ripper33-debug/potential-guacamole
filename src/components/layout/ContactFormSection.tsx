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
    <section className="bg-wh-gray-light py-16">
      <div className="wh-container">
        <div className="mx-auto max-w-3xl rounded border border-gray-200 bg-white p-8 shadow-sm">
          <div className="mb-6 text-center">
            <Image src="/images/logo.png" alt="Weatherhaven" width={140} height={36} className="mx-auto mb-4 h-8 w-auto" />
            <p className="text-sm text-wh-gray-text">
              Contact us for more information on our redeployable infrastructure solutions.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium">First name *</label>
                <input {...register("firstName")} className="w-full border border-gray-300 px-3 py-2 text-sm" />
                {errors.firstName && <p className="mt-1 text-xs text-red-600">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Last name *</label>
                <input {...register("lastName")} className="w-full border border-gray-300 px-3 py-2 text-sm" />
                {errors.lastName && <p className="mt-1 text-xs text-red-600">{errors.lastName.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Company / Organisation *</label>
                <input {...register("company")} className="w-full border border-gray-300 px-3 py-2 text-sm" />
                {errors.company && <p className="mt-1 text-xs text-red-600">{errors.company.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Email *</label>
                <input type="email" {...register("email")} className="w-full border border-gray-300 px-3 py-2 text-sm" />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Phone</label>
                <input {...register("phone")} className="w-full border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium">Your Country</label>
                <input {...register("country")} className="w-full border border-gray-300 px-3 py-2 text-sm" placeholder="Select country" />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium">Market *</label>
              <select {...register("market")} className="w-full border border-gray-300 px-3 py-2 text-sm">
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
              <label className="mb-1 block text-xs font-medium">How can we help?</label>
              <textarea {...register("message")} rows={4} className="w-full border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <p className="text-xs text-wh-gray-text">
              Weatherhaven is committed to protecting your privacy. We use your information to provide the services you have requested.
            </p>
            {status === "success" && <p className="text-sm text-green-700">Thank you — we will be in touch shortly.</p>}
            {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
            <Button label={isSubmitting ? "SUBMITTING..." : "SUBMIT"} type="submit" />
          </form>
        </div>
      </div>
    </section>
  );
}
