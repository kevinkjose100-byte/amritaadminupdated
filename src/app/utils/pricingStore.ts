export interface PricingGroup {
  id: string;
  name: string;
  currency: string;
  currencySymbol: string;
  multiple: number; // Markup multiplier relative to India base in INR
  status: "active" | "draft";
  countries: string[];
  lastUpdated: string;
}

export const CURRENCY_MAP: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  SGD: "S$",
  AED: "د.إ",
  AUD: "A$",
  CAD: "C$",
  JPY: "¥"
};

// Automatic Exchange Rates relative to INR (Amount of currency per 1 INR)
export const EXCHANGE_RATES: Record<string, number> = {
  INR: 1.0,
  USD: 0.012,    // 1 USD ≈ 83.33 INR
  EUR: 0.011,    // 1 EUR ≈ 90.91 INR
  GBP: 0.0092,   // 1 GBP ≈ 108.70 INR
  SGD: 0.016,    // 1 SGD ≈ 62.50 INR
  AED: 0.044,    // 1 AED ≈ 22.73 INR
  AUD: 0.018,    // 1 AUD ≈ 55.56 INR
  CAD: 0.016,    // 1 CAD ≈ 62.50 INR
  JPY: 1.90      // 1 JPY ≈ 0.53 INR
};

// Centralized price conversion helper
export function convertPrice(baseInrPrice: number, multiple: number, currency: string): number {
  const rate = EXCHANGE_RATES[currency] || 0.012; // Fallback to USD rate if unknown
  const converted = baseInrPrice * multiple * rate;
  if (currency === "INR") {
    return Math.round(converted);
  } else {
    // Round to 2 decimal places
    return Math.round(converted * 100) / 100;
  }
}

export const AVAILABLE_COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Canada",
  "Australia",
  "Singapore",
  "United Arab Emirates",
  "Japan",
  "Brazil",
  "Mexico",
  "Saudi Arabia",
  "South Africa",
  "Malaysia",
  "Thailand",
  "Indonesia",
  "Netherlands",
  "Switzerland",
  "Sweden",
  "New Zealand",
  "Spain",
  "Ireland",
  "Belgium",
  "Austria"
];

export const DEFAULT_PRICING_GROUPS: PricingGroup[] = [
  {
    id: "india",
    name: "India",
    currency: "INR",
    currencySymbol: "₹",
    multiple: 1.0,
    status: "active",
    countries: ["India"],
    lastUpdated: "2026-05-21"
  },
  {
    id: "row",
    name: "Rest of World",
    currency: "USD",
    currencySymbol: "$",
    multiple: 4.18, // ₹199 monthly * 4.18 markup * 0.012 rate = $9.98 USD
    status: "active",
    countries: ["Rest of World"], // Represents all other countries
    lastUpdated: "2026-05-21"
  }
];

export function getPricingGroups(): PricingGroup[] {
  const saved = localStorage.getItem("amrita_pricing_groups");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      let migrated = false;
      const migratedGroups = parsed.map((g: any) => {
        // If the group has legacy monthlyPrice or was converted to simple multiplier:
        // We migrate it to the new markup multiple format
        const rate = EXCHANGE_RATES[g.currency] || 0.012;
        
        // Check if this group was saved in the simple multiplier format (where multiple ≈ 0.05)
        // rather than markup multiplier format (where multiple ≈ 4.18).
        // If multiple is very small (< 0.5) for USD/EUR, it's definitely the old direct rate multiplier.
        const isOldDirectMultiplier = g.multiple !== undefined && g.multiple < 0.2 && g.currency !== "INR";
        const hasLegacyPrices = g.monthlyPrice !== undefined;
        
        if (hasLegacyPrices || isOldDirectMultiplier || g.multiple === undefined) {
          migrated = true;
          
          let markupMultiple = 1.0;
          if (g.id === "india") {
            markupMultiple = 1.0;
          } else if (hasLegacyPrices) {
            // monthlyPrice = baseInr (199) * markupMultiple * rate
            markupMultiple = g.monthlyPrice / (199 * rate);
          } else if (isOldDirectMultiplier) {
            // old g.multiple was direct rate (price = baseInr * g.multiple).
            // now price = baseInr * markupMultiple * rate.
            // So markupMultiple = old_g.multiple / rate.
            markupMultiple = g.multiple / rate;
          } else {
            markupMultiple = 1.25; // Default markup for custom groups
          }
          
          // Round to 4 decimal places
          markupMultiple = Math.round(markupMultiple * 10000) / 10000;
          
          const { monthlyPrice, yearlyPrice, ...rest } = g;
          return {
            ...rest,
            multiple: markupMultiple
          };
        }
        return g;
      });
      
      if (migrated) {
        localStorage.setItem("amrita_pricing_groups", JSON.stringify(migratedGroups));
      }
      return migratedGroups;
    } catch (e) {
      console.error("Error parsing saved pricing groups", e);
    }
  }
  // Initialize with defaults if none exists
  localStorage.setItem("amrita_pricing_groups", JSON.stringify(DEFAULT_PRICING_GROUPS));
  return DEFAULT_PRICING_GROUPS;
}

export function savePricingGroups(groups: PricingGroup[]) {
  localStorage.setItem("amrita_pricing_groups", JSON.stringify(groups));
  window.dispatchEvent(new Event("amrita_pricing_groups_updated"));
}
