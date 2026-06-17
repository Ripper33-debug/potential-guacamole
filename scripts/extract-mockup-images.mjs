#!/usr/bin/env node
/**
 * Extract photos from full-page mockup PNGs into optimized WebP assets.
 * Run: node scripts/extract-mockup-images.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const MOCKUPS = path.join(ROOT, "design-reference/mockups");
const OUT = path.join(ROOT, "public/images/content");

const HEADER = 72;

/** Percentage crops: x, y, w, h (0–1) */
const T = {
  hero: { x: 0, y: 0.018, w: 1, h: 0.095 },
  detail: { x: 0.5, y: 0.115, w: 0.5, h: 0.095 },
  grid1: { x: 0, y: 0.265, w: 0.5, h: 0.088 },
  grid2: { x: 0.5, y: 0.265, w: 0.5, h: 0.088 },
  introLeft: { x: 0, y: 0.115, w: 0.5, h: 0.095 },
  hubCard: { x: 0, y: 0.22, w: 0.33, h: 0.12 },
};

const PRODUCT_MOCKUPS = {
  "containerized-solutions": 6,
  bmecc: 7,
  mecc: 8,
  ehmecc: 9,
  trecc: 10,
  ateps: 11,
  softwall: 12,
  "polar-units": 13,
  mts: 14,
  "series-4": 15,
  rdmss: 16,
  "mex-26": 17,
  "series-2": 18,
  "airbeam-hp": 19,
  "airbeam-lp": 20,
  "auxiliary-equipment": 21,
  vestibules: 22,
  solarshades: 23,
};

const SOLUTION_MOCKUPS = {
  medical: 24,
  "field-hospitals": 25,
  "mobile-clinics": 26,
  "isolation-facilities": 27,
  "emergency-response": 28,
  commercial: 29,
  "workforce-housing": 30,
  "antarctic-climate": 31,
  "turnkey-solutions": 32,
  "luxury-units": 33,
  military: 34,
  "military-camps": 35,
  "deployable-3d-printing": 37,
  "command-posts": 38,
  "ground-stations": 39,
  "vehicle-workshops": 40,
  "aircraft-support": 41,
  "field-kitchens": 42,
  "tire-maintenance": 43,
  services: 44,
  "engineering-design": 45,
  "transportation-logistics": 46,
  "installation-dismantling": 47,
  "repair-overhaul": 48,
  "training-support": 49,
  parts: 50,
};

const PROJECT_MOCKUPS = {
  projects: 51,
  africa: 52,
  antarctica: 53,
  asia: 54,
  australia: 55,
  europe: 56,
  "north-america": 57,
  "south-america": 58,
};

const INNOVATION_MOCKUPS = {
  "engineering-team": 60,
  patents: 61,
  "speed-mobility": 62,
  "expandable-space": 63,
  "extended-height": 64,
  "energy-efficiency": 65,
  "solar-shades": 66,
  "extreme-climate": 67,
  "tactical-deployable": 68,
};

const NEWS_MOCKUPS = {
  "jessica-au": 71,
  "jessica-au-cfo": 71,
  "james-kirk": 71,
  "am-facility": 72,
  acquisition: 73,
};

const PAGE_MOCKUPS = {
  "home-hero": 1,
  about: 2,
  "about-hero": 2,
  timeline: 3,
  "timeline-hero": 3,
  supplier: 4,
  anniversary: 5,
  contact: 2,
};

