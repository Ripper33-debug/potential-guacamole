import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const contentDir = path.join(root, "content");

const PLACEHOLDER = (name) => `/images/placeholders/${name}.svg`;

const defaultWhyChoose = {
  type: "why-choose",
  heading:
    "Why choose Weatherhaven as your redeployable infrastructure and camp provider?",
  items: [
    {
      title: "First class solutions",
      description:
        "We have the operational experience to deliver the right solution for your mission, on time and on budget.",
      icon: "solutions",
    },
    {
      title: "Professionally engineered and manufactured in America and Europe",
      description:
        "Our facilities in North America and Europe ensure quality manufacturing to the highest standards.",
      icon: "engineering",
    },
    {
      title: "Delivery and installation across all 7 continents",
      description:
        "For over 45 years we have deployed solutions worldwide, from polar research to desert military camps.",
      icon: "global",
    },
  ],
};

const defaultRfp = {
  type: "rfp",
  heading: "DOWNLOAD OUR RFP GUIDE",
  body: "We deliver complete support for your project or mission with fully turnkey deployable systems. From requirements analysis and system engineering to installation and outfitting, Weatherhaven manages every aspect of your mobile infrastructure.",
};

function productPage(slug, title, subtitle, intro, features, specs) {
  return {
    slug,
    template: "product",
    meta: { title: `${title} | Weatherhaven`, description: subtitle },
    hero: { title, subtitle, image: PLACEHOLDER(slug), variant: "image" },
    showContactForm: true,
    sections: [
      {
        type: "intro",
        heading: intro.heading,
        body: intro.body,
        cta: { label: "VIEW BROCHURE", href: "/contact", variant: "primary" },
        image: PLACEHOLDER(`${slug}-detail`),
        caption: intro.caption,
      },
      { type: "features", heading: "Key Features", items: features.map((t) => ({ text: t })) },
      {
        type: "feature-grid",
        items: [
          {
            title: "Engineered for mission success",
            description: intro.body[0] || intro.body,
            image: PLACEHOLDER(`${slug}-grid-1`),
          },
          {
            title: "Operational effectiveness in the field",
            description:
              "Designed for rapid deployment with minimal personnel and no specialized tools required.",
            image: PLACEHOLDER(`${slug}-grid-2`),
          },
        ],
      },
      { type: "specs", table: specs },
      {
        type: "related-solutions",
        heading: "Related Solutions",
        items: [
          { title: "Field Hospitals", description: "Mobile medical facilities", href: "/solutions/medical/field-hospitals" },
          { title: "Command Posts", description: "Tactical command centres", href: "/solutions/military/command-posts" },
          { title: "Mobile Workshops", description: "Vehicle maintenance", href: "/solutions/military/vehicle-workshops" },
        ],
      },
    ],
  };
}

function solutionPage(slug, title, subtitle, intro, extraSections = []) {
  return {
    slug,
    template: "solution",
    meta: { title: `${title} | Weatherhaven`, description: subtitle },
    hero: { title, subtitle, image: PLACEHOLDER(slug), variant: "image" },
    showContactForm: true,
    showRfp: true,
    sections: [
      {
        type: "intro",
        heading: intro.heading,
        body: intro.body,
        cta: { label: intro.cta || "CONNECT WITH AN EXPERT", href: "/contact" },
        image: PLACEHOLDER(`${slug}-intro`),
        caption: intro.caption,
      },
      ...extraSections,
      defaultRfp,
    ],
  };
}

function hubPage(slug, title, subtitle, intro, cards, extra = []) {
  return {
    slug,
    template: "hub",
    meta: { title: `${title} | Weatherhaven`, description: subtitle },
    hero: { title, subtitle, image: PLACEHOLDER(slug), variant: "image" },
    showContactForm: true,
    sections: [
      {
        type: "cta-bar",
        body: intro,
        cta: { label: "GET IN TOUCH", href: "/contact" },
      },
      { type: "cards", heading: title, items: cards },
      ...extra,
      defaultWhyChoose,
    ],
  };
}

