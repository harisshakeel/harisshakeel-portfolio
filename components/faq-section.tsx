"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const faqData = [
  {
    question: "What is TwoPixel and who is it for?",
    answer:
      "TwoPixel is a two-person indie digital studio specializing in custom software development, design, and digital solutions. We work with startups, growing businesses, and established companies who need high-quality digital products built with expertise and precision.",
  },
  {
    question: "What services do you offer?",
    answer:
      "We offer comprehensive digital services including web development, mobile app development, AI automations, lead generation systems, UI/UX design, ecommerce solutions, SaaS MVP development, performance optimization, ongoing maintenance and support, and quick one-day services for urgent needs.",
  },
  {
    question: "How does your project process work?",
    answer:
      "We start with understanding your business goals and requirements, then move through design, development, testing, and deployment phases. You'll be involved throughout the process with regular updates and opportunities for feedback. We keep communication clear and transparent at every stage.",
  },
  {
    question: "Can you work on existing projects?",
    answer:
      "We frequently work on existing projects including bug fixes, feature additions, performance optimization, and complete redesigns. Whether you need ongoing support or a one-time sprint, we can adapt to your needs.",
  },
  {
    question: "What's your typical project timeline?",
    answer:
      "Project timelines vary based on scope and complexity. Simple projects might take 1-4 weeks, while more complex applications take 2-4 months. We'll provide a detailed timeline during the discovery phase after understanding your specific requirements.",
  },
  {
    question: "How do you handle security and data protection?",
    answer:
      "Security is a top priority. We implement industry-standard practices including encryption, secure authentication, compliance with data protection regulations, and regular security audits. Your data and your users' data are always protected with enterprise-grade security measures.",
  },
]

interface FAQItemProps {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}

function FAQItem({ question, answer, isOpen, onToggle }: FAQItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    onToggle()
  }
  return (
    <div
      className={cn(
        "group/row relative border-b border-foreground/[0.06] transition-colors duration-300",
        isOpen && "bg-foreground/[0.015]",
      )}
    >
      {/* Subtle left-edge accent on open */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-1/2 h-8 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-primary/70 to-transparent transition-opacity duration-500",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />

      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-center justify-between gap-6 py-5 pl-4 pr-2 text-left transition-colors duration-300 md:py-6 md:pl-6"
        aria-expanded={isOpen}
      >
        <span
          className={cn(
            "flex-1 text-base font-medium leading-snug tracking-[-0.005em] transition-colors duration-300 md:text-lg",
            isOpen
              ? "text-foreground"
              : "text-foreground/75 group-hover/row:text-foreground",
          )}
        >
          {question}
        </span>

        {/* Chevron in a subtle pill */}
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-500 ease-out",
            isOpen
              ? "border-primary/30 bg-primary/10 text-foreground"
              : "border-foreground/[0.07] bg-foreground/[0.02] text-foreground/55 group-hover/row:border-foreground/[0.14] group-hover/row:text-foreground",
          )}
        >
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-500 ease-out",
              isOpen && "rotate-180",
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0">
          <p className="max-w-3xl pb-7 pl-4 pr-12 text-[14.5px] leading-relaxed text-foreground/70 md:pl-6 md:text-[15.5px]">
            {answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }
  return (
    <section className="relative w-full py-20 md:py-32">
      {/* Soft ambient glow behind the title */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 h-[420px] w-[420px] rounded-full bg-primary/[0.07] blur-[120px]"
      />

      {/* Section header, matches testimonials/projects style */}
      <div className="relative z-10 mx-auto mb-12 max-w-3xl px-6 text-center md:mb-16">
        <p className="mb-5 font-mono text-[10.5px] uppercase tracking-[0.3em] text-primary/75">
          FAQ
        </p>
        <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground md:text-6xl">
          Common questions,
          <br />
          <span className="italic font-normal text-foreground/55">
            answered honestly.
          </span>
        </h2>
        <p className="mx-auto mt-7 max-w-xl text-balance text-[15px] leading-relaxed text-foreground/70 md:text-base">
          Everything you need to know about TwoPixel and how we work, pricing,
          process, timelines, and what happens after launch.
        </p>
      </div>

      <div className="relative z-10 border-t border-foreground/[0.06]">
        {faqData.map((faq, index) => (
          <FAQItem
            key={index}
            {...faq}
            isOpen={openItems.has(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </section>
  )
}
