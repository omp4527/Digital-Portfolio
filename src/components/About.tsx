"use client";

import { GraduationCap, MapPin, Code, Brain, Shield } from "lucide-react";
import { useInView } from "../hooks/useInView";

const highlights = [
  {
    icon: Code,
    title: "Full-Stack Developer",
    desc: "Building end-to-end solutions with Spring Boot, Flask, and modern JavaScript.",
  },
  {
    icon: Brain,
    title: "ML Engineer",
    desc: "Designing multi-modal biosensing pipelines with TensorFlow, MediaPipe & LSTM models.",
  },
  {
    icon: Shield,
    title: "Security Minded",
    desc: "Cisco-trained in Zero Trust architecture, threat modeling, and network defense.",
  },
];

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <p className="section-subheading">Get to know</p>
            <h2 className="section-heading">About Me</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-sky-500 mx-auto mt-4" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: image + stats */}
            <div className="flex flex-col items-center lg:items-start gap-8">
              <div className="relative">
                <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-teal-500/30">
                  <img
                    src="https://images.pexels.com/photos/4974915/pexels-photo-4974915.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Om Patil"
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-xl bg-teal-500/10 border border-teal-500/30 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-teal-400">3rd</span>
                  <span className="text-xs text-slate-400 text-center">
                    Year CE
                  </span>
                </div>
                <div className="absolute -top-4 -left-4 w-20 h-20 rounded-xl bg-sky-500/10 border border-sky-500/30 flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-sky-400">5+</span>
                  <span className="text-xs text-slate-400 text-center">
                    Projects
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin size={14} className="text-teal-400" />
                <span>Pune, Maharashtra, India</span>
              </div>

              <div className="flex items-start gap-3 bg-navy-800/60 border border-white/5 rounded-xl p-4 w-full">
                <GraduationCap
                  size={20}
                  className="text-teal-400 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-white font-medium text-sm">
                    B.Tech in Computer Engineering
                  </p>
                  <p className="text-slate-400 text-sm">
                    MIT Academy of Engineering (MITAOE)
                  </p>
                  <p className="text-teal-400/70 text-xs font-mono mt-1">
                    2024 – Present · Alandi, Pune
                  </p>
                </div>
              </div>
            </div>

            {/* Right: text */}
            <div className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                I'm a Computer Engineering student at MITAOE with a deep passion
                for building systems that actually solve problems — not just
                demos. My work spans across{" "}
                <span className="text-teal-400 font-medium">
                  multi-modal ML pipelines
                </span>
                ,{" "}
                <span className="text-sky-400 font-medium">
                  enterprise-grade Java backends
                </span>
                , and{" "}
                <span className="text-teal-400 font-medium">
                  zero-trust security architectures
                </span>
                .
              </p>

              <p className="text-slate-400 leading-relaxed">
                What sets me apart is my ability to bridge the gap between
                research-level ML ideas and production-ready implementations —
                whether it's reducing CPU load by 3-4x on a real-time webcam
                pipeline, or architecting dual-queue database systems for
                complaint tracking.
              </p>

              <p className="text-slate-400 leading-relaxed">
                When I'm not coding, I'm playing chess, following cricket, or
                diving into emerging frameworks. I believe the best engineers
                are curious about everything.
              </p>

              <div className="grid grid-cols-3 gap-3 mt-8">
                {highlights.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="card-glass p-4 text-center">
                    <Icon size={22} className="text-teal-400 mx-auto mb-2" />
                    <p className="text-white text-xs font-semibold mb-1">
                      {title}
                    </p>
                    <p className="text-slate-500 text-xs leading-relaxed hidden lg:block">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