const products = {
  "containerized-solutions": hubPage(
    "containerized-solutions",
    "Containerized Solutions",
    "Integrated expandable container solutions for over 30 years",
    "Weatherhaven has been producing integrated expandable container solutions for over 30 years. Our innovative designs are built entirely around the end users' needs.",
    [
      { tag: "MECC", title: "Mobile Expandable Container Configuration", description: "The world's most popular expandable container.", href: "/products/mecc", buttonLabel: "FIND OUT MORE" },
      { tag: "EHMECC", title: "Extended Height MECC", description: "Raising the roof on 20' expanding container capability.", href: "/products/ehmecc", buttonLabel: "FIND OUT MORE" },
      { tag: "TRECC", title: "Tactical Redeployable Expanding Container Capability", description: "Trailer-mounted tactical mission space.", href: "/products/trecc", buttonLabel: "FIND OUT MORE" },
      { tag: "BMECC", title: "Basic Mobile Expandable Container Configuration", description: "Robust, mobile, rapidly deployable container solution.", href: "/products/bmecc", buttonLabel: "FIND OUT MORE" },
      { tag: "ATEPS", title: "Air Transportable Expandable Pallet System", description: "Tactical capability in a pallet footprint.", href: "/products/ateps", buttonLabel: "FIND OUT MORE" },
    ]
  ),
  bmecc: productPage(
    "bmecc",
    "BMECC",
    "The robust, mobile, and rapidly deployable container solution.",
    {
      heading: "Rapid deployment meets mission adaptability",
      body: [
        "The BMECC is engineered for speed and versatility for critical missions, meeting ISO standards for transport as a standard 20' container.",
        "Transportable as a standard 20' ISO container with rapid deployment for clinics, kitchens, or workshops.",
      ],
      caption: { title: "Intermodal transport and mission-ready design.", body: "Deploy in 20 minutes with 2 people." },
    },
    ["Folds up as a 20' ISO container", "Rapid deployment: 2 people, 20 minutes", "Fully insulated for extreme climates", "Rugged steel construction", "Solar-ready roof", "Low maintenance surface"],
    { columns: ["Category", "Details"], rows: [{ label: "Packed Size", values: ["8' W x 8'6\" H x 20' L"] }, { label: "Deployed Size", values: ["24' 2.5\" W x 8' 10.5\" H x 20' L"] }, { label: "Operating Temperature", values: ["-40°C to +50°C"] }] }
  ),
  mecc: productPage(
    "mecc",
    "MECC",
    "The world's most popular expandable container.",
    {
      heading: "MECC robust and operationally effective.",
      body: ["The MECC offers a 3:1 expansion ratio with 15-20 minute setup time and global transportability.", "Deployed on the ground or on the back of a vehicle, the MECC provides unmatched flexibility."],
      caption: { title: "Limitless applications", body: "From combat to humanitarian relief." },
    },
    ["Rapidly deployable", "ISO standard dimensions", "All-weather operation", "Integrated systems available", "Vehicle or ground deployment"],
    { columns: ["Specification", "MECC-1", "MECC-2"], rows: [{ label: "Floor Area", values: ["—", "—"] }, { label: "Setup Time", values: ["15-20 min", "15-20 min"] }] }
  ),
  ehmecc: productPage(
    "ehmecc",
    "EHMECC",
    "Raising the roof on 20' expanding container capability",
    {
      heading: "EHMECC offers the most deployed volume of any expanding container.",
      body: ["Integrated roof lift for 4.2m internal height with 36m² floor area and no floor or wall hinges.", "Transportable as a standard 20' ISO container with setup in less than 20 minutes."],
      caption: { title: "Unprecedented deployed volume", body: "Unmatched operational versatility worldwide." },
    },
    ["Integrated roof lift system", "36m² internal floor area", "Standard 20' ISO transport", "Setup in under 20 minutes", "No specialized tools required"],
    { columns: ["Specification", "Packed", "Deployed"], rows: [{ label: "Height", values: ["—", "4.2m internal"] }, { label: "Floor Area", values: ["—", "36m²"] }] }
  ),
  trecc: productPage(
    "trecc",
    "TRECC",
    "The tactical mission space, expanding the art of the possible.",
    {
      heading: "Rapidly agile, TRECC expands the possibilities.",
      body: ["Trailer-mounted innovation fully deployed in under 30 minutes by two operators.", "Mobile systems integrated and ready for self-sufficient operational capability."],
      caption: { title: "Mobile systems integrated", body: "Self-sufficient operational capability." },
    },
    ["Rapid deployment under 30 mins", "Trailer-mounted", "Scalable and modular", "Operates -40°C to +50°C", "Integrated HVAC and electrical"],
    { columns: ["Model", "TRECC 10", "TRECC 15", "TRECC 20"], rows: [{ label: "Setup Time", values: ["<30 min", "<30 min", "<30 min"] }] }
  ),
  ateps: productPage(
    "ateps",
    "ATEPS",
    "Air Transportable Expandable Pallet System",
    {
      heading: "tactical capability in a pallet footprint",
      body: ["Fits on a single 463L pallet and expands in minutes to provide a secure, insulated workspace.", "Compatible with C-130, C-17, and A400M aircraft."],
      caption: { title: "Mission-ready design", body: "Military-grade aluminum chassis with integrated systems." },
    },
    ["Two-person setup in under 15 minutes", "463L pallet footprint", "Extreme climate performance", "Quick-connect shore power", "Ruggedized exterior"],
    { columns: ["Category", "Details"], rows: [{ label: "Packed Size", values: ["88\" x 108\""] }, { label: "Weight", values: ["2,500 lbs"] }] }
  ),
  softwall: hubPage(
    "softwall",
    "Softwall",
    "Redeployable soft-walled structures for diverse environments",
    "Weatherhaven designs and manufactures redeployable soft-walled structures for military, medical, and commercial operations worldwide.",
    [
      { tag: "POLAR", title: "Polar Units", description: "Extreme climate shelter systems.", href: "/products/polar-units", buttonLabel: "FIND OUT MORE" },
      { tag: "MTS", title: "Modular Tentage System", description: "Enduring operations in harsh environments.", href: "/products/mts", buttonLabel: "FIND OUT MORE" },
      { tag: "SERIES 4", title: "Series 4", description: "Trusted in extreme environments.", href: "/products/series-4", buttonLabel: "FIND OUT MORE" },
      { tag: "RDMSS", title: "RDMSS", description: "The world's most advanced shelter system.", href: "/products/rdmss", buttonLabel: "FIND OUT MORE" },
      { tag: "MEX-26", title: "MEX-26", description: "Aircraft & vehicle maintenance system.", href: "/products/mex-26", buttonLabel: "FIND OUT MORE" },
      { tag: "SERIES 2", title: "Series 2", description: "Modular insulated systems.", href: "/products/series-2", buttonLabel: "FIND OUT MORE" },
      { tag: "AIRHAVEN HP", title: "Inflatable Airbeam HP", description: "High-pressure inflatable infrastructure.", href: "/products/airbeam-hp", buttonLabel: "FIND OUT MORE" },
      { tag: "AIRHAVEN LP", title: "Inflatable Airbeam LP", description: "Rapidly deployable inflatable systems.", href: "/products/airbeam-lp", buttonLabel: "FIND OUT MORE" },
    ]
  ),
  "polar-units": productPage("polar-units", "Polar Units", "Extreme performance solutions for the world's harshest climates", { heading: "Proven solutions for the most extreme climates", body: ["Supporting climate research and expeditionary operations since our first Antarctic camp in 1983."], caption: { title: "Built for survival", body: "Designed for comfort in extreme cold." } }, ["Polar-set level insulation", "Lightweight and compact", "Rapid assembly", "Fully insulated"], { columns: ["Model", "Details"], rows: [{ label: "Temperature Range", values: ["-50°C to +50°C"] }] }),
  mts: productPage("mts", "Modular Tentage System", "Supporting your enduring operation in harsh environments", { heading: "MTS innovative, simple, it just works.", body: ["High-strength frames with rapid deployment for military operations worldwide."], caption: { title: "Flexible modular architecture", body: "Tailored to diverse military requirements." } }, ["High-strength lightweight frame", "Rapid deployment", "Integrated electrical and HVAC", "Military standards tested"], { columns: ["Width", "Length", "Height @ Peak"], rows: [{ label: "8'", values: ["8'", "—", "—"] }] }),
  "series-4": productPage("series-4", "Series 4", "Trusted to endure some of the world's most extreme environments", { heading: "Series 4, the standard in base-camp facilities.", body: ["Flexible modular design adapts seamlessly to client-specific requirements."], caption: { title: "Modular design", body: "Kitchens, laundries, and complete operational facilities." } }, ["High-spec materials", "Integrated systems", "Rapid deployment", "Minimal maintenance"], { columns: ["Model", "Length", "Weight"], rows: [{ label: "S4-2012", values: ["—", "—"] }] }),
  rdmss: productPage("rdmss", "RDMSS", "The world's most advanced shelter system", { heading: "RDMSS. The world's most advanced shelter system", body: ["Configurable layout with integrated ECU, ducting, and interchangeable doors."], caption: { title: "Modular infrastructure", body: "Configurable to mission scale and operational footprint." } }, ["Configurable layout", "Integrated ECU and ducting", "Operational temperature -50 to +50", "Soft and hard-walled options"], { columns: ["Specification", "1-Section", "2-Section"], rows: [{ label: "Floor area", values: ["—", "—"] }] }),
  "mex-26": productPage("mex-26", "MEX-26", "Aircraft & Vehicle Maintenance System", { heading: "Expeditionary, modular, and built for demanding operations", body: ["Rugged modular facility for rapid deployment in remote environments."], caption: { title: "Reliable performance", body: "Used by Canadian Forces worldwide." } }, ["Modular design", "Pallet-ready", "Rugged aluminum frame", "Fire-retardant fabric", "Two vehicle doors"], { columns: ["Category", "Details"], rows: [{ label: "Standard Width", values: ["26' / 7.9m"] }] }),
  "series-2": productPage("series-2", "Series 2", "Modular, insulated systems for remote and extreme environments", { heading: "Sustained operations in remote and extreme environments", body: ["CH-15 and CH-20 systems offering versatility from -51°C to +49°C."], caption: { title: "Efficient and adaptable", body: "High-strength steel frame with integrated HVAC." } }, ["Extreme climate insulation", "High-strength steel frame", "Integrated HVAC/electrical", "Fast setup and scalability"], { columns: ["Specification", "Series 2", "Series 1.5"], rows: [{ label: "Temperature Range", values: ["-51°C to +49°C", "—"] }] }),
  "airbeam-hp": productPage("airbeam-hp", "Inflatable Airbeam HP", "The ultimate in rapid-deploy inflatable infrastructure.", { heading: "Airbeam HP: Superior Strength, Rapid Deployment, Extreme Reliability", body: ["High-pressure airbeam technology for defense and disaster response."], caption: { title: "High-pressure structural advantage", body: "Proven Weatherhaven engineering." } }, ["High-pressure airbeams", "Rapid deployment", "Integrated HVAC and electrical", "Modular configurations"], { columns: ["Model", "HP 11", "HP 17"], rows: [{ label: "Floor area", values: ["—", "—"] }] }),
  "airbeam-lp": productPage("airbeam-lp", "Inflatable Airbeam LP", "The next generation of rapidly deployable inflatable systems.", { heading: "Airbeam LP: Rapid, Reliable Unit for Critical Field Operations", body: ["Cost-effective, robust shelter for military and humanitarian use."], caption: { title: "Proven field endurance", body: "High-quality materials for extreme environments." } }, ["Rapid inflation/deflation", "Modular design", "Durable materials", "Field repair capabilities"], { columns: ["Model", "LP 5", "LP 7"], rows: [{ label: "Width", values: ["—", "—"] }] }),
  "auxiliary-equipment": hubPage(
    "auxiliary-equipment",
    "Auxiliary Equipment",
    "Comprehensive range of auxiliary equipment for field infrastructure",
    "To ensure fully functional deployments, Weatherhaven provides auxiliary equipment designed to support field infrastructure in demanding environments.",
    [
      { tag: "VESTIBULES", title: "Vestibules, Interconnectors & Corridors", description: "Custom lengths for flexibility.", href: "/products/vestibules", buttonLabel: "FIND OUT MORE" },
      { tag: "SOLARSHADES", title: "Solarshades", description: "UV protection and energy savings.", href: "/products/solarshades", buttonLabel: "FIND OUT MORE" },
      { tag: "ELECTRICAL", title: "Electrical Distribution", description: "Power distribution panels and cabling.", href: "/contact", buttonLabel: "FIND OUT MORE" },
      { tag: "WATER", title: "Water Purification", description: "Integrated water treatment systems.", href: "/contact", buttonLabel: "FIND OUT MORE" },
      { tag: "HVAC", title: "Environmental Control Unit", description: "Heating, ventilation, and air conditioning.", href: "/contact", buttonLabel: "FIND OUT MORE" },
      { tag: "POWER", title: "Power Generation & Distribution", description: "Customized power solutions.", href: "/contact", buttonLabel: "FIND OUT MORE" },
    ]
  ),
  vestibules: productPage("vestibules", "Vestibules, Interconnectors & Corridors", "Seamless connectivity and weather protection across modular systems", { heading: "Designed for efficiency, comfort, and integration", body: ["Essential links between containers and soft-wall systems creating weather-controlled facilities."], caption: { title: "Entry transition", body: "Reduce heat loss and air intrusion." } }, ["Various cover configurations", "Hard or fabric door options", "Insulated or non-insulated", "Floor systems available"], { columns: ["Category", "Details"], rows: [{ label: "Configuration", values: ["Custom lengths"] }] }),
  solarshades: productPage("solarshades", "Solarshades", "Engineered protection from solar radiation and heat gain.", { heading: "Extend the life of your infrastructure", body: ["80%-90% solar blockage reducing heat-related injuries and extending fabric life."], caption: { title: "Lightweight and easy to deploy", body: "Four-person crew setup in ~20 minutes." } }, ["80%-90% solar blockage", "Fire-retardant and UV-resistant", "Multiple color options", "Wind load rated"], { columns: ["Property", "Details"], rows: [{ label: "Solar Blockage", values: ["80%-90%"] }, { label: "Service Life", values: ["8-10 years"] }] }),
};

