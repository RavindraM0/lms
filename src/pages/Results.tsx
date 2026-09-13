import { ArrowRight, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow, MetricStrip, PageIntro, PageShell } from "@/components/LuminorSite";

const testimonials = [
  {
    quote: "Luminor didn't just make us look good — they made us impossible to forget. Our engagement tripled in 60 days.",
    name: "Ashok N",
    role: "Founder, Chitradurga Cricket Club",
    tag: "+312% engagement",
    dark: true,
  },
  {
    quote: "They understand the fine line between beautiful and effective. Our content finally converts.",
    name: "Sneha Rao",
    role: "CMO, Ritual House",
    tag: "+212% saves",
    dark: false,
  },
  {
    quote: "Working with Luminor felt like having a creative director, strategist, and editor all in one room. The clarity they brought to our brand was transformative.",
    name: "Rohan Verma",
    role: "CEO, Northstar SaaS",
    tag: "3.8x ROAS",
    dark: false,
  },
  {
    quote: "Our Instagram went from an afterthought to our best-performing sales channel. That's the Luminor effect.",
    name: "Priya Nair",
    role: "Brand Director, Sakshi Tailor",
    tag: "+480% reach",
    dark: true,
  },
  {
    quote: "They took our scattered vision and turned it into a story people actually care about.",
    name: "Karan Shah",
    role: "Co-founder, Morrow Luxury",
    tag: "+180% saves",
    dark: false,
  },
  {
    quote: "The team at Luminor is rare — they think like marketers but create like artists. Best investment we made this year.",
    name: "Disha Kapoor",
    role: "Head of Growth, Graines Lotus",
    tag: "2.4x conversions",
    dark: false,
  },
];

export default function Results() {
  return (
    <PageShell>
      <main>
        <PageIntro
          eyebrow="Selected outcomes"
          title={<>The work speaks <span className="italic text-[#ffbf00]">louder.</span></>}
          description="A few ways we've helped brands become more themselves — and more valuable because of it."
        />

        {/* Metrics */}
        <section className="mx-auto max-w-[1320px] px-5 pb-24 lg:px-8 lg:pb-32" data-testid="results-metrics-section">
          <MetricStrip />
        </section>

        {/* Testimonials Grid */}
        <section className="border-y border-[#e8e1ce] bg-[#f7f1e3] py-24 lg:py-32" data-testid="results-testimonials-section">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-8">

            {/* Header */}
            <div className="mb-16 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <Eyebrow>Client voices</Eyebrow>
                <h2 className="mt-4 font-serif text-5xl tracking-tight">
                  What our clients <span className="italic text-[#ffbf00]">say.</span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-[#575247]">
                Real words from real brands we've had the privilege of building with.
              </p>
            </div>

            {/* Masonry-style grid */}
            <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`mb-6 break-inside-avoid rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                    t.dark
                      ? "border-transparent bg-[#1a1814] text-[#fffbf2]"
                      : "border-[#e8e1ce] bg-[#fffbf2] text-[#1a1814]"
                  }`}
                  data-testid={`testimonial-card-${i}`}
                >
                  {/* Quote icon */}
                  <Quote
                    className={`mb-5 size-6 ${t.dark ? "text-[#ffbf00]" : "text-[#ffbf00]"}`}
                    fill="currentColor"
                  />

                  {/* Quote text */}
                  <p className={`font-serif text-xl leading-relaxed tracking-tight sm:text-2xl ${t.dark ? "text-[#fffbf2]" : "text-[#1a1814]"}`}>
                    "{t.quote}"
                  </p>

                  {/* Footer */}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="size-2 shrink-0 rounded-full bg-[#ffbf00]" />
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className={`text-xs ${t.dark ? "text-[#8c8474]" : "text-[#8c8474]"}`}>{t.role}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#ffbf00] px-3 py-1 font-mono text-[10px] font-semibold text-[#1a1814]">
                      {t.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#1a1814] text-[#fffbf2]" data-testid="results-bottom-cta">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-8 px-5 py-20 sm:flex-row sm:items-end sm:justify-between lg:px-8 lg:py-28">
            <h2 className="max-w-xl font-serif text-5xl tracking-tight sm:text-6xl">
              What would your before + after look like?
            </h2>
            <Link
              to="/contact"
              className="inline-flex shrink-0 items-center rounded-full bg-[#ffbf00] px-6 py-3.5 text-sm font-semibold text-[#1a1814] transition hover:-translate-y-1 hover:bg-[#e5ab00]"
              data-testid="results-contact-link"
            >
              Find out <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}