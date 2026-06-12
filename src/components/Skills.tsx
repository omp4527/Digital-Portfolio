"use client";

import { useInView } from "../hooks/useInView";

const skillCategories = [
  {
    title: "Programming Languages",
    color: "teal",
    skills: ["Python", "Java", "C", "JavaScript", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    color: "sky",
    skills: [
      "Spring Boot",
      "Spring Data JPA",
      "Flask",
      "Streamlit",
      "TensorFlow",
      "Keras",
      "MediaPipe",
      "OpenCV",
      "Swing",
    ],
  },
  {
    title: "Web Development",
    color: "teal",
    skills: [
      "HTML5",
      "CSS3",
      "Glassmorphism",
      "JSP",
      "MVC Architecture",
      "Chart.js",
      "Plotly",
    ],
  },
  {
    title: "Developer Tools",
    color: "sky",
    skills: [
      "MySQL",
      "SQLite",
      "Git",
      "GitHub",
      "VS Code",
      "IntelliJ IDEA",
      "LaTeX",
    ],
  },
];

const coreProficiencies = [
  { label: "Machine Learning / Deep Learning", pct: 80 },
  { label: "Backend Development (Java / Spring)", pct: 62 },
  { label: "Python & Data Processing", pct: 68 },
  { label: "Computer Vision (OpenCV / MediaPipe)", pct: 75 },
  { label: "Database Design & SQL", pct: 78 },
  { label: "Cybersecurity & Network Analysis", pct: 65 },
];

export default function Skills() {
  const { ref, inView } = useInView();

  return (
    <section id="skills" className="py-24 px-6 bg-navy-900/40">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <p className="section-subheading">What I work with</p>
            <h2 className="section-heading">Technical Skills</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-sky-500 mx-auto mt-4" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Skill categories */}
            <div className="space-y-8">
              {skillCategories.map((cat, i) => (
                <div
                  key={cat.title}
                  className={`transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div
                      className={`w-2 h-2 rounded-full ${cat.color === "teal" ? "bg-teal-400" : "bg-sky-400"}`}
                    />
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wide">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Proficiency bars */}
            <div className="space-y-6">
              <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-6">
                Core Proficiencies
              </h3>
              {coreProficiencies.map((item, i) => (
                <div
                  key={item.label}
                  className={`transition-all duration-500 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                  style={{ transitionDelay: `${i * 80 + 200}ms` }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300 text-sm">{item.label}</span>
                    <span className="text-teal-400 font-mono text-xs">
                      {item.pct}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-navy-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-sky-500 transition-all duration-1000"
                      style={{
                        width: inView ? `${item.pct}%` : "0%",
                        transitionDelay: `${i * 80 + 400}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}

              {/* Extra badges */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-3">
                  Soft Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Teamwork",
                    "Quick Learner",
                    "Adaptability",
                    "Analytical Problem Solving",
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <p className="text-slate-500 text-xs uppercase tracking-widest mb-3 mt-4">
                  Languages
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "English (Professional)",
                    "Hindi (Native)",
                    "Marathi (Bilingual)",
                  ].map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
