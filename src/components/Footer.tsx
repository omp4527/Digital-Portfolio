import { Code2, Mail } from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { PORTFOLIO_EMAIL, PORTFOLIO_MAILTO } from "../config/contact";

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
              <Code2 size={16} className="text-teal-400" />
            </div>
            <div>
              <span className="font-mono font-semibold text-white text-sm">
                Om Patil
              </span>
              <p className="text-slate-500 text-xs">
                Computer Engineering · MITAOE
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/omp4527"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-teal-400 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/ompatil-ce"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-sky-400 transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={PORTFOLIO_MAILTO}
              className="flex items-center gap-2 text-slate-500 hover:text-teal-400 transition-colors text-sm"
            >
              <Mail size={18} />
              <span className="font-mono hidden sm:inline">{PORTFOLIO_EMAIL}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-slate-600 text-xs font-mono">
            © {new Date().getFullYear()} Om Patil · All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
