import { z } from "zod";

export const heroSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  image: z.string().optional(),
  variant: z.enum(["image", "split", "region", "navy"]).optional(),
  region: z.string().optional(),
});

export const ctaSchema = z.object({
  label: z.string(),
  href: z.string().optional(),
  variant: z.enum(["primary", "secondary", "download"]).optional(),
});

export const cardSchema = z.object({
  tag: z.string().optional(),
  title: z.string(),
  description: z.string().optional().default(""),
  image: z.string().optional(),
  href: z.string().optional(),
  buttonLabel: z.string().optional(),
});

export const featureItemSchema = z.object({
  title: z.string().optional(),
  text: z.string(),
});

export const featureBlockSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string().optional(),
});

export const specRowSchema = z.object({
  label: z.string(),
  values: z.array(z.string()),
});

export const specTableSchema = z.object({
  title: z.string().optional(),
  columns: z.array(z.string()),
  rows: z.array(specRowSchema),
});

export const sectionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("intro"),
    heading: z.string().optional(),
    highlight: z.string().optional(),
    body: z.union([z.string(), z.array(z.string())]),
    cta: ctaSchema.optional(),
    image: z.string().optional(),
    caption: z.object({ title: z.string(), body: z.string() }).optional(),
  }),
  z.object({
    type: z.literal("text"),
    heading: z.string().optional(),
    body: z.union([z.string(), z.array(z.string())]),
  }),
  z.object({
    type: z.literal("cards"),
    heading: z.string().optional(),
    columns: z.number().optional(),
    items: z.array(cardSchema),
  }),
  z.object({
    type: z.literal("features"),
    heading: z.string().optional(),
    items: z.array(featureItemSchema),
    columns: z.number().optional(),
  }),
  z.object({
    type: z.literal("feature-grid"),
    heading: z.string().optional(),
    items: z.array(featureBlockSchema),
  }),
  z.object({
    type: z.literal("why-choose"),
    heading: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        icon: z.enum(["solutions", "engineering", "global"]).optional(),
      })
    ),
  }),
  z.object({
    type: z.literal("specs"),
    table: specTableSchema,
  }),
  z.object({
    type: z.literal("related-solutions"),
    heading: z.string().optional(),
    items: z.array(cardSchema),
  }),
  z.object({
    type: z.literal("related-insights"),
    heading: z.string().optional(),
    items: z.array(cardSchema),
  }),
  z.object({
    type: z.literal("rfp"),
    heading: z.string().optional(),
    body: z.string().optional(),
  }),
  z.object({
    type: z.literal("split-banner"),
    title: z.string(),
    description: z.string(),
    image: z.string(),
    buttons: z.array(ctaSchema).optional(),
    reversed: z.boolean().optional(),
  }),
  z.object({
    type: z.literal("columns"),
    heading: z.string().optional(),
    items: z.array(
      z.object({
        title: z.string(),
        body: z.union([z.string(), z.array(z.string())]),
        image: z.string().optional(),
      })
    ),
  }),
  z.object({
    type: z.literal("timeline"),
    items: z.array(
      z.object({
        year: z.string(),
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
      })
    ),
  }),
  z.object({
    type: z.literal("team"),
    heading: z.string().optional(),
    members: z.array(
      z.object({ name: z.string(), title: z.string(), image: z.string().optional() })
    ),
  }),
  z.object({
    type: z.literal("values"),
    heading: z.string().optional(),
    items: z.array(
      z.object({ title: z.string(), description: z.string(), image: z.string().optional() })
    ),
  }),
  z.object({
    type: z.literal("hero-collage"),
    images: z.array(z.string()),
    body: z.string(),
    cta: ctaSchema.optional(),
  }),
  z.object({
    type: z.literal("news-feature"),
    featured: cardSchema,
    items: z.array(cardSchema),
  }),
  z.object({
    type: z.literal("team-cta"),
    title: z.string(),
    body: z.string(),
    image: z.string().optional(),
    cta: ctaSchema,
  }),
  z.object({
    type: z.literal("carousel"),
    items: z.array(cardSchema),
  }),
  z.object({
    type: z.literal("article"),
    date: z.string().optional(),
    body: z.array(z.string()),
    sidebar: z
      .object({
        name: z.string(),
        title: z.string(),
        bio: z.string(),
        image: z.string().optional(),
      })
      .optional(),
  }),
  z.object({
    type: z.literal("cta-bar"),
    body: z.string(),
    cta: ctaSchema,
  }),
]);

export const pageSchema = z.object({
  slug: z.string(),
  template: z.enum([
    "homepage",
    "hub",
    "product",
    "solution",
    "static",
    "projects-region",
    "news",
  ]),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  hero: heroSchema,
  sections: z.array(sectionSchema),
  showContactForm: z.boolean().optional(),
  showRfp: z.boolean().optional(),
});

export type PageContent = z.infer<typeof pageSchema>;
export type Section = z.infer<typeof sectionSchema>;

export const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  country: z.string().optional(),
  market: z.string().min(1, "Market is required"),
  message: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
