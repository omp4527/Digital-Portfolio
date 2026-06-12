"use client";

import { Shield } from "lucide-react";
import { useInView } from "../hooks/useInView";

const experiences = [
  {
    role: "Cybersecurity Virtual Intern",
    company: "Cisco",
    period: "June 2025 – July 2025",
    type: "Internship",
    icon: Shield,
    color: "teal",
    points: [
      "Mapped and analyzed university campus network topologies (Star Topology) using Cisco Packet Tracer, identifying security controls, network segmentation zones, and vulnerability entry points.",
      "Conducted comprehensive attack surface mapping, evaluating data/command pathways (UI fields, authentication checks) and proposed mitigations including AES encryption, HTTPS, TLS, and IPsec.",
      "Designed and architected a secure hybrid work environment using a Zero Trust Security Model to enforce strict access control with multi-factor authentication.",
      "Implemented and evaluated Cisco Secure Firewall policies utilizing AI-driven rule generation and Talos threat intelligence; mapped defensive strategies against acute vulnerabilities (Arcane Door campaigns, FTD/ASA exploits) and DoS attacks.",
    ],
    tags: [
      "Cisco Packet Tracer",
      "Zero Trust",
      "AES Encryption",
      "Firewall Policy",
      "Threat Intelligence",
      "Network Security",
    ],
  },
];

const education = [
  {
    degree: "B.Tech in Computer Engineering",
    institution: "MIT Academy of Engineering (MITAOE)",
    period: "2024 – Present",
    detail: "Currently pursuing Third Year · Alandi, Pune",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Jawahar Highschool & Jr. College",
    period: "2022 – 2024",
    detail: "Bhadgaon, Jalgaon · 86.33%",
  },
];

export default function Experience() {
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <p className="section-subheading">Where I've been</p>
            <h2 className="section-heading">Experience & Education</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-sky-500 mx-auto mt-4" />
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main experience */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-slate-400 text-sm uppercase tracking-widest font-medium">
                Work Experience
              </h3>
              {experiences.map((exp, i) => {
                const Icon = exp.icon;
                return (
                  <div key={i} className="card-glass p-6 group">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon size={22} className="text-teal-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <div>
                            <h4 className="text-white font-semibold text-lg">
                              {exp.role}
                            </h4>
                            <p className="text-teal-400 font-medium">
                              {exp.company}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="px-2 py-0.5 bg-teal-500/10 text-teal-400 text-xs rounded-full font-mono border border-teal-500/20">
                              {exp.type}
                            </span>
                            <p className="text-slate-500 text-sm font-mono mt-1">
                              {exp.period}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-5">
                      {exp.points.map((point, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 flex-shrink-0 mt-2" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-navy-800 text-slate-400 text-xs rounded font-mono border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Education sidebar */}
            <div>
              <h3 className="text-slate-400 text-sm uppercase tracking-widest font-medium mb-8">
                Education
              </h3>
              <div className="relative pl-6 space-y-8">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-teal-500 via-sky-500 to-transparent" />

                {education.map((edu, i) => (
                  <div key={i} className="relative">
                    <div className="timeline-dot absolute -left-8" />
                    <div className="card-glass p-5">
                      <p className="text-white font-semibold text-sm mb-1">
                        {edu.degree}
                      </p>
                      <p className="text-teal-400 text-sm mb-1">
                        {edu.institution}
                      </p>
                      <p className="text-slate-500 text-xs font-mono mb-2">
                        {edu.period}
                      </p>
                      <p className="text-slate-400 text-xs">{edu.detail}</p>
                    </div>
                  </div>
                ))}

                {/* Extracurriculars */}
                <div className="relative">
                  <div className="timeline-dot absolute -left-8" />
                  <div className="card-glass p-5">
                    <p className="text-white font-semibold text-sm mb-1">
                      Extracurriculars
                    </p>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Active participation in departmental coding events and
                      hackathons. EcoHack Hackathon participant with CarbonSnap
                      project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
