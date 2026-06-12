"use client";

import {
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { Github, Linkedin } from "./BrandIcons";
import { useInView } from "../hooks/useInView";
import { PORTFOLIO_EMAIL, PORTFOLIO_MAILTO } from "../config/contact";
import ContactForm from "../app/components/ContactForm";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: PORTFOLIO_EMAIL,
    href: PORTFOLIO_MAILTO,
    color: "teal",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Pune, Maharashtra, India",
    href: null,
    color: "teal",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/omp4527",
    href: "https://github.com/omp4527",
    color: "sky",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/ompatil-ce",
    href: "https://linkedin.com/in/ompatil-ce",
    color: "teal",
  },
];

export default function Contact() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-16">
            <p className="section-subheading">Let's connect</p>
            <h2 className="section-heading">Get In Touch</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-teal-500 to-sky-500 mx-auto mt-4" />
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">
              Open to internship opportunities, collaborative projects, and
              interesting technical conversations.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div className="space-y-6">
              <div className="card-glass p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare size={20} className="text-teal-400" />
                  <h3 className="text-white font-semibold">Let's talk</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  I'm currently a third-year Computer Engineering student at
                  MITAOE and actively looking for internship roles in software
                  development, ML engineering, or cybersecurity. Don't hesitate
                  to reach out!
                </p>

                <div className="space-y-4">
                  {contactDetails.map(
                    ({ icon: Icon, label, value, href, color }) => (
                      <div key={label} className="flex items-center gap-4">
                        <div
                          className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color === "teal" ? "bg-teal-500/10 border-teal-500/20" : "bg-sky-500/10 border-sky-500/20"} border`}
                        >
                          <Icon
                            size={16}
                            className={
                              color === "teal"
                                ? "text-teal-400"
                                : "text-sky-400"
                            }
                          />
                        </div>
                        <div>
                          <p className="text-slate-500 text-xs">{label}</p>
                          {href ? (
                            <a
                              href={href}
                              target={
                                href.startsWith("http") ? "_blank" : undefined
                              }
                              rel="noopener noreferrer"
                              className="text-slate-300 text-sm hover:text-teal-400 transition-colors"
                            >
                              {value}
                            </a>
                          ) : (
                            <p className="text-slate-300 text-sm">{value}</p>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="card-glass p-5 flex items-center gap-4">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-teal-400" />
                  <div className="w-3 h-3 rounded-full bg-teal-400 absolute inset-0 animate-ping opacity-50" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    Available for opportunities
                  </p>
                  <p className="text-slate-500 text-xs">
                    Internships, part-time, and collaborative projects
                  </p>
                </div>
              </div>
            </div>

            {/* Contact form component */}
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