const solutions = {
  medical: hubPage(
    "medical",
    "Medical",
    "World-Class Care, Anywhere",
    "Our deployable medical infrastructure operates globally on all seven continents.",
    [
      { title: "Field Hospitals", description: "Fully equipped medical facilities for remote environments.", href: "/solutions/medical/field-hospitals", buttonLabel: "READ MORE" },
      { title: "Mobile Clinics", description: "Bring medical care to the field.", href: "/solutions/medical/mobile-clinics", buttonLabel: "READ MORE" },
      { title: "Isolation Facilities", description: "Secure containment for mission readiness.", href: "/solutions/medical/isolation-facilities", buttonLabel: "READ MORE" },
      { title: "Emergency Response", description: "Designed for disasters of any scale.", href: "/solutions/medical/emergency-response", buttonLabel: "READ MORE" },
    ],
    [defaultWhyChoose]
  ),
  "field-hospitals": solutionPage(
    "field-hospitals",
    "Field Hospitals",
    "Fully equipped medical facilities designed to deliver reliable care in remote, austere, or high-pressure environments",
    {
      heading: "Clinical capability, anywhere on Earth",
      body: ["Weatherhaven engineers, manufactures, and installs fully equipped mobile field hospitals from 10 to hundreds of beds."],
      cta: "CONNECT WITH AN EXPERT",
      caption: { title: "Medical Facilities", body: "Level I, II, and III facilities for commercial, military, and emergency response." },
    },
    [
      {
        type: "columns",
        items: [
          { title: "First Aid & Triage Facilities (Level I)", body: ["Doctor's office equivalent for diagnosing and treating patients.", "Reception, examination, and stabilization capabilities."], image: PLACEHOLDER("fh-l1") },
          { title: "Portable Surgical Centres (Level II)", body: ["Temperature-controlled hygienic complex for surgery.", "Interconnected shelters with controlled staff movement."], image: PLACEHOLDER("fh-l2") },
          { title: "Military Field Hospitals (Level III)", body: ["Full-scale hospitals for surgery, resuscitation, and post-op care.", "Includes kitchens, laundry, and staff housing."], image: PLACEHOLDER("fh-l3") },
        ],
      },
      { type: "text", heading: "Mobile Medical Care", body: ["Our Extended Height Mobile Expandable Container Capability adds 4.5 feet of headroom for operating rooms and critical care."] },
    ]
  ),
  "mobile-clinics": solutionPage("mobile-clinics", "Mobile Clinics", "Bring medical care to the field, with modular layouts that adapt quickly to your mission's requirements.", { heading: "Healthcare That Moves With You", body: ["Mobile clinics facilitate medical care for civilians, military, and humanitarian missions in remote areas."], caption: { title: "Configurable units", body: "Adapt quickly to mission requirements." } }),
  "isolation-facilities": solutionPage("isolation-facilities", "Isolation Facilities", "Secure containment that protects people and preserves mission readiness", { heading: "Contain the Risk - Maintain the Mission", body: ["Mobile units for CBRN decontamination and isolation with special liners and air-filtration systems."], cta: "CONSULT WITH AN EXPERT" }),
  "emergency-response": solutionPage("emergency-response", "Emergency Response", "Designed For Disasters Of Any Scale", { heading: "When Every Second Counts, We Deliver", body: ["Following the Haiti earthquake, Weatherhaven deployed field hospitals within 24 hours."] }),
  commercial: hubPage(
    "commercial",
    "Commercial",
    "The ultimate in rapid-deploy inflatable infrastructure",
    "Weatherhaven delivers commercial redeployable infrastructure across mining, energy, and remote workforce sectors globally.",
    [
      { title: "Workforce Housing", description: "Remote camp accommodation.", href: "/solutions/commercial/workforce-housing", buttonLabel: "READ MORE" },
      { title: "Antarctic Climate", description: "Polar research support.", href: "/solutions/commercial/antarctic-climate", buttonLabel: "READ MORE" },
      { title: "Turn-Key Solutions", description: "End-to-end camp delivery.", href: "/solutions/commercial/turnkey-solutions", buttonLabel: "READ MORE" },
      { title: "Luxury Mobile Recreation Units", description: "Premium mobile accommodation.", href: "/solutions/commercial/luxury-units", buttonLabel: "READ MORE" },
    ],
    [
      { type: "cards", heading: "Workshops", items: [
        { title: "Tire Maintenance", description: "Deployable tire workshops.", href: "/solutions/military/tire-maintenance", buttonLabel: "READ MORE" },
        { title: "Vehicle Workshops", description: "Mobile maintenance facilities.", href: "/solutions/military/vehicle-workshops", buttonLabel: "READ MORE" },
        { title: "Aircraft Support", description: "Aviation hangars and support.", href: "/solutions/military/aircraft-support", buttonLabel: "READ MORE" },
      ]},
      defaultWhyChoose,
    ]
  ),
  "workforce-housing": solutionPage("workforce-housing", "Workforce Housing", "Remote workforce accommodation anywhere on Earth", { heading: "No Location Is Too Remote", body: ["Portable infrastructure and modular systems protect your workforce in the most challenging environments."] }),
  "antarctic-climate": solutionPage("antarctic-climate", "Antarctic Climate Research", "Pioneering polar support systems and infrastructure", { heading: "Pioneering Polar support systems and infrastructure", body: ["Decades of support behind polar infrastructure on all seven continents."], cta: "DOWNLOAD BROCHURE" }),
  "turnkey-solutions": solutionPage("turnkey-solutions", "Turnkey Solutions", "From Concept to Camp—We Handle It All", { heading: "From Concept to Camp—We Handle It All", body: ["End-to-end services including design, construction, power, water, and camp infrastructure."] }),
  "luxury-units": solutionPage("luxury-units", "Luxury Mobile Recreation Units", "From Desert Heat to Arctic Cold—Comfort Everywhere", { heading: "From Desert Heat to Arctic Cold—Comfort Everywhere", body: ["Premium mobile units with full amenities for government and military VIP applications."] }),
  military: hubPage(
    "military",
    "Military",
    "Supporting the operator, delivering the mission",
    "Our redeployable turnkey infrastructure has been used by more than 30 international militaries globally.",
    [
      { title: "Military Camps", description: "Redeployable military camps.", href: "/solutions/military/military-camps", buttonLabel: "READ MORE" },
      { title: "Field Hospitals", description: "Mobile medical facilities.", href: "/solutions/medical/field-hospitals", buttonLabel: "READ MORE" },
      { title: "Deployable 3D Printing", description: "Field additive manufacturing.", href: "/solutions/military/deployable-3d-printing", buttonLabel: "READ MORE" },
      { title: "Command Posts", description: "Tactical command centres.", href: "/solutions/military/command-posts", buttonLabel: "READ MORE" },
      { title: "Ground Stations", description: "Satellite ground stations.", href: "/solutions/military/ground-stations", buttonLabel: "READ MORE" },
      { title: "Field Kitchens and Dining", description: "Redeployable kitchens.", href: "/solutions/military/field-kitchens", buttonLabel: "READ MORE" },
    ],
    [
      { type: "cards", heading: "Workshops", items: [
        { title: "Vehicle Workshops", description: "Fleet maintenance anywhere.", href: "/solutions/military/vehicle-workshops", buttonLabel: "READ MORE" },
        { title: "Aircraft Support", description: "Deployable aviation hangars.", href: "/solutions/military/aircraft-support", buttonLabel: "READ MORE" },
      ]},
      defaultWhyChoose,
    ]
  ),
  "military-camps": solutionPage("military-camps", "Military Camps", "Redeployable military camps built for global missions", { heading: "Deploy faster, operate stronger with Weatherhaven camps", body: ["40 years of turnkey military camp solutions including power, water, and kitchens."] }),
  "command-posts": solutionPage("command-posts", "Command Posts", "Supporting the warfighter with the latest in Command Post technology", { heading: "The best in Command Post technology", body: ["Modular command post systems with clean-on spaces and integrated mission technologies."] }),
  "ground-stations": solutionPage("ground-stations", "Ground Stations", "Precision ground stations for a connected planet.", { heading: "Connecting Earth to Orbit — Anywhere", body: ["Reliable redeployable infrastructure for satellite communication and TT&C operations."] }),
  "field-kitchens": solutionPage("field-kitchens", "Field Kitchens and Dining", "Redeployable kitchens bringing cooked meals to remote missions worldwide.", { heading: "Quality food on deployed operations", body: ["From tactical galleys to facilities feeding 1,000 personnel."] }),
  "vehicle-workshops": solutionPage("vehicle-workshops", "Vehicle Workshops", "Keeping your fleet moving, anywhere in the world", { heading: "Take your workshop anywhere in the world", body: ["Redeployable vehicle maintenance for military and commercial fleets."] }),
  "aircraft-support": solutionPage("aircraft-support", "Aircraft Support", "Rapid-deploy aviation hangars built for global operations and mission success", { heading: "Aircraft hangars. Deployed fast. Mission ready.", body: ["Decades of experience delivering deployable aviation infrastructure across seven continents."] }),
  "tire-maintenance": solutionPage("tire-maintenance", "Tire Maintenance", "Deployable tire workshops boosting readiness anywhere, anytime, with ease", { heading: "Rapid tyre maintenance anywhere in the world", body: ["MECC-based deployable tire maintenance with storage-rotation capability."] }),
  "deployable-3d-printing": solutionPage("deployable-3d-printing", "Redeployable 3D Printing", "Deliver your additive manufacturing straight to your area of operation", { heading: "Additive manufacturing, where you need it", body: ["Field-deployed 3D printing with integrated electrical, HVAC, and furniture."] }),
  services: hubPage(
    "services",
    "Services",
    "Fully Integrated Service & Support",
    "To complement our portable units and systems, we offer value-added services that support your unique field requirements.",
    [
      { title: "Engineering & Design", description: "Custom product development.", href: "/solutions/services/engineering-design", buttonLabel: "READ MORE" },
      { title: "Transportation and Logistics", description: "Built for intermodal transport.", href: "/solutions/services/transportation-logistics", buttonLabel: "READ MORE" },
      { title: "Installation & Dismantling", description: "Effortless install and dismantle.", href: "/solutions/services/installation-dismantling", buttonLabel: "READ MORE" },
      { title: "Repair and Overhaul", description: "Maintaining deployable capability.", href: "/solutions/services/repair-overhaul", buttonLabel: "READ MORE" },
      { title: "Training & In-Service Support", description: "Complete customized support.", href: "/solutions/services/training-support", buttonLabel: "READ MORE" },
      { title: "Parts", description: "Repair parts and spare packages.", href: "/solutions/services/parts", buttonLabel: "READ MORE" },
    ],
    [defaultWhyChoose]
  ),
  "engineering-design": solutionPage("engineering-design", "Engineering & Design", "Customized to suit your unique needs", { heading: "Engineering & Design", body: ["From portable units to integrated turnkey camps with product configurations, drawings, and interoperability analysis."] }),
  "transportation-logistics": solutionPage("transportation-logistics", "Transportation and Logistics", "Built For Intermodal Transportation", { heading: "Transportation and Logistics", body: ["International shipping experience with cost-effective packaging for fabric camps and expandable containers."] }),
  "installation-dismantling": solutionPage("installation-dismantling", "Installation & Dismantling", "Effortless Install & Dismantle", { heading: "Installation & Dismantling", body: ["Expert installation crews ensure your deployment goes smoothly from start to finish."] }),
  "repair-overhaul": solutionPage("repair-overhaul", "Repair and Overhaul", "Maintaining Your Deployable Capability", { heading: "Repair and Overhaul", body: ["Complete repair, overhaul, modification, and upgrade services for mobile systems."] }),
  "training-support": solutionPage("training-support", "Training & In-Service Support", "Complete, Customized Support", { heading: "Training & In-Service Support", body: ["Custom training packages including Train the Trainer and Field Service Representative programs."] }),
  parts: solutionPage("parts", "Parts", "Request Additional Parts", { heading: "Parts", body: ["Weatherhaven supplies repair parts and complete spare parts packages for all product lines."] }),
};

