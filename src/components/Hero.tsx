"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";

const roles = [
  "Computer Engineering Student",
  "ML Pipeline Developer",
  "Backend Architect",
  "Cybersecurity Enthusiast",
  "Full-Stack Problem Solver",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];

    if (!deleting && charIndex < current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 60);
      return () => clearTimeout(t);
    }

    if (!deleting && charIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex > 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 30);
      return () => clearTimeout(t);
    }

    if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
  }, [charIndex, deleting, roleIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-grid"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-teal-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-sky-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-teal-500/3 blur-3xl" />
      </div>

      {/* Floating particles */}
      {mounted && Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${8 + Math.random() * 12}s`,
            animationDelay: `${Math.random() * 8}s`,
            width: `${1 + Math.random() * 3}px`,
            height: `${1 + Math.random() * 3}px`,
          }}
        />
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Status badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-mono mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          Available for internships & opportunities
        </div>

        {/* Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight animate-fade-up">
          Om Patil
        </h1>

        {/* Typewriter role */}
        <div className="h-10 flex items-center justify-center mb-6">
          <span className="text-xl md:text-2xl text-slate-400 font-mono">
            {displayed}
            <span className="typewriter-cursor" />
          </span>
        </div>

        {/* Tagline */}
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up animate-delay-200">
          Building intelligent systems at the intersection of{" "}
          <span className="text-sky-400">machine learning</span>,{" "}
          <span className="text-sky-400">backend engineering</span>, and{" "}
          <span className="text-sky-400">cybersecurity</span> — one commit at a
          time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-up animate-delay-300">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-primary text-navy-900"
          >
            View My Projects
          </button>
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-outline"
          >
            <Mail size={18} />
            Get In Touch
          </button>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6 mb-16 animate-fade-up animate-delay-400">
          <a
            href="https://github.com/omp4527"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-500 hover:text-teal-400 transition-all duration-300 text-sm"
          >
            <Github size={18} />
            <span className="font-mono">github.com/omp4527</span>
          </a>
          <span className="w-px h-4 bg-white/20" />
          <a
            href="https://linkedin.com/in/ompatil-ce"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-500 hover:text-sky-400 transition-all duration-300 text-sm"
          >
            <Linkedin size={18} />
            <span className="font-mono">linkedin.com/in/ompatil-ce</span>
          </a>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="text-slate-600 hover:text-teal-400 transition-colors animate-float"
        >
          <ArrowDown size={24} />
        </button>
      </div>
    </section>
  );
}
