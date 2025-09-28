import { useMemo } from "react";
import {
  getCountries,
  getStates,
  getCities,
  type Locale,
  type Option,
} from "../lib/Geo";

export function useCountryOptions(lang: Locale, q?: string): Option[] {
  return useMemo(() => getCountries(lang, q), [lang, q]);
}
export function useStateOptions(
  countryCode?: string,
  lang: Locale = "en",
  q?: string
): Option[] {
  return useMemo(() => getStates(countryCode, lang, q), [countryCode, lang, q]);
}
export function useCityOptions(
  countryCode?: string,
  stateCode?: string,
  lang: Locale = "en",
  q?: string
): Option[] {
  return useMemo(
    () => getCities(countryCode, stateCode, lang, q),
    [countryCode, stateCode, lang, q]
  );
}
