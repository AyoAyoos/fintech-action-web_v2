import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BUCKET, fetchGallery, fetchSetting, signedUrl } from "@/lib/site-queries";
import { Upload, Trash2, ArrowUp, ArrowDown, LogOut, Loader2, ImageIcon, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — ExpertAction®" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate({ to: "/auth" });
        return;
      }
      setUserEmail(data.session.user.email ?? null);
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", data.session.user.id);
      const admin = roles?.some((r) => r.role === "admin") ?? false;
      setIsAdmin(admin);
      setChecking(false);
    })();
  }, [navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (checking) {
    return <div className="min-h-screen grid place-items-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-hero grid place-items-center px-5">
        <div className="max-w-md text-center rounded-3xl border border-white/10 bg-card p-8">
          <h1 className="font-display text-2xl font-black">Not authorized</h1>
          <p className="mt-3 text-sm text-muted-foreground">Signed in as {userEmail}. This account isn't an admin.</p>
          <button onClick={signOut} className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero">
      <header className="border-b border-white/10 bg-navy-deep/60 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-gold-soft text-primary-foreground font-black">E</div>
            <div>
              <div className="font-display font-extrabold">Admin Dashboard</div>
              <div className="text-xs text-muted-foreground">{userEmail}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a href="/" className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold hover:bg-white/5 transition-colors">
              <ExternalLink className="h-3.5 w-3.5" /> View site
            </a>
            <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/20 px-4 py-2 text-xs font-semibold hover:bg-white/10 transition-colors">
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 space-y-10">
        <SettingImagePanel settingKey="hero_image" title="Hero Background Image" description="Displayed as the hero section background on the home page." />
        <SettingImagePanel settingKey="founder_image" title="Founder Photo" description="Displayed in the About section (Mangesh Waghmare)." aspect="aspect-[4/5]" />
        <GalleryPanel />
      </main>
    </div>
  );
}

/* ---- Single-image setting panel ---- */
function SettingImagePanel({ settingKey, title, description, aspect = "aspect-video" }: { settingKey: string; title: string; description: string; aspect?: string }) {
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const { data: current } = useQuery({
    queryKey: ["setting-raw", settingKey],
    queryFn: async () => {
      const path = await fetchSetting(settingKey);
      const url = await signedUrl(path);
      return { path, url };
    },
  });

  const onUpload = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${settingKey}/${Date.now()}.${ext}`;
      const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false });
      if (upErr) throw upErr;
      // delete old file
      if (current?.path) await supabase.storage.from(BUCKET).remove([current.path]);
      const { error: dbErr } = await supabase.from("site_settings").upsert({ key: settingKey, value: path, updated_at: new Date().toISOString() });
      if (dbErr) throw dbErr;
      toast.success(`${title} updated`);
      qc.invalidateQueries({ queryKey: ["setting-raw", settingKey] });
      qc.invalidateQueries({ queryKey: ["setting", settingKey] });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  }, [current?.path, qc, settingKey, title]);

  return (
    <section className="rounded-3xl border border-white/10 bg-card p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-xl font-extrabold">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <label className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-gold-soft px-5 py-2.5 text-sm font-semibold text-primary-foreground cursor-pointer shadow-[var(--shadow-gold)] ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload new
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])} />
        </label>
      </div>
      <div className={`mt-6 ${aspect} max-w-md rounded-2xl overflow-hidden border border-white/10 bg-navy-deep grid place-items-center`}>
        {current?.url ? (
          <img src={current.url} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="text-center text-muted-foreground text-sm p-4">
            <ImageIcon className="h-8 w-8 mx-auto opacity-50" />
            <p className="mt-2">No image yet</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---- Gallery panel ---- */
function GalleryPanel() {
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const { data: images = [] } = useQuery({ queryKey: ["admin-gallery"], queryFn: fetchGallery });

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin-gallery"] });
    qc.invalidateQueries({ queryKey: ["gallery"] });
  };

  async function onUpload(files: FileList | null) {
    if (!files || !files.length) return;
    setUploading(true);
    try {
      const maxOrder = Math.max(0, ...images.map((i) => i.sort_order));
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split(".").pop() ?? "jpg";
        const path = `gallery/${Date.now()}-${i}.${ext}`;
        const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file);
        if (upErr) throw upErr;
        const { error: dbErr } = await supabase.from("gallery_images").insert({ image_url: path, storage_path: path, sort_order: maxOrder + 1 + i });
        if (dbErr) throw dbErr;
      }
      toast.success(`Uploaded ${files.length} image${files.length > 1 ? "s" : ""}`);
      refresh();
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function onDelete(id: string, path: string) {
    if (!confirm("Delete this image?")) return;
    try {
      await supabase.storage.from(BUCKET).remove([path]);
      const { error } = await supabase.from("gallery_images").delete().eq("id", id);
      if (error) throw error;
      toast.success("Deleted");
      refresh();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  async function move(index: number, dir: -1 | 1) {
    const other = index + dir;
    if (other < 0 || other >= images.length) return;
    const a = images[index], b = images[other];
    try {
      await supabase.from("gallery_images").update({ sort_order: b.sort_order }).eq("id", a.id);
      await supabase.from("gallery_images").update({ sort_order: a.sort_order }).eq("id", b.id);
      refresh();
    } catch (err) {
      toast.error((err as Error).message);
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-card p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-xl font-extrabold">Gallery Images</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage images shown in the "Our Research in Pictures" slider. Reorder with arrows.</p>
        </div>
        <label className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-gold-soft px-5 py-2.5 text-sm font-semibold text-primary-foreground cursor-pointer shadow-[var(--shadow-gold)] ${uploading ? "opacity-60 pointer-events-none" : ""}`}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />} Upload images
          <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => onUpload(e.target.files)} />
        </label>
      </div>

      {images.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-10 text-center text-muted-foreground text-sm">
          <ImageIcon className="h-8 w-8 mx-auto opacity-50" />
          <p className="mt-2">No gallery images yet. Upload some to populate the slider.</p>
        </div>
      ) : (
        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <li key={img.id} className="group rounded-2xl overflow-hidden border border-white/10 bg-navy-deep">
              <div className="aspect-video bg-navy-deep">
                {img.signedUrl && <img src={img.signedUrl} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="p-3 flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground">Position {i + 1}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => move(i, -1)} disabled={i === 0} className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30" aria-label="Move up"><ArrowUp className="h-4 w-4" /></button>
                  <button onClick={() => move(i, 1)} disabled={i === images.length - 1} className="p-2 rounded-lg hover:bg-white/10 disabled:opacity-30" aria-label="Move down"><ArrowDown className="h-4 w-4" /></button>
                  <button onClick={() => onDelete(img.id, img.image_url)} className="p-2 rounded-lg hover:bg-destructive/20 text-destructive" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
