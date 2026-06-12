"use client";

import { useState, useEffect } from "react";
import { Send, Lock, LogOut, Mail } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabaseClient";
import { submitContactFormAction } from "@/app/actions";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [user, setUser] = useState<any>(null);
  const [magicEmail, setMagicEmail] = useState("");
  const [magicLoading, setMagicLoading] = useState(false);
  const [magicMessage, setMagicMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // Fetch initial auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setFormData((prev) => ({
          ...prev,
          email: session.user.email ?? "",
          name: session.user.user_metadata?.full_name ?? prev.name,
        }));
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        setFormData((prev) => ({
          ...prev,
          email: session.user.email ?? "",
          name: session.user.user_metadata?.full_name ?? prev.name,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          email: "",
        }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in with Google.");
    }
  };

  const handleMagicLinkSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setMagicMessage(null);
    setMagicLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: magicEmail,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;
      setMagicMessage({
        type: "success",
        text: "Magic link sent! Check your email inbox.",
      });
      setMagicEmail("");
    } catch (err) {
      setMagicMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to send magic link.",
      });
    } finally {
      setMagicLoading(false);
    }
  };

  const handleSignOut = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign out.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("subject", formData.subject);
      data.append("message", formData.message);

      const result = await submitContactFormAction(null, data);

      if (result.success) {
        setFormData((prev) => ({ ...prev, subject: "", message: "" }));
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  // 1. Lock screen when Supabase is configured and user is not authenticated
  if (isSupabaseConfigured && !user) {
    return (
      <div className="card-glass p-8 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
          <Lock className="text-teal-400" size={28} />
        </div>
        <div>
          <h3 className="text-white font-bold text-xl mb-2">Unlock Contact Form</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
            To prevent spam and verify your email, please authenticate using Google or an Email Magic Link.
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-slate-100 text-slate-900 font-semibold rounded-xl transition-all shadow-lg hover:shadow-white/5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-xs font-mono">OR</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <form onSubmit={handleMagicLinkSignIn} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                required
                value={magicEmail}
                onChange={(e) => setMagicEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-navy-800/60 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:bg-navy-800 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={magicLoading}
              className="w-full btn-primary justify-center rounded-xl py-3 text-sm"
            >
              <Mail size={16} />
              {magicLoading ? "Sending Magic Link..." : "Email Me a Magic Link"}
            </button>
          </form>

          {magicMessage && (
            <p
              className={`text-xs mt-2 font-mono ${
                magicMessage.type === "success" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {magicMessage.text}
            </p>
          )}

          {error && <p className="text-xs text-red-400 mt-2 font-mono">{error}</p>}
        </div>
      </div>
    );
  }

  // 2. Active Contact Form when unlocked (or in fallback mode)
  return (
    <form onSubmit={handleSubmit} className="card-glass p-6 space-y-4">
      {/* Setup notification if keys are not set */}
      {!isSupabaseConfigured && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-2 text-left">
          <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            Developer Setup Notice
          </p>
          <p className="text-slate-400 text-xs leading-relaxed">
            Supabase authentication is not configured. Create a <code className="text-white bg-navy-800 px-1 py-0.5 rounded font-mono">.env</code> file containing your credentials to lock this contact form behind verified email authentication.
          </p>
        </div>
      )}

      {/* Active User Session Header */}
      {isSupabaseConfigured && user && (
        <div className="flex items-center justify-between bg-teal-500/10 border border-teal-500/30 rounded-xl p-3 mb-2 text-sm">
          <div className="flex items-center gap-3">
            {user.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Profile"
                className="w-7 h-7 rounded-full border border-teal-500/40"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-teal-500/20 border border-teal-500/40 flex items-center justify-center font-mono text-teal-400 text-xs font-bold uppercase">
                {user.email?.[0] || "?"}
              </div>
            )}
            <span className="text-slate-300 text-xs">
              Verified: <strong className="text-teal-400 font-mono">{user.email}</strong>
            </span>
          </div>
          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-1 text-slate-400 hover:text-red-400 text-xs transition-colors font-medium"
          >
            <LogOut size={13} />
            Sign Out
          </button>
        </div>
      )}

      <h3 className="text-white font-semibold mb-2">Send a message</h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-slate-400 text-xs mb-1.5 block">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full bg-navy-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:bg-navy-800 transition-all"
          />
        </div>
        <div>
          <label className="text-slate-400 text-xs mb-1.5 block">Email</label>
          <input
            type="email"
            name="email"
            required
            readOnly={isSupabaseConfigured && !!user}
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`w-full bg-navy-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:bg-navy-800 transition-all ${
              isSupabaseConfigured && user ? "cursor-not-allowed opacity-60 border-teal-500/30 font-mono" : ""
            }`}
          />
        </div>
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1.5 block">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          className="w-full bg-navy-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:bg-navy-800 transition-all"
        />
      </div>

      <div>
        <label className="text-slate-400 text-xs mb-1.5 block">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about the opportunity or project..."
          className="w-full bg-navy-800/60 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-teal-500/60 focus:bg-navy-800 transition-all resize-none"
        />
      </div>

      {error && (
        <p className="text-red-400 text-sm font-mono" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={sending}
        className={`w-full btn-primary justify-center disabled:opacity-60 disabled:cursor-not-allowed ${
          submitted ? "bg-green-500 hover:bg-green-400" : ""
        }`}
      >
        <Send size={16} />
        {sending ? "Sending..." : submitted ? "Message sent!" : "Send Message"}
      </button>
    </form>
  );
}