function regionPage(slug, title, projects) {
  return {
    slug,
    template: "projects-region",
    meta: { title: `${title} Projects | Weatherhaven`, description: `Weatherhaven projects in ${title}.` },
    hero: { title, variant: "region", region: slug },
    showContactForm: true,
    sections: [
      { type: "cards", items: projects },
      { type: "text", heading: "FIND OUT MORE", body: "These projects represent just a selection of our worldwide deployments. Contact us to discuss your specific requirements." },
    ],
  };
}

const projects = {
  index: {
    slug: "index",
    template: "hub",
    meta: { title: "Projects | Weatherhaven", description: "Global deployments across 95+ countries." },
    hero: { title: "Projects", subtitle: "Deployed to more than 95 countries across all 7 continents", image: PLACEHOLDER("projects"), variant: "image" },
    showContactForm: true,
    sections: [
      { type: "cta-bar", body: "Founded in 1981, Weatherhaven has deployed its products to more than 95 countries across all 7 continents.", cta: { label: "GET IN TOUCH", href: "/contact" } },
      { type: "text", heading: "Proven expertise in mobile, redeployable systems and integrated camps", body: "Backed by decades of innovation and real-world experience, we deliver mission-ready solutions tailored to the unique needs of every environment." },
      {
        type: "cards",
        heading: "Browse by continent",
        columns: 2,
        items: [
          { title: "Africa", description: "", href: "/projects/africa", buttonLabel: "READ MORE", image: PLACEHOLDER("africa-map") },
          { title: "Antarctica", description: "", href: "/projects/antarctica", buttonLabel: "READ MORE", image: PLACEHOLDER("antarctica-map") },
          { title: "Asia", description: "", href: "/projects/asia", buttonLabel: "READ MORE", image: PLACEHOLDER("asia-map") },
          { title: "Australia", description: "", href: "/projects/australia", buttonLabel: "READ MORE", image: PLACEHOLDER("australia-map") },
          { title: "Europe", description: "", href: "/projects/europe", buttonLabel: "READ MORE", image: PLACEHOLDER("europe-map") },
          { title: "North America", description: "", href: "/projects/north-america", buttonLabel: "READ MORE", image: PLACEHOLDER("north-america-map") },
          { title: "South America", description: "", href: "/projects/south-america", buttonLabel: "READ MORE", image: PLACEHOLDER("south-america-map") },
        ],
      },
    ],
  },
  africa: regionPage("africa", "Africa", [
    { tag: "GHANA", title: "200-Bed Ebola Medical Hospital", description: "Complete field hospital deployment for emergency medical response.", image: PLACEHOLDER("ghana") },
    { tag: "SOUTH AFRICA", title: "South African National Defence Force", description: "Modular container systems for military operations.", image: PLACEHOLDER("sa") },
    { tag: "MALI", title: "Standalone medical hangar infrastructure", description: "Medical hangar for remote operations.", image: PLACEHOLDER("mali") },
    { tag: "BURUNDI", title: "Burundi Turnkey Camp", description: "Complete turnkey camp deployment.", image: PLACEHOLDER("burundi") },
  ]),
  antarctica: regionPage("antarctica", "Antarctica", [
    { tag: "ANTARCTIC", title: "Chinese Army – Kunlun Station and Taishan Station", description: "Polar camp systems for research stations.", image: PLACEHOLDER("kunlun") },
    { tag: "ANTARCTIC", title: "Beyond EPICA Climate Research Program", description: "Climate research facility in Antarctica.", image: PLACEHOLDER("epica") },
    { tag: "ANTARCTIC", title: "British Antarctic Survey", description: "Tracked vehicle shelter systems.", image: PLACEHOLDER("bas") },
  ]),
  asia: regionPage("asia", "Asia", [
    { tag: "UAE", title: "50-Bed Simulation Hospital", description: "Desert encampment medical simulation facility.", image: PLACEHOLDER("uae") },
    { tag: "JAPAN", title: "Redeployable Helicopter Camp", description: "Modular camp for helicopter operations.", image: PLACEHOLDER("japan") },
    { tag: "MONGOLIA", title: "Oyu Tolgoi Remote Workforce Camp", description: "Large-scale remote mining camp.", image: PLACEHOLDER("mongolia") },
  ]),
  australia: regionPage("australia", "Australia", [
    { tag: "AUSTRALIA", title: "Australian Department of National Defence", description: "Multiple shelter deployments for ADF.", image: PLACEHOLDER("adf") },
    { tag: "AUSTRALIA", title: "AIR 67 Super Hornet Command and Control", description: "MECC command and control unit.", image: PLACEHOLDER("air67") },
  ]),
  europe: regionPage("europe", "Europe", [
    { tag: "GREENLAND", title: "Infrastructure Project, Series 4 Mobile Camp", description: "Arctic mobile camp for infrastructure repair.", image: PLACEHOLDER("greenland") },
    { tag: "UKRAINE", title: "Armed Forces of Ukraine", description: "50-bed field hospital system.", image: PLACEHOLDER("ukraine") },
    { tag: "NETHERLANDS", title: "Role 2 MTF - Netherlands Project", description: "Expandable medical configuration.", image: PLACEHOLDER("netherlands") },
  ]),
  "north-america": regionPage("north-america", "North America", [
    { tag: "CANADA", title: "Government of Canada (HQSS)", description: "Headquarters Shelter System for Canadian Forces.", image: PLACEHOLDER("hqss") },
    { tag: "CANADA", title: "Government of Canada (MSVS)", description: "Medium Support Vehicle System shelters.", image: PLACEHOLDER("msvs") },
    { tag: "USA", title: "First-ever Additive Manufacturing", description: "Deployable 3D printing facility.", image: PLACEHOLDER("usa-am") },
  ]),
  "south-america": regionPage("south-america", "South America", [
    { tag: "BRAZIL", title: "Brazilian Army", description: "Field hospital for Brazilian Army.", image: PLACEHOLDER("brazil") },
    { tag: "CHILE", title: "Chilean Ministry of Health", description: "Modular hospital complexes.", image: PLACEHOLDER("chile") },
    { tag: "PERU", title: "Quellaveco Mine Turnkey Camp", description: "Large-scale mining camp.", image: PLACEHOLDER("peru") },
  ]),
};

