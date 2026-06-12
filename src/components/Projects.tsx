"use client";

import {
  Brain,
  Database,
  Leaf,
  FileCode,
  ParkingCircle,
} from "lucide-react";
import { Github } from "./BrandIcons";
import { useInView } from "../hooks/useInView";

const projects = [
  {
    title: "AI-Based Hybrid Stress Detector",
    subtitle: "for Developers",
    description:
      "Quad-modal biosensing pipeline monitoring facial emotions (CNN), ocular metrics (Eye Aspect Ratio/BPM), 3D head kinematics (solvePnP), and keystroke timings — all fused via an offline LSTM sequence regressor over 15-frame sliding windows.",
    tech: [
      "Python",
      "TensorFlow",
      "MediaPipe",
      "OpenCV",
      "Flask",
      "Chart.js",
      "LSTM",
    ],
    highlights: [
      "3-4x CPU reduction via RunningMode.VIDEO",
      "30 FPS real-time webcam",
      "Anti-cheat key event blocks",
    ],
    icon: Brain,
    color: "teal",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: true,
    github: "https://github.com/omp4527/Stress-Detector",
  },
  {
    title: "PAMS Complaint Tracking System",
    subtitle: "",
    description:
      "Dual-table database architecture routing pending cases to a fast-response active_complaints queue while keeping complaints as a permanent read-only archive. Atomic concurrent Spring Boot transactions auto-delete from active queue on ticket resolution.",
    tech: ["Java", "Spring Boot", "Spring Data JPA", "MySQL", "JSP", "MVC"],
    highlights: [
      "Atomic concurrent transactions",
      "Dual-queue DB architecture",
      "Permanent audit archive",
    ],
    icon: Database,
    color: "sky",
    image:
      "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: true,
    github: "https://github.com/omp4527/Muncipal-Greviance-Redressal",
  },
  {
    title: "CarbonSnap",
    subtitle: "Sustainability Tracker",
    description:
      "Carbon footprint tracker with India-specific emission coefficients mapping energy, food, waste, and transport metrics. Features Plotly dashboards, custom PDF exports, SQLite user profiles, and numeric field filters.",
    tech: ["Python", "Streamlit", "Plotly", "SQLite", "ReportLab PDF"],
    highlights: [
      "India-specific emission data",
      "PDF report generation",
      "EcoHack Hackathon entry",
    ],
    icon: Leaf,
    color: "teal",
    image:
      "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: false,
    github: "https://github.com/omp4527",
  },
  {
    title: "Resume Parser & DFA Simulators",
    subtitle: "",
    description:
      "Theory of Computation regex form validating 13 fields (Mobile, CGPA boundaries, PRN codes). Interactive SVG-based DFA state simulators enabling step-by-step string matching visualizations.",
    tech: ["HTML5", "CSS3", "JavaScript", "SVG Vector Design", "Regex"],
    highlights: [
      "13-field regex validation",
      "Interactive DFA visualization",
      "Step-by-step string matching",
    ],
    icon: FileCode,
    color: "sky",
    image:
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: false,
    github: "https://github.com/omp4527",
  },
  {
    title: "College Parking Finder",
    subtitle: "",
    description:
      "Web-based solution helping students locate available parking spaces on campus. Focused on usability and practical problem-solving with clean UI design.",
    tech: ["HTML", "CSS", "JavaScript"],
    highlights: [
      "Campus-specific UX",
      "Real-time slot visualization",
      "Mobile-friendly",
    ],
    icon: ParkingCircle,
    color: "teal",
    image:
      "https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg?auto=compress&cs=tinysrgb&w=600",
    featured: false,
    github: "https://github.com/omp4527",
  },
];

export default function Projects() {
  const { ref, inView } = useInView();

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 bg-navy-900/40">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <p className="section-subheading">What I've built</p>
            <h2 className="section-heading">Projects</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-sky-500 mx-auto mt-4" />
          </div>

          {/* Featured projects */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {featured.map((project, i) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.title}
                  className={`card-glass overflow-hidden group transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div
                        className={`w-10 h-10 rounded-lg ${project.color === "teal" ? "bg-teal-500/20 border-teal-500/30" : "bg-sky-500/20 border-sky-500/30"} border flex items-center justify-center`}
                      >
                        <Icon
                          size={18}
                          className={
                            project.color === "teal"
                              ? "text-teal-400"
                              : "text-sky-400"
                          }
                        />
                      </div>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full border font-mono ${project.color === "teal" ? "bg-teal-500/10 border-teal-500/30 text-teal-400" : "bg-sky-500/10 border-sky-500/30 text-sky-400"}`}
                      >
                        Featured
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-white font-bold text-xl mb-1">
                      {project.title}
                      {project.subtitle && (
                        <span className="text-slate-400 font-normal text-base ml-1">
                          — {project.subtitle}
                        </span>
                      )}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.highlights.map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 bg-teal-500/5 border border-teal-500/15 text-teal-400/80 text-xs rounded"
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 bg-navy-800 text-slate-400 text-xs rounded font-mono border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-400 hover:text-teal-400 text-sm transition-colors"
                    >
                      <Github size={16} />
                      View on GitHub
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Other projects grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {rest.map((project, i) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.title}
                  className={`card-glass p-5 group transition-all duration-500 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${(i + 2) * 120}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg ${project.color === "teal" ? "bg-teal-500/15 border-teal-500/20" : "bg-sky-500/15 border-sky-500/20"} border flex items-center justify-center`}
                    >
                      <Icon
                        size={16}
                        className={
                          project.color === "teal"
                            ? "text-teal-400"
                            : "text-sky-400"
                        }
                      />
                    </div>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-teal-400 transition-colors"
                    >
                      <Github size={16} />
                    </a>
                  </div>

                  <h3 className="text-white font-semibold mb-2 text-sm leading-snug">
                    {project.title}
                    {project.subtitle && (
                      <span className="text-slate-500">
                        {" "}
                        — {project.subtitle}
                      </span>
                    )}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-auto">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 bg-navy-800 text-slate-500 text-xs rounded font-mono"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-1.5 py-0.5 text-slate-600 text-xs">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
