import { supabase } from "@/integrations/supabase/client";

const BUCKET = "site-images";

// Bucket is private (workspace policy), so we use signed URLs.
export async function signedUrl(path: string | null | undefined, expiresIn = 60 * 60 * 24 * 7): Promise<string | null> {
  if (!path) return null;
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, expiresIn);
  return data?.signedUrl ?? null;
}

export async function fetchSetting(key: string): Promise<string | null> {
  const { data } = await supabase.from("site_settings").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

export async function fetchSettingSignedUrl(key: string): Promise<string | null> {
  const path = await fetchSetting(key);
  return signedUrl(path);
}

export async function fetchAllSettings(): Promise<Record<string, string>> {
  const { data } = await supabase.from("site_settings").select("key, value");
  const out: Record<string, string> = {};
  for (const row of data ?? []) if (row.value != null) out[row.key] = row.value;
  return out;
}

export interface GalleryImage {
  id: string;
  image_url: string; // storage path
  sort_order: number;
  signedUrl?: string | null;
}

export async function fetchGallery(): Promise<GalleryImage[]> {
  const { data } = await supabase
    .from("gallery_images")
    .select("id, image_url, sort_order")
    .order("sort_order", { ascending: true });
  if (!data) return [];
  const withUrls = await Promise.all(
    data.map(async (g) => ({ ...g, signedUrl: await signedUrl(g.image_url) })),
  );
  return withUrls;
}

export { BUCKET };