const innovations = {
  index: {
    slug: "index",
    template: "hub",
    meta: { title: "Innovations | Weatherhaven", description: "Weatherhaven innovative redeployable solutions." },
    hero: { title: "Innovations", subtitle: "Expertly engineered for commercial, medical, and military applications", variant: "navy" },
    showContactForm: true,
    sections: [
      { type: "cta-bar", body: "Weatherhaven's innovative redeployable solutions are expertly engineered for a range of commercial, medical, and military applications.", cta: { label: "GET IN TOUCH", href: "/contact" } },
      {
        type: "cards",
        heading: "Innovative solutions",
        columns: 3,
        items: [
          { title: "World class engineering team", href: "/innovations/engineering-team", buttonLabel: "READ MORE", image: PLACEHOLDER("eng-team") },
          { title: "Patents", href: "/innovations/patents", buttonLabel: "READ MORE", image: PLACEHOLDER("patents") },
          { title: "Designed for Speed and Mobility", href: "/innovations/speed-mobility", buttonLabel: "READ MORE", image: PLACEHOLDER("speed") },
          { title: "Advanced tactical deployable system", href: "/innovations/tactical-deployable", buttonLabel: "READ MORE", image: PLACEHOLDER("tactical") },
          { title: "Expandable Portable Space", href: "/innovations/expandable-space", buttonLabel: "READ MORE", image: PLACEHOLDER("expandable") },
          { title: "Extended Height Mobile Expandable Container", href: "/innovations/extended-height", buttonLabel: "READ MORE", image: PLACEHOLDER("extended") },
          { title: "Energy Efficiency", href: "/innovations/energy-efficiency", buttonLabel: "READ MORE", image: PLACEHOLDER("energy") },
          { title: "Environmental Impact of Solar Shades", href: "/innovations/solar-shades", buttonLabel: "READ MORE", image: PLACEHOLDER("solar-impact") },
          { title: "Extreme Climate and logistics", href: "/innovations/extreme-climate", buttonLabel: "READ MORE", image: PLACEHOLDER("extreme") },
        ],
      },
    ],
  },
  "engineering-team": { slug: "engineering-team", template: "static", meta: { title: "Engineering Team | Weatherhaven", description: "World class engineering team." }, hero: { title: "World class engineering team", variant: "image", image: PLACEHOLDER("eng-team") }, showContactForm: true, sections: [{ type: "intro", heading: "World class engineering team", body: ["Weatherhaven's world class engineering team has been recognized for innovation and capability.", "They are the backbone behind our 51 patents and next-generation system solutions."], cta: { label: "CONNECT WITH AN EXPERT", href: "/contact" } }] },
  patents: { slug: "patents", template: "static", meta: { title: "Patents | Weatherhaven", description: "51 patents in 30 countries." }, hero: { title: "Patents", subtitle: "51 patents in 30 countries", variant: "image", image: PLACEHOLDER("patents") }, showContactForm: true, sections: [{ type: "intro", heading: "Patents", body: ["Weatherhaven's record of securing patents in North America, Europe and more than 30 countries is testament to the company's innovation capabilities."], cta: { label: "CONNECT WITH AN EXPERT", href: "/contact" }, image: PLACEHOLDER("patent-doc") }] },
  "speed-mobility": { slug: "speed-mobility", template: "static", meta: { title: "Speed and Mobility | Weatherhaven", description: "Designed for speed and mobility." }, hero: { title: "Designed for Speed and Mobility", variant: "image", image: PLACEHOLDER("speed") }, showContactForm: true, sections: [{ type: "intro", heading: "Designed for Speed and Mobility", body: ["Rapid deployability and re-deployability for containerized units, soft-wall tents, and hybrid solutions."], cta: { label: "CONNECT WITH AN EXPERT", href: "/contact" }, image: PLACEHOLDER("trecc-deploy") }] },
  "tactical-deployable": { slug: "tactical-deployable", template: "static", meta: { title: "Tactical Deployable | Weatherhaven", description: "Advanced tactical deployable systems." }, hero: { title: "Advanced tactical deployable system", variant: "image", image: PLACEHOLDER("tactical") }, showContactForm: true, sections: [{ type: "text", body: "Advanced tactical deployable systems engineered for military operations in the most demanding environments." }] },
  "expandable-space": { slug: "expandable-space", template: "static", meta: { title: "Expandable Portable Space | Weatherhaven", description: "Expandable portable space solutions." }, hero: { title: "Expandable Portable Space", variant: "image", image: PLACEHOLDER("expandable") }, showContactForm: true, sections: [{ type: "text", body: "Expandable container and shelter systems that maximize usable space while minimizing transport footprint." }] },
  "extended-height": { slug: "extended-height", template: "static", meta: { title: "Extended Height MECC | Weatherhaven", description: "Extended height expandable containers." }, hero: { title: "Extended Height Mobile Expandable Container", variant: "image", image: PLACEHOLDER("extended") }, showContactForm: true, sections: [{ type: "text", body: "EHMECC technology adds unprecedented internal height to standard 20' expandable containers." }] },
  "energy-efficiency": { slug: "energy-efficiency", template: "static", meta: { title: "Energy Efficiency | Weatherhaven", description: "Energy efficient shelter systems." }, hero: { title: "Energy Efficiency", variant: "image", image: PLACEHOLDER("energy") }, showContactForm: true, sections: [{ type: "text", body: "Integrated solar power and energy-efficient designs reduce operational costs in remote deployments." }] },
  "solar-shades": { slug: "solar-shades", template: "static", meta: { title: "Solar Shades | Weatherhaven", description: "Environmental impact of solar shades." }, hero: { title: "Environmental Impact of Solar Shades", variant: "image", image: PLACEHOLDER("solar-impact") }, showContactForm: true, sections: [{ type: "text", body: "Solarshades reduce energy consumption and extend the life of shelter fabric in hot climates." }] },
  "extreme-climate": { slug: "extreme-climate", template: "static", meta: { title: "Extreme Climate | Weatherhaven", description: "Extreme climate and logistics." }, hero: { title: "Extreme Climate and logistics", variant: "image", image: PLACEHOLDER("extreme") }, showContactForm: true, sections: [{ type: "text", body: "Solutions engineered for operation from -50°C to +50°C with optimized logistics for remote delivery." }] },
};

