"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
import { useInView } from "@/hooks/useInView";
import { useMagnetic } from "@/hooks/useMagnetic";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import {
  Mail,
  Copy,
  Check,
  Send,
  AlertCircle,
  ExternalLink,
  Info,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const { profile } = portfolioData;
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({
    threshold: 0.02,
    rootMargin: "100px 0px 50px 0px",
  });
  const magneticSubmitRef = useMagnetic<HTMLDivElement>({ strength: 0.22, maxDistance: 16 });
  const magneticMailRef = useMagnetic<HTMLDivElement>({ strength: 0.22, maxDistance: 16 });
  const formGlowRef = usePointerGlow<HTMLDivElement>({
    glowSize: 450,
    glowColor: "rgba(99, 102, 241, 0.15)",
  });

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Job Opportunity",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [copied, setCopied] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState<string | null>(null);

  // Copy email utility
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  // Form Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your name (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Please specify a subject or opportunity type.";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Please write a brief message (minimum 10 characters).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mailto-based Form Dispatcher
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const emailSubject = encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`
    );

    const emailBody = encodeURIComponent(
      `Hi Akash,\n\n${formData.message}\n\n---\nSender Name: ${formData.name}\nReply-To Email: ${formData.email}\nOpportunity Type: ${formData.subject}`
    );

    const mailtoUrl = `mailto:${profile.email}?subject=${emailSubject}&body=${emailBody}`;

    window.location.href = mailtoUrl;

    setSubmittedStatus(
      "Your default email client has been launched with your pre-filled inquiry. Please review and send!"
    );
  };

  return (
    <Section
      id="contact"
      surface="canvas-base"
      spacing="spacious"
      className="scroll-mt-20 border-b border-white/[0.08] relative min-h-[85vh] flex flex-col justify-center"
    >
      {/* Ambient Accent Light */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet-600/[0.05] blur-3xl"
          aria-hidden="true"
        />
      </div>

      <Container size="xl">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
            {/* Left Column: Direct Communication Channels & Sticky Dossier (5 cols) */}
            <div className="lg:col-span-5 sticky-scene-panel space-y-6">
              <SectionHeading
                chapter="06 // THE FINAL CONNECTION"
                badge="Transmission Direct"
                title="Direct Channels &amp; Opportunities"
                description="Open for junior web developer roles, frontend engineering internships, and select freelance client projects. Reach out directly through any verified channel below."
              />

              {/* Status & Availability Card */}
              <div className="card-glass-specular p-6 rounded-3xl border border-white/[0.12] space-y-4 shadow-2xl">
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="sm" dot>
                    Actively Available
                  </Badge>
                  <Badge variant="accent" size="sm">
                    BCA 3rd Sem
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  Let&apos;s discuss how I can contribute to your team.
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-normal">
                  Whether you have an opening for a junior frontend role, an internship opportunity, or a web development project that needs a clean build, I welcome direct conversations.
                </p>

                <div className="pt-3 border-t border-white/[0.08] space-y-2.5 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Location: India (Remote &amp; On-Site friendly)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Response Time: Typically within 24 hours</span>
                  </div>
                </div>
              </div>

              {/* Direct Email Card */}
              <div className="card-glass-specular p-6 rounded-3xl border border-indigo-500/40 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-2xl bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">Direct Email</span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-300">Primary Channel</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#080c16] border border-white/[0.1] flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-xs sm:text-sm font-mono text-slate-200 hover:text-white transition-colors truncate focus:outline-none focus-visible:underline"
                  >
                    {profile.email}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="shrink-0 p-2 rounded-xl border border-white/[0.1] bg-white/[0.06] text-slate-200 hover:text-white hover:bg-white/[0.12] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    aria-label="Copy email address"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <div className="flex gap-2" ref={magneticMailRef}>
                  <Button
                    variant="primary"
                    size="sm"
                    href={`mailto:${profile.email}`}
                    isExternal
                    className="w-full justify-center shadow-lg shadow-indigo-950/40 font-semibold"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    <span>Open in Email App</span>
                  </Button>
                </div>
              </div>

              {/* Social & Code Profiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://linkedin.com/in/akash-shrivastava-022101317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glass-specular p-4 rounded-2xl border border-white/[0.1] hover:border-indigo-400/50 transition-colors flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  aria-label="Visit Akash Kumar's LinkedIn profile"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <LinkedInIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">LinkedIn</span>
                      <span className="text-[11px] font-mono text-slate-400">Professional</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://github.com/akash-unic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glass-specular p-4 rounded-2xl border border-white/[0.1] hover:border-indigo-400/50 transition-colors flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  aria-label="Visit Akash Kumar's GitHub profile"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/[0.06] text-slate-200 border border-white/[0.1]">
                      <GitHubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">GitHub</span>
                      <span className="text-[11px] font-mono text-slate-400">akash-unic</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Right Column: Functional Direct Inquiry Form (7 cols) */}
            <div className="lg:col-span-7" ref={formGlowRef}>
              <div className="card-glass-specular relative p-6 sm:p-8 rounded-3xl border border-white/[0.14] shadow-2xl shadow-black/80 overflow-hidden group">
                {/* Specular Bevel Line */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:via-indigo-400/50 transition-all duration-300"
                  aria-hidden="true"
                />

                {/* Pointer-Reactive Radial Gradient Overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
                  style={{
                    background:
                      "radial-gradient(var(--glow-size, 450px) circle at var(--mouse-x, -500px) var(--mouse-y, -500px), var(--glow-color, rgba(99, 102, 241, 0.15)), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        Send Direct Message
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      Fill out the form below to initiate an inquiry. Clicking submit composes your message directly to <strong className="text-white">{profile.email}</strong> via your local email client.
                    </p>
                  </div>

                  {submittedStatus && (
                    <div
                      role="status"
                      className="mb-6 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-150"
                    >
                      <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      <span>{submittedStatus}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-mono font-medium text-slate-300 mb-1.5"
                        >
                          Your Name <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className="w-full px-4 py-3 rounded-2xl border border-white/[0.12] bg-[#080c16] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors"
                        />
                        {errors.name && (
                          <p id="name-error" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.name}</span>
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-mono font-medium text-slate-300 mb-1.5"
                        >
                          Your Email <span className="text-rose-400">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          placeholder="e.g. sarah@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className="w-full px-4 py-3 rounded-2xl border border-white/[0.12] bg-[#080c16] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors"
                        />
                        {errors.email && (
                          <p id="email-error" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            <span>{errors.email}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject / Purpose Dropdown */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-xs font-mono font-medium text-slate-300 mb-1.5"
                      >
                        Inquiring About <span className="text-rose-400">*</span>
                      </label>
                      <select
                        id="contact-subject"
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-2xl border border-white/[0.12] bg-[#080c16] text-sm text-white focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors"
                      >
                        <option value="Job Opportunity">Job Opportunity (Junior Web Developer)</option>
                        <option value="Internship Inquiry">Frontend Engineering Internship</option>
                        <option value="Freelance Project">Freelance Web Project</option>
                        <option value="General Conversation">General Conversation / Mentorship</option>
                      </select>
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.subject}</span>
                        </p>
                      )}
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono font-medium text-slate-300 mb-1.5"
                      >
                        Message Details <span className="text-rose-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        required
                        placeholder="Briefly describe the role, project requirements, or what you'd like to discuss..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className="w-full px-4 py-3 rounded-2xl border border-white/[0.12] bg-[#080c16] text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 transition-colors resize-y"
                      />
                      {errors.message && (
                        <p id="message-error" className="mt-1.5 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.message}</span>
                        </p>
                      )}
                    </div>

                    {/* Form Action */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div ref={magneticSubmitRef} className="w-full sm:w-auto">
                        <Button
                          type="submit"
                          variant="primary"
                          size="md"
                          className="w-full sm:w-auto font-semibold shadow-lg shadow-indigo-950/40"
                        >
                          <Send className="w-4 h-4 mr-1.5" />
                          <span>Send via Email Client</span>
                        </Button>
                      </div>

                      <span className="text-[11px] font-mono text-zinc-400 text-center sm:text-right">
                        Direct transmission · Zero third-party telemetry
                      </span>
                    </div>
                  </form>

                  {/* Architecture Rule Note */}
                  <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-start gap-2.5 text-xs text-zinc-400">
                    <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-[11px]">
                      <strong className="text-zinc-300">Security &amp; Reliability Notice:</strong> This terminal uses client-safe <code className="text-indigo-300">mailto:</code> routing to guarantee direct inbox delivery to <span className="text-zinc-200">{profile.email}</span> without third-party form scrapers or insecure client tokens.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};