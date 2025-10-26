import dataset from "@/data/geo.json";
import { EN, type SupportedLang } from "@/constants/lang";

export type Locale = SupportedLang;

export interface GeoName {
  en: string;
  ar: string;
}
export interface GeoCity {
  code: string; // stable code (IATA-like or custom)
  names: GeoName; // {en, ar}
}
export interface GeoState {
  code: string; // ISO-like or custom
  names: GeoName;
  cities: GeoCity[];
}
export interface GeoCountry {
  code: string; // ISO-3166-1 alpha-2 preferred
  names: GeoName;
  states: GeoState[];
}
export type GeoDataset = GeoCountry[];

export type Option = { label: string; value: string; code?: string };

const GEO: GeoDataset = dataset as GeoDataset;

export function getCountries(lang: Locale, q?: string): Option[] {
  let items = GEO.map((c) => ({
    label: c.names[lang] ?? c.names.en,
    value: c.code,
    code: c.code,
  }));
  if (q) {
    const query = q.trim().toLowerCase();
    items = items.filter((o) => o.label.toLowerCase().includes(query));
  }
  return items.sort((a, b) => a.label.localeCompare(b.label, lang));
}

export function getStates(
  countryCode?: string,
  lang: Locale = EN,
  q?: string
): Option[] {
  if (!countryCode) return [];
  const country = GEO.find((c) => c.code === countryCode);
  if (!country) return [];
  let items = country.states.map((s) => ({
    label: s.names[lang] ?? s.names.en,
    value: s.code,
    code: s.code,
  }));
  if (q) {
    const query = q.trim().toLowerCase();
    items = items.filter((o) => o.label.toLowerCase().includes(query));
  }
  return items;
}

export function getCities(
  countryCode?: string,
  stateCode?: string,
  lang: Locale = EN,
  q?: string
): Option[] {
  if (!countryCode || !stateCode) return [];
  const country = GEO.find((c) => c.code === countryCode);
  const state = country?.states.find((s) => s.code === stateCode);
  if (!state) return [];
  let items = state.cities.map((c) => ({
    label: c.names[lang] ?? c.names.en,
    value: c.code,
    code: c.code,
  }));
  if (q) {
    const query = q.trim().toLowerCase();
    items = items.filter((o) => o.label.toLowerCase().includes(query));
  }
  return items;
}