/** Build asset registry: name -> { mockup, crop } */
function buildRegistry() {
  const assets = {};

  // Products
  for (const [slug, mockup] of Object.entries(PRODUCT_MOCKUPS)) {
    assets[slug] = { mockup, crop: T.hero };
    if (slug !== "containerized-solutions" && slug !== "auxiliary-equipment" && slug !== "softwall") {
      assets[`${slug}-detail`] = { mockup, crop: T.detail };
      assets[`${slug}-grid-1`] = { mockup, crop: T.grid1 };
      assets[`${slug}-grid-2`] = { mockup, crop: T.grid2 };
    }
  }

  // Solutions hubs + detail pages
  for (const [slug, mockup] of Object.entries(SOLUTION_MOCKUPS)) {
    assets[slug] = { mockup, crop: T.hero };
    if (!["medical", "commercial", "military", "services"].includes(slug)) {
      assets[`${slug}-intro`] = { mockup, crop: T.detail };
    }
  }

  // Field hospitals level columns (mockup 25)
  assets["fh-l1"] = { mockup: 25, crop: { x: 0, y: 0.22, w: 0.33, h: 0.14 } };
  assets["fh-l2"] = { mockup: 25, crop: { x: 0.33, y: 0.22, w: 0.34, h: 0.14 } };
  assets["fh-l3"] = { mockup: 25, crop: { x: 0.67, y: 0.22, w: 0.33, h: 0.14 } };

  // Projects index
  assets.projects = { mockup: 51, crop: T.hero };
  const continents = ["africa", "antarctica", "asia", "australia", "europe", "north-america", "south-america"];
  continents.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    assets[`${c}-map`] = {
      mockup: 51,
      crop: { x: col * 0.33, y: 0.22 + row * 0.14, w: 0.33, h: 0.13 },
    };
  });

  // Project cards per continent
  const projectCards = {
    africa: ["ghana", "sa", "mali", "burundi"],
    antarctica: ["kunlun", "epica", "bas"],
    asia: ["uae", "japan", "mongolia"],
    australia: ["adf", "air67"],
    europe: ["greenland", "ukraine", "netherlands"],
    "north-america": ["hqss", "msvs", "usa-am"],
    "south-america": ["brazil", "chile", "peru"],
  };
  for (const [continent, cards] of Object.entries(projectCards)) {
    const mockup = PROJECT_MOCKUPS[continent];
    cards.forEach((name, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      assets[name] = {
        mockup,
        crop: { x: col * 0.5, y: 0.26 + row * 0.15, w: 0.5, h: 0.13 },
      };
    });
  }

  // Innovations index cards (mockup 59)
  assets["eng-team"] = { mockup: 59, crop: { x: 0, y: 0.22, w: 0.33, h: 0.12 } };
  assets.patents = { mockup: 59, crop: { x: 0.33, y: 0.22, w: 0.34, h: 0.12 } };
  assets.speed = { mockup: 59, crop: { x: 0.67, y: 0.22, w: 0.33, h: 0.12 } };
  assets.tactical = { mockup: 59, crop: { x: 0, y: 0.36, w: 0.33, h: 0.12 } };
  assets.expandable = { mockup: 59, crop: { x: 0.33, y: 0.36, w: 0.34, h: 0.12 } };
  assets.extended = { mockup: 59, crop: { x: 0.67, y: 0.36, w: 0.33, h: 0.12 } };
  assets.energy = { mockup: 59, crop: { x: 0, y: 0.5, w: 0.33, h: 0.12 } };
  assets["solar-impact"] = { mockup: 59, crop: { x: 0.33, y: 0.5, w: 0.34, h: 0.12 } };
  assets.extreme = { mockup: 59, crop: { x: 0.67, y: 0.5, w: 0.33, h: 0.12 } };

  for (const [slug, mockup] of Object.entries(INNOVATION_MOCKUPS)) {
    const key = slug === "engineering-team" ? "eng-team" : slug === "solar-shades" ? "solar-impact" : slug === "speed-mobility" ? "speed" : slug === "tactical-deployable" ? "tactical" : slug === "extended-height" ? "extended" : slug === "expandable-space" ? "expandable" : slug === "energy-efficiency" ? "energy" : slug === "extreme-climate" ? "extreme" : slug;
    if (!assets[key]) assets[key] = { mockup, crop: T.hero };
    if (slug === "patents") assets["patent-doc"] = { mockup, crop: T.detail };
    if (slug === "speed-mobility") assets["trecc-deploy"] = { mockup, crop: T.grid1 };
  }

  // News
  assets["news-featured"] = { mockup: 1, crop: { x: 0, y: 0.51, w: 0.5, h: 0.095 } };
  assets["news-1"] = { mockup: 1, crop: { x: 0.55, y: 0.525, w: 0.18, h: 0.045 } };
  assets["news-2"] = { mockup: 1, crop: { x: 0.55, y: 0.575, w: 0.18, h: 0.045 } };
  assets["news-3"] = { mockup: 1, crop: { x: 0.55, y: 0.625, w: 0.18, h: 0.045 } };
  assets["am-facility"] = { mockup: 72, crop: T.hero };

  for (const [name, mockup] of Object.entries(NEWS_MOCKUPS)) {
    if (name === "am-facility") continue;
    assets[name] = { mockup, crop: name === "james-kirk" ? T.grid2 : T.hero };
  }

  // About page
  assets["about-hero"] = { mockup: 2, crop: T.hero };
  assets["value-rel"] = { mockup: 2, crop: { x: 0, y: 0.55, w: 0.33, h: 0.1 } };
  assets["value-qual"] = { mockup: 2, crop: { x: 0.33, y: 0.55, w: 0.34, h: 0.1 } };
  assets["value-env"] = { mockup: 2, crop: { x: 0.67, y: 0.55, w: 0.33, h: 0.1 } };
  assets.supplier = { mockup: 4, crop: T.hero };
  assets.anniversary = { mockup: 5, crop: T.hero };
  assets.contact = { mockup: 2, crop: T.grid1 };

  // Timeline
  assets["timeline-hero"] = { mockup: 3, crop: T.hero };
  const timelineItems = ["tl-1981", "tl-1981m", "tl-1983", "tl-1984", "tl-1985", "tl-2008", "tl-2016", "tl-2020"];
  timelineItems.forEach((name, i) => {
    assets[name] = { mockup: 3, crop: { x: 0.15, y: 0.14 + i * 0.08, w: 0.35, h: 0.06 } };
  });

  // Homepage
  assets["home-hero"] = { mockup: 1, crop: { x: 0, y: 0.016, w: 1, h: 0.085 } };
  for (let i = 0; i < 8; i++) {
    const col = i % 4;
    const row = Math.floor(i / 4);
    assets[`collage-${i}`] = {
      mockup: 1,
      crop: { x: col * 0.25, y: 0.016 + row * 0.042, w: 0.25, h: 0.042 },
    };
  }
  const carousels = ["carousel-wh", "carousel-ant", "carousel-mil", "carousel-fh"];
  carousels.forEach((name, i) => {
    assets[name] = { mockup: 1, crop: { x: i * 0.25, y: 0.152, w: 0.25, h: 0.082 } };
  });
  assets["mobile-healthcare"] = { mockup: 1, crop: { x: 0, y: 0.242, w: 0.5, h: 0.09 } };
  assets["trecc-banner"] = { mockup: 1, crop: { x: 0, y: 0.375, w: 0.5, h: 0.09 } };
  assets.team = { mockup: 1, crop: { x: 0, y: 0.64, w: 0.5, h: 0.08 } };

  return assets;
}

