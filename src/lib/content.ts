import fs from "fs";
import path from "path";
import { pageSchema, type PageContent } from "./schemas";

const contentRoot = path.join(process.cwd(), "content");

function readJson<T>(filePath: string): T {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
}

function loadPageFromFile(filePath: string): PageContent {
  const data = readJson<unknown>(filePath);
  return pageSchema.parse(data);
}

export function getSiteConfig() {
  return readJson<{
    name: string;
    phone: string;
    email: string;
    address: string;
    social: { label: string; href: string }[];
    markets: string[];
  }>(path.join(contentRoot, "site.json"));
}

export function getNavigation() {
  return readJson<{
    main: {
      label: string;
      href: string;
      children?: { label: string; href: string }[];
    }[];
    footer: { legal: { label: string; href: string }[] };
  }>(path.join(contentRoot, "navigation.json"));
}

export function getHomePage(): PageContent {
  return loadPageFromFile(path.join(contentRoot, "pages/home.json"));
}

export function getAboutPage(slug: string): PageContent {
  return loadPageFromFile(path.join(contentRoot, "pages", `${slug}.json`));
}

export function getProductPage(slug: string): PageContent {
  return loadPageFromFile(path.join(contentRoot, "products", `${slug}.json`));
}

export function getAllProductSlugs(): string[] {
  const dir = path.join(contentRoot, "products");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(".json", ""));
}

export function getSolutionPage(category: string, slug?: string): PageContent {
  const file = slug ? `${slug}.json` : "index.json";
  return loadPageFromFile(path.join(contentRoot, "solutions", category, file));
}

export function getSolutionSlugs(category: string): string[] {
  const dir = path.join(contentRoot, "solutions", category);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .map((f) => f.replace(".json", ""));
}

export function getSolutionCategories(): string[] {
  const dir = path.join(contentRoot, "solutions");
  return fs.readdirSync(dir).filter((f) => fs.statSync(path.join(dir, f)).isDirectory());
}

export function getProjectPage(slug: string): PageContent {
  const file = slug === "projects" ? "index.json" : `${slug}.json`;
  return loadPageFromFile(path.join(contentRoot, "projects", file));
}

export function getProjectSlugs(): string[] {
  const dir = path.join(contentRoot, "projects");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .map((f) => f.replace(".json", ""));
}

export function getInnovationPage(slug?: string): PageContent {
  const file = slug ? `${slug}.json` : "index.json";
  return loadPageFromFile(path.join(contentRoot, "innovations", file));
}

export function getInnovationSlugs(): string[] {
  const dir = path.join(contentRoot, "innovations");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .map((f) => f.replace(".json", ""));
}

export function getNewsPage(slug?: string): PageContent {
  const file = slug ? `${slug}.json` : "index.json";
  return loadPageFromFile(path.join(contentRoot, "news", file));
}

export function getNewsSlugs(): string[] {
  const dir = path.join(contentRoot, "news");
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json") && f !== "index.json")
    .map((f) => f.replace(".json", ""));
}
