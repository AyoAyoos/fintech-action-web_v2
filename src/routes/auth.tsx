import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Login — ExpertAction®" }, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in");
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check email if confirmation is required, then sign in.");
        setMode("signin");
      }
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-hero grid place-items-center px-5 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-card p-8 shadow-[var(--shadow-card)]">
        <a href="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-to-br from-primary to-gold-soft text-primary-foreground font-black">E</div>
          <span className="font-display font-extrabold text-lg">Expert<span className="text-primary">Action</span></span>
        </a>
        <h1 className="font-display text-2xl font-black text-center">{mode === "signin" ? "Admin Sign In" : "Create Admin Account"}</h1>
        <p className="mt-2 text-sm text-muted-foreground text-center">Access the ExpertAction admin dashboard.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-navy-deep px-4 py-3 text-sm outline-none focus:border-primary transition-colors" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">Password</label>
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-white/10 bg-navy-deep px-4 py-3 text-sm outline-none focus:border-primary transition-colors" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-gold-soft px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-gold)] disabled:opacity-60">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-6 w-full text-xs text-muted-foreground hover:text-primary transition-colors">
          {mode === "signin" ? "First time? Create the admin account →" : "← Back to sign in"}
        </button>
      </div>
    </div>
  );
}