function cropToPixels(crop, width, height) {
  const left = Math.round(crop.x * width);
  const top = Math.round(crop.y * height);
  const w = Math.min(Math.round(crop.w * width), width - left);
  const h = Math.min(Math.round(crop.h * height), height - top);
  return { left, top, width: w, height: h };
}

async function extractAsset(name, { mockup, crop }) {
  const src = path.join(MOCKUPS, `${mockup}.png`);
  if (!fs.existsSync(src)) {
    console.warn(`  skip ${name}: mockup ${mockup}.png not found`);
    return false;
  }

  const meta = await sharp(src).metadata();
  const { width, height } = meta;
  const region = cropToPixels(crop, width, height);

  if (region.width < 20 || region.height < 20) {
    console.warn(`  skip ${name}: crop too small`, region);
    return false;
  }

  const maxW = name.includes("grid") || name.includes("news-") || name.startsWith("tl-") ? 600 : name.includes("hero") || name === "projects" ? 1400 : 900;

  const dest = path.join(OUT, `${name}.webp`);
  await sharp(src)
    .extract(region)
    .resize({ width: maxW, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(dest);

  return true;
}

async function updateContentPaths() {
  const contentDir = path.join(ROOT, "content");
  let filesUpdated = 0;

  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.name.endsWith(".json")) {
        let text = fs.readFileSync(full, "utf8");
        const updated = text.replace(/\/images\/placeholders\/([a-z0-9-]+)\.svg/g, (match, name) => {
          const webp = path.join(OUT, `${name}.webp`);
          if (fs.existsSync(webp)) return `/images/content/${name}.webp`;
          return match;
        });
        if (updated !== text) {
          fs.writeFileSync(full, updated);
          filesUpdated++;
        }
      }
    }
  }

  walk(contentDir);
  return filesUpdated;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const registry = buildRegistry();

  console.log(`Extracting ${Object.keys(registry).length} assets from mockups...`);
  let ok = 0;
  let fail = 0;

  for (const [name, spec] of Object.entries(registry)) {
    try {
      const success = await extractAsset(name, spec);
      if (success) ok++;
      else fail++;
    } catch (err) {
      console.error(`  error ${name}:`, err.message);
      fail++;
    }
  }

  console.log(`\nExtracted ${ok} images (${fail} skipped/failed)`);
  const updated = await updateContentPaths();
  console.log(`Updated ${updated} content JSON files`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
