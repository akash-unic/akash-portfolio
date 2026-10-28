"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
import { useInView } from "@/hooks/useInView";
import { useMagnetic } from "@/hooks/useMagnetic";
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
  const { ref: sectionRef, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const magneticSubmitRef = useMagnetic<HTMLDivElement>({ strength: 0.2 });
  const magneticMailRef = useMagnetic<HTMLDivElement>({ strength: 0.2 });

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

  // Honest Mailto-based Form Dispatcher
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Build properly formatted mailto parameters
    const emailSubject = encodeURIComponent(
      `[Portfolio Inquiry] ${formData.subject} - from ${formData.name}`
    );

    const emailBody = encodeURIComponent(
      `Hi Akash,\n\n${formData.message}\n\n---\nSender Name: ${formData.name}\nReply-To Email: ${formData.email}\nOpportunity Type: ${formData.subject}`
    );

    const mailtoUrl = `mailto:${profile.email}?subject=${emailSubject}&body=${emailBody}`;

    // Launch email client
    window.location.href = mailtoUrl;

    setSubmittedStatus(
      "Your default email client has been launched with your pre-filled inquiry. Please review and send!"
    );
  };

  return (
    <Section
      id="contact"
      surface="canvas-base"
      spacing="default"
      className="scroll-mt-20 border-b border-white/[0.06] relative overflow-hidden"
    >
      {/* Subtle ambient accent */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-violet-600/[0.04] blur-3xl"
        aria-hidden="true"
      />

      <Container size="xl">
        <div
          ref={sectionRef}
          className={`transition-all duration-700 ease-out ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative">
            {/* Left Column: Direct Communication Channels & Sticky Dossier (5 cols) */}
            <div className="lg:col-span-5 sticky-scene-panel space-y-6">
              <SectionHeading
                chapter="06 // ENGAGEMENT"
                badge="Get In Touch"
                title="Direct Contact &amp; Opportunities"
                description="Open for junior web developer roles, frontend engineering internships, and select freelance client projects. Reach out directly through any of the verified channels below."
              />
              {/* Status & Availability Card */}
              <Card surface="elevated" className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="success" size="sm" dot>
                    Actively Available
                  </Badge>
                  <Badge variant="accent" size="sm">
                    BCA 3rd Sem
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-[#f8fafc] tracking-tight">
                  Let&apos;s discuss how I can contribute.
                </h3>

                <p className="text-sm text-[#94a3b8] leading-relaxed">
                  Whether you have an opening for a junior frontend role, an internship opportunity, or a web development project that needs a clean build, I welcome direct conversations.
                </p>

                <div className="pt-3 border-t border-white/[0.08] space-y-2.5 text-xs font-mono text-[#94a3b8]">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Location: India (Remote &amp; On-Site friendly)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>Response Time: Typically within 24 hours</span>
                  </div>
                </div>
              </Card>

              {/* Direct Email Card */}
              <Card surface="default" className="space-y-4 border-indigo-500/20">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white">Direct Email</span>
                  </div>
                  <span className="text-[11px] font-mono text-indigo-300">Primary Channel</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0a0d14] border border-white/[0.08] flex items-center justify-between gap-2">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-white transition-colors truncate focus:outline-none focus-visible:underline"
                  >
                    {profile.email}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="shrink-0 p-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] text-zinc-300 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                    aria-label="Copy email address"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

                <div className="flex gap-2" ref={magneticMailRef}>
                  <Button
                    variant="primary"
                    size="sm"
                    href={`mailto:${profile.email}`}
                    isExternal
                    className="w-full justify-center"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    <span>Open in Mail Client</span>
                  </Button>
                </div>
              </Card>

              {/* Social & Code Profiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://linkedin.com/in/akash-shrivastava-022101317"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-white/[0.08] bg-[#131926]/70 hover:border-white/[0.2] hover:bg-[#182032] transition-colors flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  aria-label="Visit Akash Kumar's LinkedIn profile"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      <LinkedInIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">LinkedIn</span>
                      <span className="text-[11px] font-mono text-zinc-400">Professional</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                </a>

                <a
                  href="https://github.com/akash-unic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border border-white/[0.08] bg-[#131926]/70 hover:border-white/[0.2] hover:bg-[#182032] transition-colors flex items-center justify-between group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  aria-label="Visit Akash Kumar's GitHub profile"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-white/[0.05] text-zinc-300 border border-white/[0.08]">
                      <GitHubIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block">GitHub</span>
                      <span className="text-[11px] font-mono text-zinc-400">akash-unic</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Right Column: Functional Direct Inquiry Form (7 cols) */}
            <div className="lg:col-span-7">
              <Card surface="default" className="p-6 sm:p-8 border-white/[0.1] shadow-2xl">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <h3 className="text-xl font-bold text-[#f8fafc] tracking-tight">
                      Send an Inquiry
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                    Fill out the form below to initiate an inquiry. Clicking submit composes your message directly to <strong className="text-zinc-200">{profile.email}</strong> via your email application.
                  </p>
                </div>

                {submittedStatus && (
                  <div
                    role="status"
                    className="mb-6 p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-150"
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
                        className="block text-xs font-mono font-medium text-zinc-300 mb-1.5"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#0a0d14] text-sm text-[#f8fafc] placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono font-medium text-zinc-300 mb-1.5"
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
                        className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#0a0d14] text-sm text-[#f8fafc] placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
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
                      className="block text-xs font-mono font-medium text-zinc-300 mb-1.5"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#0a0d14] text-sm text-[#f8fafc] focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                    >
                      <option value="Job Opportunity">Job Opportunity (Junior Web Developer)</option>
                      <option value="Internship Inquiry">Frontend Engineering Internship</option>
                      <option value="Freelance Project">Freelance Web Project</option>
                      <option value="General Conversation">General Conversation / Mentorship</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-xs text-rose-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.subject}</span>
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono font-medium text-zinc-300 mb-1.5"
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
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/[0.1] bg-[#0a0d14] text-sm text-[#f8fafc] placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-y"
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-xs text-rose-400 flex items-center gap-1">
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
                        className="w-full sm:w-auto font-semibold"
                      >
                        <Send className="w-4 h-4 mr-1.5" />
                        <span>Launch Email Client</span>
                      </Button>
                    </div>

                    <span className="text-[11px] font-mono text-zinc-400 text-center sm:text-right">
                      Zero intermediary data storage
                    </span>
                  </div>
                </form>

                {/* Transparency Notice / Architecture Rule */}
                <div className="mt-6 pt-5 border-t border-white/[0.08] flex items-start gap-2.5 text-xs text-zinc-400">
                  <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed text-[11px]">
                    <strong className="text-zinc-300">Form Architecture Notice:</strong> This form uses genuine, client-safe <code className="text-indigo-300">mailto:</code> composition to ensure reliable delivery to <span className="text-zinc-200">{profile.email}</span> without third-party tracking or exposed API keys. To enable direct headless API dispatching in production, an authenticated email service (e.g. Resend or Formspree) can be integrated with private server environment variables.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};