const pages = {
  home: {
    slug: "home",
    template: "homepage",
    meta: {
      title: "Weatherhaven | Redeployable Infrastructure & Shelter Systems",
      description: "World leader in redeployable infrastructure and camp solutions for military, medical, and commercial operations.",
    },
    hero: { title: "Weatherhaven", subtitle: "World leader in redeployable infrastructure", variant: "image", image: PLACEHOLDER("home-hero") },
    showContactForm: false,
    sections: [
      {
        type: "hero-collage",
        images: Array.from({ length: 8 }, (_, i) => PLACEHOLDER(`collage-${i}`)),
        body: "Weatherhaven is a world leader in redeployable infrastructure, delivering turnkey shelter and camp solutions to military, medical, and commercial clients across all seven continents.",
        cta: { label: "GET IN TOUCH", href: "/contact" },
      },
      {
        type: "carousel",
        items: [
          { title: "Workforce Housing", description: "Remote camp accommodation for mining and energy.", href: "/solutions/commercial/workforce-housing", image: PLACEHOLDER("carousel-wh") },
          { title: "Antarctic Climate", description: "Polar research infrastructure.", href: "/solutions/commercial/antarctic-climate", image: PLACEHOLDER("carousel-ant") },
          { title: "Military Camps", description: "Turnkey military camp solutions.", href: "/solutions/military/military-camps", image: PLACEHOLDER("carousel-mil") },
          { title: "Field Hospitals", description: "Mobile medical facilities.", href: "/solutions/medical/field-hospitals", image: PLACEHOLDER("carousel-fh") },
        ],
      },
      {
        type: "split-banner",
        title: "Mobile Healthcare",
        description: "Complete mobile medical infrastructure for humanitarian relief, military operations, and emergency response worldwide.",
        image: PLACEHOLDER("mobile-healthcare"),
        buttons: [{ label: "CONTACT US", href: "/contact" }, { label: "HEALTHCARE SOLUTIONS", href: "/solutions/medical" }],
      },
      defaultWhyChoose,
      {
        type: "split-banner",
        title: "TRECC",
        description: "Tactical Redeployable Expanding Container Capability — trailer-mounted, deployed in under 30 minutes.",
        image: PLACEHOLDER("trecc-banner"),
        buttons: [{ label: "CONTACT US", href: "/contact" }, { label: "READ MORE", href: "/products/trecc" }],
        reversed: true,
      },
      {
        type: "news-feature",
        featured: {
          title: "MECC-Based Additive Manufacturing Facility Delivered to US",
          description: "Weatherhaven delivers cutting-edge deployable manufacturing capability.",
          href: "/news/additive-manufacturing-us",
          image: PLACEHOLDER("news-featured"),
        },
        items: [
          { title: "Jessica Au Appointed Weatherhaven Group CFO", description: "September 2024", href: "/news/jessica-au-cfo", image: PLACEHOLDER("news-1") },
          { title: "Weatherhaven Backs Future Talent", description: "Supporting next generation engineers.", href: "/news", image: PLACEHOLDER("news-2") },
          { title: "Weatherhaven and Compotech announce partnership", description: "Strategic partnership announcement.", href: "/news", image: PLACEHOLDER("news-3") },
        ],
      },
      {
        type: "team-cta",
        title: "We're committed to finding the right solution for you",
        body: "Our expert team is ready to discuss your project requirements and deliver a turnkey solution tailored to your mission.",
        image: PLACEHOLDER("team"),
        cta: { label: "GET IN TOUCH WITH AN EXPERT", href: "/contact" },
      },
    ],
  },
  about: {
    slug: "about",
    template: "static",
    meta: { title: "About Us | Weatherhaven", description: "Global leader in redeployable infrastructure since 1981." },
    hero: { title: "About Us", subtitle: "Global leader in redeployable infrastructure", variant: "image", image: PLACEHOLDER("about-hero") },
    showContactForm: true,
    sections: [
      { type: "text", heading: "About Us", body: ["Weatherhaven is a global leader in redeployable infrastructure for military, medical, and commercial operations.", "Vision: To be the world's most trusted provider of portable infrastructure.", "Mission: To design, manufacture and deliver the world's most advanced redeployable infrastructure."] },
      { type: "text", body: "Founded in 1981 in BC, Canada, Weatherhaven has expanded into global markets and maintains ISO 9001:2015 registration." },
      {
        type: "team",
        heading: "Executive Team",
        members: [
          { name: "Ray Castelli", title: "CEO" },
          { name: "Jessica Au", title: "CFO" },
          { name: "James Kirk", title: "COO" },
        ],
      },
      {
        type: "values",
        heading: "Our Values",
        items: [
          { title: "Reliability", description: "Delivering on time and on budget.", image: PLACEHOLDER("value-rel") },
          { title: "Quality", description: "High engineering standards in everything we build.", image: PLACEHOLDER("value-qual") },
          { title: "Environment", description: "Sustainable, low-impact solutions.", image: PLACEHOLDER("value-env") },
        ],
      },
      { type: "cards", heading: "Latest group news", items: [
        { title: "Weatherhaven Backs Future Talent", href: "/news", buttonLabel: "VIEW MORE" },
        { title: "Jessica Au Appointed CFO", href: "/news/jessica-au-cfo", buttonLabel: "VIEW MORE" },
        { title: "Weatherhaven and Compotech partnership", href: "/news", buttonLabel: "VIEW MORE" },
      ]},
    ],
  },
  timeline: {
    slug: "timeline",
    template: "static",
    meta: { title: "Timeline | Weatherhaven", description: "Weatherhaven company history since 1981." },
    hero: { title: "Timeline", subtitle: "Four decades of innovation and deployment", variant: "image", image: PLACEHOLDER("timeline-hero") },
    showContactForm: true,
    sections: [{
      type: "timeline",
      items: [
        { year: "1981", title: "BEGIN OPERATIONS", description: "Serving expedition and mining sectors.", image: PLACEHOLDER("tl-1981") },
        { year: "1981", title: "FIRST CANADIAN MILITARY CONTRACT", description: "HERC-20 system for Canadian Forces.", image: PLACEHOLDER("tl-1981m") },
        { year: "1983", title: "FIRST CAMP IN ANTARCTICA", description: "Research and expeditionary missions.", image: PLACEHOLDER("tl-1983") },
        { year: "1984", title: "FIRST UNITED NATIONS CONTRACT", description: "UN Peacekeeping suitability.", image: PLACEHOLDER("tl-1984") },
        { year: "1985", title: "FIRST MECC UNITS", description: "Mobile Expandable Container Clinic introduced.", image: PLACEHOLDER("tl-1985") },
        { year: "2008", title: "RAY CASTELLI APPOINTED CEO", description: "Leadership transition.", image: PLACEHOLDER("tl-2008") },
        { year: "2016", title: "TRECC PATENT FILED", description: "Tactical Rapid Expandable Container Clinic.", image: PLACEHOLDER("tl-2016") },
        { year: "2020", title: "COVID-19 PANDEMIC RESPONSE", description: "Delivered over 400 shelters.", image: PLACEHOLDER("tl-2020") },
      ],
    }],
  },
  "supplier-information": {
    slug: "supplier-information",
    template: "static",
    meta: { title: "Supplier Information | Weatherhaven", description: "Information for Weatherhaven suppliers." },
    hero: { title: "Supplier Information", variant: "image", image: PLACEHOLDER("supplier") },
    showContactForm: true,
    sections: [
      { type: "text", heading: "About Weatherhaven", body: ["Leading manufacturer of portable shelter systems since 1981 with global presence and collaborative supplier relationships."] },
      { type: "text", heading: "Weatherhaven Values", body: "Integrity, honesty, excellence, and sustainability guide our supplier partnerships." },
      { type: "text", heading: "Working With Weatherhaven", body: ["Commodities include mechanical components, electrical components, sheet metal fabrication, fabric manufacturing, and packaging.", "Apply via purchasing@weatherhaven.com"] },
    ],
  },
  anniversary: {
    slug: "anniversary",
    template: "static",
    meta: { title: "45th Anniversary | Weatherhaven", description: "Celebrating 45 years of Weatherhaven." },
    hero: { title: "45TH ANNIVERSARY", subtitle: "Celebrating 45 years of providing bespoke solutions and cutting-edge technology", variant: "image", image: PLACEHOLDER("anniversary") },
    showContactForm: true,
    sections: [
      { type: "text", heading: "Our 40th Anniversary Book", body: ["Celebrating our global reach across 95+ countries, 52 patents, and deployments in peacekeeping, medical relief, and commercial sectors.", "— Ray Castelli, CEO"] },
      { type: "intro", heading: "DOWNLOAD HERE", body: "Click below to download a high resolution PDF file or an e-book file", cta: { label: "PDF FILE", href: "/contact" } },
    ],
  },
  contact: {
    slug: "contact",
    template: "static",
    meta: { title: "Contact | Weatherhaven", description: "Contact Weatherhaven for redeployable infrastructure solutions." },
    hero: { title: "Contact Us", subtitle: "Get in touch with our expert team", variant: "image", image: PLACEHOLDER("contact") },
    showContactForm: true,
    sections: [{ type: "text", body: "Contact us for more information on our redeployable infrastructure solutions." }],
  },
};

