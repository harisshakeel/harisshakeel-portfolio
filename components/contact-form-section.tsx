"use client"

import { useState } from "react"
import emailjs from "@emailjs/browser"

interface ContactFormSectionProps {
  /** "embedded" trims outer padding for use inside another card. Default "section". */
  variant?: "section" | "embedded"
}

export function ContactFormSection({ variant = "section" }: ContactFormSectionProps = {}) {
  const embedded = variant === "embedded"
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
      const templateId1 = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_1
      const templateId2 = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2
      const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID

      if (!serviceId || !templateId1 || !userId) {
        throw new Error("EmailJS configuration is missing. Please check your environment variables.")
      }

      const detailsBlock = [
        formData.company ? `Company: ${formData.company}` : null,
        formData.phone ? `Phone: ${formData.phone}` : null,
        formData.projectType ? `Project type: ${formData.projectType}` : null,
        formData.budget ? `Budget: ${formData.budget}` : null,
        formData.timeline ? `Timeline: ${formData.timeline}` : null,
      ]
        .filter(Boolean)
        .join("\n")

      const templateData = {
        from_name: formData.name,
        from_email: formData.email,
        message: detailsBlock ? `${detailsBlock}\n\n${formData.message}` : formData.message,
      }

      // Send first email (notification to TwoPixel team)
      await emailjs.send(serviceId, templateId1, templateData, userId)

      // Send second email (confirmation to client) - Optional
      if (templateId2) {
        try {
          await emailjs.send(serviceId, templateId2, templateData, userId)
        } catch (error) {
          console.warn("Second email template failed:", error)
          // Continue even if second email fails
        }
      }

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
      })
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      })
    } catch (error) {
      console.error("EmailJS error:", error)
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again or contact us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (embedded) {
    const inputClass =
      "w-full rounded-xl border border-foreground/[0.07] bg-foreground/[0.03] px-4 py-3.5 text-[15px] text-foreground placeholder:text-muted-foreground/50 transition-all focus:border-primary/40 focus:bg-foreground/[0.05] focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50"
    const labelClass = "text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"

    return (
      <div className="relative overflow-hidden rounded-3xl border border-foreground/[0.07] bg-gradient-to-b from-foreground/[0.04] to-foreground/[0.015] p-6 shadow-[0_1px_0_0_hsl(var(--glow)/0.04)_inset,0_30px_80px_-30px_rgba(168,85,247,0.18)] md:p-9">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/[0.08] blur-3xl"
        />

        <form className="relative flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={labelClass}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className={inputClass}
                placeholder="you@company.com"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className={labelClass}>
                Company <span className="ml-1 text-[10px] normal-case tracking-normal text-muted-foreground/60">(optional)</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                disabled={isSubmitting}
                className={inputClass}
                placeholder="Acme Inc."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className={labelClass}>
                Phone <span className="ml-1 text-[10px] normal-case tracking-normal text-muted-foreground/60">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                disabled={isSubmitting}
                className={inputClass}
                placeholder="+1 (000) 000 0000"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="projectType" className={labelClass}>
              What can I help you with?
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              disabled={isSubmitting}
              className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2210%22%20height=%226%22%20viewBox=%220%200%2010%206%22%20fill=%22none%22><path%20d=%22M1%201l4%204%204-4%22%20stroke=%22%23a78bfa%22%20stroke-width=%221.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22/></svg>')] bg-[length:10px_6px] bg-[right_1rem_center] bg-no-repeat pr-10`}
            >
              <option value="">Select a service…</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="SaaS MVP">SaaS MVP</option>
              <option value="AI Automations / Agents">AI Automations / Agents</option>
              <option value="UI/UX & Branding">UI/UX & Branding</option>
              <option value="Ecommerce">Ecommerce</option>
              <option value="Lead Gen / Email Deliverability">Lead Gen / Email Deliverability</option>
              <option value="SEO / GEO / Performance">SEO / GEO / Performance</option>
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="budget" className={labelClass}>
                Budget
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2210%22%20height=%226%22%20viewBox=%220%200%2010%206%22%20fill=%22none%22><path%20d=%22M1%201l4%204%204-4%22%20stroke=%22%23a78bfa%22%20stroke-width=%221.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22/></svg>')] bg-[length:10px_6px] bg-[right_1rem_center] bg-no-repeat pr-10`}
              >
                <option value="">Select a range…</option>
                <option value="< $2k">Under $2k</option>
                <option value="$2k–$5k">$2k – $5k</option>
                <option value="$5k–$15k">$5k – $15k</option>
                <option value="$15k–$50k">$15k – $50k</option>
                <option value="$50k+">$50k+</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="timeline" className={labelClass}>
                Timeline
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                disabled={isSubmitting}
                className={`${inputClass} appearance-none bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2210%22%20height=%226%22%20viewBox=%220%200%2010%206%22%20fill=%22none%22><path%20d=%22M1%201l4%204%204-4%22%20stroke=%22%23a78bfa%22%20stroke-width=%221.5%22%20stroke-linecap=%22round%22%20stroke-linejoin=%22round%22/></svg>')] bg-[length:10px_6px] bg-[right_1rem_center] bg-no-repeat pr-10`}
              >
                <option value="">Select a timeline…</option>
                <option value="ASAP">ASAP</option>
                <option value="1–2 weeks">1–2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2–3 months">2–3 months</option>
                <option value="Just exploring">Just exploring</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className={labelClass}>
              Tell me about your project
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              disabled={isSubmitting}
              className={`${inputClass} resize-none`}
              placeholder="Goals, audience, references, anything that helps me understand the brief…"
            />
          </div>

          {submitStatus.type && (
            <div
              className={`rounded-xl border px-4 py-3 text-sm ${
                submitStatus.type === "success"
                  ? "border-green-500/20 bg-green-500/10 text-green-400"
                  : "border-red-500/20 bg-red-500/10 text-red-400"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground/80">
              I respond within 24 hours. No spam, ever.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-primary to-primary/85 px-7 py-3 text-sm font-semibold tracking-wide text-primary-foreground shadow-[0_8px_30px_-8px_rgba(168,85,247,0.55)] transition-all hover:shadow-[0_10px_40px_-8px_rgba(168,85,247,0.75)] hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
            >
              {isSubmitting ? "Sending…" : "Send Message →"}
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <section
      id="contact-section"
      className="w-full max-w-[1320px] mx-auto px-5 py-8 md:py-16"
    >
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-foreground text-2xl md:text-3xl font-semibold">Get in Touch</h3>
            <p className="text-muted-foreground text-sm md:text-base">Send me a message and I'll get back to you soon.</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-foreground text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent focus:bg-foreground/[0.07] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-foreground text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent focus:bg-foreground/[0.07] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="your.email@example.com"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-foreground text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                disabled={isSubmitting}
                className="w-full px-4 py-2.5 rounded-lg bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-transparent focus:bg-foreground/[0.07] transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Tell us about your project..."
              />
            </div>
            {submitStatus.type && (
              <div
                className={`px-4 py-3 rounded-lg text-sm ${
                  submitStatus.type === "success"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {submitStatus.message}
              </div>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="group/btn relative w-full overflow-hidden px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-semibold tracking-wide shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.01] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

