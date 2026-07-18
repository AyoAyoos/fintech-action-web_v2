import { useQuery } from "@tanstack/react-query";
import { fetchAllSettings } from "@/lib/site-queries";

export function useSettings() {
  const { data } = useQuery({ queryKey: ["all-settings"], queryFn: fetchAllSettings });
  return (key: string, fallback: string) => data?.[key] ?? fallback;
}