const news = {
  "jessica-au-cfo": {
    slug: "jessica-au-cfo",
    template: "news",
    meta: { title: "Jessica Au Appointed CFO | Weatherhaven", description: "Jessica Au appointed Chief Financial Officer." },
    hero: { title: "Jessica Au Appointed Weatherhaven Group CFO", subtitle: "Weatherhaven is pleased to announce the appointment of Jessica Au as Chief Financial Officer.", variant: "split", image: PLACEHOLDER("jessica-au") },
    showContactForm: false,
    sections: [{
      type: "article",
      date: "September 2024",
      body: [
        "Weatherhaven is pleased to announce that Jessica Au has been appointed Chief Financial Officer of Weatherhaven Global Resources Ltd.",
        "Jessica joined Weatherhaven in 2018 and has served in progressively senior finance roles. Prior to Weatherhaven, she was with PwC and holds a degree from the University of British Columbia.",
      ],
      sidebar: { name: "James Kirk", title: "Chief Operating Officer", bio: "17 years of experience as a Mechanical Engineer leading global operations.", image: PLACEHOLDER("james-kirk") },
    }],
  },
  "white-wolf-acquisition": {
    slug: "white-wolf-acquisition",
    template: "news",
    meta: { title: "Weatherhaven acquired by White Wolf Capital", description: "Acquisition announcement." },
    hero: { title: "Weatherhaven acquired by White Wolf Capital", subtitle: "Strategic acquisition to accelerate growth.", variant: "split", image: PLACEHOLDER("acquisition") },
    showContactForm: false,
    sections: [{
      type: "article",
      date: "September 15, 2021",
      body: [
        "Weatherhaven Global Resources Ltd. has been acquired by White Wolf Capital Group.",
        "The acquisition will enable Weatherhaven to expand its product portfolio and global reach while maintaining its commitment to innovation in redeployable infrastructure.",
      ],
      sidebar: { name: "James Kirk", title: "Chief Operating Officer", bio: "17 years of experience leading Weatherhaven operations.", image: PLACEHOLDER("james-kirk") },
    }],
  },
  "additive-manufacturing-us": {
    slug: "additive-manufacturing-us",
    template: "news",
    meta: { title: "MECC-Based Additive Manufacturing Facility | Weatherhaven", description: "US additive manufacturing facility delivery." },
    hero: { title: "MECC-Based Additive Manufacturing Facility Delivered to US", variant: "split", image: PLACEHOLDER("am-facility") },
    showContactForm: false,
    sections: [{ type: "article", date: "2024", body: ["Weatherhaven delivered a MECC-based additive manufacturing facility to support US military operations."] }],
  },
  index: {
    slug: "index",
    template: "hub",
    meta: { title: "News | Weatherhaven", description: "Latest news from Weatherhaven." },
    hero: { title: "News", subtitle: "Latest updates from Weatherhaven", variant: "navy" },
    showContactForm: true,
    sections: [{
      type: "cards",
      items: [
        { title: "Jessica Au Appointed Weatherhaven Group CFO", href: "/news/jessica-au-cfo", buttonLabel: "READ MORE", image: PLACEHOLDER("jessica-au") },
        { title: "Weatherhaven acquired by White Wolf Capital", href: "/news/white-wolf-acquisition", buttonLabel: "READ MORE", image: PLACEHOLDER("acquisition") },
        { title: "MECC-Based Additive Manufacturing Facility Delivered to US", href: "/news/additive-manufacturing-us", buttonLabel: "READ MORE", image: PLACEHOLDER("am-facility") },
      ],
    }],
  },
};

