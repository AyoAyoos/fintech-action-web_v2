import { supabase } from "@/integrations/supabase/client";

export const BUCKET = "site-images";

// Get a secure signed or public URL for a storage path
export async function signedUrl(path: string | null): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const { data } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 60 * 24);
  return data?.signedUrl || null;
}

// Fetch a single setting value by key
export async function fetchSetting(key: string): Promise<string | null> {
  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", key)
    .single();
  if (error) return null;
  return data?.value ?? null;
}

// Fetch a signed URL for a specific site setting (like hero or founder image)
export async function fetchSettingSignedUrl(key: string): Promise<string | null> {
  const path = await fetchSetting(key);
  return signedUrl(path);
}

// Fetch all site settings as a key-value map dictionary
export async function fetchAllSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) throw error;
  const map: Record<string, string> = {};
  for (const row of data || []) {
    map[row.key] = row.value ?? "";
  }
  return map;
}

// Fetch regular gallery images ("Our Research in Pictures")
export async function fetchGallery() {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;

  return Promise.all(
    (data || []).map(async (img) => {
      const url = await signedUrl(img.image_url);
      return { ...img, signedUrl: url };
    })
  );
}

// Fetch showcase gallery images ("A Glimpse Into Our Culture & Classes")
// Fetch showcase gallery images ("A Glimpse Into Our Culture & Classes")
export async function fetchShowcaseGallery() {
  // Use 'as any' to bypass the local TypeScript cache until types are regenerated
  const { data, error } = await (supabase.from("showcase_gallery_images" as any))
    .select("*")
    .order("sort_order", { ascending: true });
    
  if (error) throw error;

  return Promise.all(
    (data || []).map(async (img: any) => {
      const url = await signedUrl(img.image_url);
      return { ...img, signedUrl: url };
    })
  );
}