const navigation = {
  main: [
    {
      label: "ABOUT",
      href: "/about",
      children: [
        { label: "About Us", href: "/about" },
        { label: "Timeline", href: "/about/timeline" },
        { label: "Supplier Information", href: "/about/supplier-information" },
        { label: "45th Anniversary", href: "/about/anniversary" },
      ],
    },
    {
      label: "PRODUCTS",
      href: "/products/containerized-solutions",
      children: [
        { label: "Containerized Solutions", href: "/products/containerized-solutions" },
        { label: "Softwall", href: "/products/softwall" },
        { label: "Auxiliary Equipment", href: "/products/auxiliary-equipment" },
      ],
    },
    {
      label: "SOLUTIONS & APPLICATIONS",
      href: "/solutions/medical",
      children: [
        { label: "Medical", href: "/solutions/medical" },
        { label: "Commercial", href: "/solutions/commercial" },
        { label: "Military", href: "/solutions/military" },
        { label: "Services", href: "/solutions/services" },
      ],
    },
    { label: "PROJECTS", href: "/projects" },
    { label: "INNOVATIONS", href: "/innovations" },
  ],
  footer: {
    legal: [
      { label: "GDPR STATEMENT", href: "/about" },
      { label: "COOKIE POLICY", href: "/about" },
      { label: "ABOUT", href: "/about" },
      { label: "SUPPLIER INFORMATION", href: "/about/supplier-information" },
      { label: "T&C OF PURCHASE", href: "/about" },
      { label: "T&C OF SALE", href: "/about" },
      { label: "CORPORATE SOCIAL RESPONSIBILITY", href: "/about" },
      { label: "CONTACT", href: "/contact" },
    ],
  },
};

const site = {
  name: "Weatherhaven",
  phone: "1-604-451-8900",
  email: "info@weatherhaven.com",
  address: "#130-8610 Glenlyon Parkway, Burnaby, BC, Canada, V5J 0B6",
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/company/weatherhaven" },
    { label: "YouTube", href: "https://youtube.com" },
    { label: "Facebook", href: "https://facebook.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ],
  markets: ["Military", "Medical", "Commercial", "Mining", "Energy", "Government", "Other"],
};

function writeJson(dir, name, data) {
  const p = path.join(contentDir, dir);
  fs.mkdirSync(p, { recursive: true });
  fs.writeFileSync(path.join(p, `${name}.json`), JSON.stringify(data, null, 2));
}

fs.mkdirSync(contentDir, { recursive: true });
writeJson("", "navigation", navigation);
writeJson("", "site", site);
writeJson("pages", "home", pages.home);
writeJson("pages", "about", pages.about);
writeJson("pages", "timeline", pages.timeline);
writeJson("pages", "supplier-information", pages["supplier-information"]);
writeJson("pages", "anniversary", pages.anniversary);
writeJson("pages", "contact", pages.contact);

Object.entries(products).forEach(([k, v]) => writeJson("products", k, v));

Object.entries(solutions).forEach(([k, v]) => {
  if (k === "medical" || k === "commercial" || k === "military" || k === "services") {
    writeJson(`solutions/${k}`, "index", v);
  } else if (["field-hospitals", "mobile-clinics", "isolation-facilities", "emergency-response"].includes(k)) {
    writeJson("solutions/medical", k, v);
  } else if (["workforce-housing", "antarctic-climate", "turnkey-solutions", "luxury-units"].includes(k)) {
    writeJson("solutions/commercial", k, v);
  } else if (
    [
      "military-camps",
      "command-posts",
      "ground-stations",
      "field-kitchens",
      "vehicle-workshops",
      "aircraft-support",
      "tire-maintenance",
      "deployable-3d-printing",
    ].includes(k)
  ) {
    writeJson("solutions/military", k, v);
  } else {
    writeJson("solutions/services", k, v);
  }
});

Object.entries(projects).forEach(([k, v]) => writeJson("projects", k, v));
Object.entries(innovations).forEach(([k, v]) => writeJson("innovations", k, v));
Object.entries(news).forEach(([k, v]) => writeJson("news", k, v));

// Placeholder SVGs
const placeholderDir = path.join(root, "public/images/placeholders");
fs.mkdirSync(placeholderDir, { recursive: true });
const allSlugs = new Set();
function collectSlugs(obj) {
  JSON.stringify(obj, (_, v) => {
    if (typeof v === "string" && v.startsWith("/images/placeholders/")) {
      allSlugs.add(v.replace("/images/placeholders/", "").replace(".svg", ""));
    }
    return v;
  });
}
[pages, products, solutions, projects, innovations, news].forEach(collectSlugs);
allSlugs.forEach((slug) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675"><rect fill="#0a1f44" width="1200" height="675"/><text x="600" y="338" fill="#f39200" font-family="Arial,sans-serif" font-size="28" text-anchor="middle">${slug.replace(/-/g, " ")}</text></svg>`;
  fs.writeFileSync(path.join(placeholderDir, `${slug}.svg`), svg);
});

console.log("Generated content for", allSlugs.size, "placeholders");
