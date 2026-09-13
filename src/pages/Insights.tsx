import { useState, useMemo, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Check,
  Clock,
  Copy,
  Search,
  Sparkles,
  TrendingUp,
  X,
  ChevronRight,
  Bookmark,
  Layers,
  Flame,
  Lightbulb,
  FileText,
  Compass,
} from "lucide-react";
import { toast } from "sonner";
import { Eyebrow, PageIntro, PageShell } from "@/components/LuminorSite";

interface InsightArticle {
  id: string;
  category: "Social Strategy" | "Creative Direction" | "Paid Media" | "Brand Systems" | "Regional Growth";
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  featured?: boolean;
  takeaway: string;
  summary: string;
  sections: {
    heading: string;
    body: string[];
    quote?: string;
    bulletPoints?: string[];
  }[];
}

const INSIGHTS_DATA: InsightArticle[] = [
  {
    id: "quiet-shift-reach-to-resonance",
    category: "Social Strategy",
    featured: true,
    title: "The Quiet Shift from Reach to Resonance",
    subtitle: "Why the brands winning in 2026 optimize for the second action, not just the fleeting impression.",
    readTime: "5 min read",
    date: "Sep 2026",
    author: {
      name: "Preetham A",
      role: "Founder & Creative Director",
      initials: "PA",
    },
    takeaway: "True organic distribution today comes from 'saves' and 'direct shares' to friends, not vanity likes.",
    summary: "Algorithms have evolved from chronological feeds to interest graphs, and now to intimacy engines. Here is the framework we use to ensure content triggers conversation rather than mindless scrolling.",
    sections: [
      {
        heading: "1. The Vanity Metric Trap",
        body: [
          "For years, agency reporting was dominated by impressions, raw views, and heart counts. But in the current landscape, an impression is often just a thumb pausing for 1.1 seconds before continuing to scroll.",
          "Platform algorithms now heavily weight the 'second action'—did the user share the reel into a private DM group? Did they save it to a collection to revisit this weekend? Did they comment with a genuine opinion rather than an emoji?",
        ],
        quote: "If your content doesn't give the viewer something to look smart, inspired, or helpful when they forward it, it dies in the feed.",
      },
      {
        heading: "2. The Conversation Architecture",
        body: [
          "Every high-performing post we publish is engineered around a singular question or counter-intuitive observation. We do not broadcast; we initiate.",
          "When structuring video hooks, we spend 60% of our creative bandwidth on the first 2 seconds. But the final 3 seconds matter just as much: the call-to-thought that naturally compels the viewer to discuss it with a peer.",
        ],
        bulletPoints: [
          "Optimize for private DMs: Craft observations people send to their co-founders or best friends.",
          "Frame clear contrarian views without manufactured rage-bait.",
          "Anchor every visual story in hyper-specific cultural or business truth.",
        ],
      },
      {
        heading: "3. What This Means for Your Brand",
        body: [
          "Instead of posting 5 times a week to feed an imaginary quota, post 2 times with unmatched production clarity, nuanced voice, and immediate utility. Quality creates compounding brand equity; spam creates audience fatigue.",
        ],
      },
    ],
  },
  {
    id: "anatomy-of-high-retention-reels",
    category: "Creative Direction",
    title: "The Anatomy of a 3M+ View Reel",
    subtitle: "Pacing, audio cueing, and visual velocity: a director's breakdown of short-form mechanics.",
    readTime: "6 min read",
    date: "Aug 2026",
    author: {
      name: "Sagar RS",
      role: "Technical & Production Advisor",
      initials: "SR",
    },
    takeaway: "Audio sync and pattern interruptions every 2.4 seconds maintain watch time above the critical 85% threshold.",
    summary: "Viral short-form isn't lucky lightning—it's structured cinematic choreography. We dissect the retention curve of our top client releases.",
    sections: [
      {
        heading: "The 3-Second Retention Cliff",
        body: [
          "Over 65% of viewers drop off before second 3 if the initial shot lacks kinetic energy or a visual curiosity gap. Static talking heads with standard titles are filtered out instinctively by modern consumers.",
          "We introduce movement along two axes: camera push-in combined with ambient sound design that peaks immediately before the hook statement.",
        ],
        quote: "You have 1.2 seconds to justify why someone should lend you their most finite asset: their cognitive attention.",
      },
      {
        heading: "Pattern Interruption Frequency",
        body: [
          "A static visual framing longer than 3 seconds allows the brain to predict what comes next. By alternating between macro detail shots, dynamic text overlays, and abrupt sound dropouts, the attention curve resets continually.",
        ],
        bulletPoints: [
          "Visual pacing: Cut on physical action rather than pauses in speech.",
          "Sound design: Layer subtle foley (whooshes, vinyl clicks, bass drops) beneath dialogue.",
          "Text hierarchy: Max 4 words on screen simultaneously for rapid readability.",
        ],
      },
    ],
  },
  {
    id: "paid-performance-meets-taste",
    category: "Paid Media",
    title: "Creative Performance Loop: When Taste Meets Data",
    subtitle: "What happens when your media buyers and art directors stop operating in separate silos.",
    readTime: "4 min read",
    date: "Aug 2026",
    author: {
      name: "Chetas",
      role: "Creative Head",
      initials: "CK",
    },
    takeaway: "The ad creative is the new targeting algorithm. Distinctive brand codes consistently drive down blended CAC.",
    summary: "With broad targeting and machine-learning attribution, the creative itself does the targeting. High aesthetics no longer have to sacrifice conversion math.",
    sections: [
      {
        heading: "Targeting Through Visual Identity",
        body: [
          "With modern Meta and Google ad delivery algorithms, fine-grained demographic interest clusters are obsolete. The model tests creative variations against broad audiences, using who watches and clicks to self-segment.",
          "If your ad looks like cheap affiliate marketing, you attract bargain hunters who churn. If your ad looks like a world-class editorial piece, you command premium margins.",
        ],
      },
      {
        heading: "The Rapid Creative Iteration Framework",
        body: [
          "We test 4 distinct visual hooks against 1 core offer. Once a winning angle emerges, we iterate on pacing, typography, and sonic palette rather than rebuilding the campaign from scratch.",
        ],
        bulletPoints: [
          "Hook 1: Direct problem agitation with sensory macro video.",
          "Hook 2: Third-party documentary-style validation.",
          "Hook 3: Counter-intuitive comparison breakdown.",
          "Hook 4: Aesthetic aspirational world-building.",
        ],
      },
    ],
  },
  {
    id: "brand-is-feeling-before-funnel",
    category: "Brand Systems",
    title: "Your Brand is a Feeling Before It is a Funnel",
    subtitle: "A practical guide to building consistency that never feels like rigid repetition.",
    readTime: "7 min read",
    date: "Jul 2026",
    author: {
      name: "Sanjana A",
      role: "Brand Strategy & Operations",
      initials: "SA",
    },
    takeaway: "Brand guidelines should be guardrails for intuition, not handcuffs that stifle agility.",
    summary: "Consumers don't experience your brand as a conversion flowchart. They experience it as a cumulative emotional residue left behind after every interaction.",
    sections: [
      {
        heading: "Beyond Color Hex Codes and Logo Clear-Space",
        body: [
          "Most brand style guides sit in dusty Google Drive folders because they specify rules for a static world: billboard specs, letterhead margins, print CMYK values. But contemporary brands live in dynamic kinetic environments.",
          "A living brand identity specifies how you sound when responding to an unhappy customer on Instagram, what camera shutter rhythm you use in behind-the-scenes footage, and the degree of warmth in your typographic layout.",
        ],
        quote: "People will forget what you claimed in your carousel, but they will never forget the taste level you demonstrated.",
      },
      {
        heading: "The 3 Immutable Anchors",
        body: [
          "Pick three sensory elements that never waver: for example, your signature amber highlight hue, a specific musical key for sonic transitions, and an unapologetic editorial tone of voice. Everything else can and should adapt to context.",
        ],
      },
    ],
  },
  {
    id: "regional-commerce-digital-awakening",
    category: "Regional Growth",
    title: "The Tier-2 & Tier-3 Digital Awakening",
    subtitle: "Lessons from scaling heritage brands in Chitradurga, Davangere, and beyond.",
    readTime: "5 min read",
    date: "Jun 2026",
    author: {
      name: "Ravindra M.O",
      role: "Web Developer & Digital Lead",
      initials: "RM",
    },
    takeaway: "Authentic regional storytelling and multi-lingual nuance out-convert generic metropolitan ad campaigns 4 to 1.",
    summary: "How regional institutions—from historic medical suppliers to beloved culinary landmarks—unlock exponential growth when modern digital execution honors their roots.",
    sections: [
      {
        heading: "The Untapped Regional Commerce Opportunity",
        body: [
          "Many agencies assume digital sophistication is exclusively for metropolitan startups. That is a colossal miscalculation.",
          "Local legacy businesses possess decades of generational trust. When you pair that deep-rooted credibility with cinematic visuals, frictionless WhatsApp ordering, and targeted geo-fencing, the community response is electric.",
        ],
        quote: "Trust takes 30 years to build on the high street; our job is simply to translate that goodwill into pixels without losing an ounce of soul.",
      },
      {
        heading: "Case In Point: The Heritage Re-imagining",
        body: [
          "Working with esteemed regional partners like Sri Ranga Medicals, Top In Town, and Chitradurga Cricket Club proved that when community pride meets crisp design, organic engagement naturally skyrockets.",
        ],
        bulletPoints: [
          "Bilingual communication: Honor local language cadence alongside modern English design.",
          "Familiar faces: Celebrate long-time staff and community patrons in visual stories.",
          "Frictionless accessibility: Direct call-to-action to phone, store visit, or instant messaging.",
        ],
      },
    ],
  },
  {
    id: "seven-day-content-engine",
    category: "Creative Direction",
    title: "The 7-Day Social Content Engine",
    subtitle: "How our studio produces 30 high-value, bespoke brand assets in a single 4-hour batch.",
    readTime: "4 min read",
    date: "May 2026",
    author: {
      name: "Gokul",
      role: "Graphic & Motion Designer",
      initials: "GK",
    },
    takeaway: "Batching concepts by narrative pillar rather than filming day-by-day reduces burnout and guarantees aesthetic synergy.",
    summary: "Consistent social posting shouldn't feel like a daily sprint toward a deadline. Here is our step-by-step studio workflow for continuous creative momentum.",
    sections: [
      {
        heading: "Pre-Production Architecture",
        body: [
          "90% of a successful shoot happens before the camera battery is charged. We map each month into four distinct pillars: Educational Breakdown, Behind-the-Craft, Cultural Moment, and Proof/Case Study.",
          "By scripting modular segments that share lighting setups, our production team captures an entire month of multifaceted content in a single afternoon session.",
        ],
      },
      {
        heading: "Post-Production Grading & Sound Beds",
        body: [
          "Standardized color LUTs and proprietary sound design stems ensure every asset feels undeniably like part of the same cinematic universe, regardless of when it was shot.",
        ],
      },
    ],
  },
];

const CATEGORIES = [
  "All",
  "Social Strategy",
  "Creative Direction",
  "Paid Media",
  "Brand Systems",
  "Regional Growth",
] as const;

export default function Insights() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<InsightArticle | null>(null);
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("luminor_saved_insights");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const toggleSave = (id: string, event?: MouseEvent) => {
    event?.stopPropagation();
    setSavedArticles((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("luminor_saved_insights", JSON.stringify(next));
      } catch {
        // ignore
      }
      if (next.includes(id)) {
        toast.success("Saved to your reading list");
      } else {
        toast.info("Removed from saved articles");
      }
      return next;
    });
  };

  const copyArticleLink = (title: string, event?: MouseEvent) => {
    event?.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    toast.success(`Copied link for "${title}"`);
  };

  const filteredArticles = useMemo(() => {
    return INSIGHTS_DATA.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const term = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !term ||
        article.title.toLowerCase().includes(term) ||
        article.subtitle.toLowerCase().includes(term) ||
        article.summary.toLowerCase().includes(term) ||
        article.takeaway.toLowerCase().includes(term) ||
        article.author.name.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredArticle = useMemo(() => {
    return INSIGHTS_DATA.find((a) => a.featured) || INSIGHTS_DATA[0];
  }, []);

  return (
    <PageShell>
      <main className="relative">
        {/* Page Intro Hero */}
        <PageIntro
          eyebrow="The Luminor Field Notes & Essays"
          title={
            <>
              Ideas for a <span className="italic text-[#ffbf00]">brighter</span> brand.
            </>
          }
          description="Unfiltered perspectives on creative direction, viral dynamics, and the quiet strategic decisions that give modern brands staying power."
        />

        {/* Featured Editorial Dispatch Banner - Clean Typographic Layout (No Photos) */}
        <section
          className="mx-auto max-w-[1320px] px-5 pb-16 lg:px-8"
          data-testid="featured-insight-section"
        >
          <div
            onClick={() => setActiveArticle(featuredArticle)}
            className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#e8e1ce] bg-white p-8 transition-all duration-300 hover:border-[#ffbf00] hover:shadow-[0_20px_40px_rgba(26,24,20,0.06)] sm:p-10 lg:p-12"
            data-testid="featured-insight-card"
          >
            {/* Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e8e1ce] pb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1a1814] px-3.5 py-1 text-xs font-semibold tracking-wider text-[#fffbf2]">
                  <Sparkles className="size-3 text-[#ffbf00]" />
                  FEATURED ESSAY
                </span>
                <span className="eyebrow text-[#8f6b00]">
                  {featuredArticle.category}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-[#8c8474]">
                <span className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  {featuredArticle.readTime}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" />
                  {featuredArticle.date}
                </span>
              </div>
            </div>

            {/* Headline and Subtitle */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-[#1a1814] transition-colors group-hover:text-[#b38600] sm:text-4xl lg:text-5xl">
                  {featuredArticle.title}
                </h2>

                <p className="mt-4 text-base leading-relaxed text-[#575247]">
                  {featuredArticle.subtitle}
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#8c8474]">
                  {featuredArticle.summary}
                </p>
              </div>

              {/* Distinctive Executive Takeaway Display Box */}
              <div className="rounded-2xl border border-[#ffbf00]/40 bg-[#fffbf2] p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <Lightbulb className="size-4 text-[#ffbf00]" />
                  <span className="eyebrow text-[#8f6b00]">Core Takeaway</span>
                </div>
                <p className="mt-3 font-serif text-lg font-medium leading-snug text-[#1a1814]">
                  "{featuredArticle.takeaway}"
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[#e8e1ce] pt-3 text-xs text-[#8c8474]">
                  <span>Field Note No. 01</span>
                  <span className="font-mono text-[#ffbf00]">LUMINOR INSIGHT</span>
                </div>
              </div>
            </div>

            {/* Footer Bar */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e8e1ce] pt-6">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#1a1814] font-mono text-xs font-bold text-[#ffbf00]">
                  {featuredArticle.author.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1814]">
                    {featuredArticle.author.name}
                  </p>
                  <p className="text-xs text-[#8c8474]">
                    {featuredArticle.author.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => toggleSave(featuredArticle.id, e)}
                  className="flex size-9 items-center justify-center rounded-full border border-[#e8e1ce] text-[#575247] transition hover:border-[#ffbf00] hover:text-[#1a1814]"
                  title="Bookmark essay"
                >
                  <Bookmark
                    className={`size-4 ${
                      savedArticles.includes(featuredArticle.id)
                        ? "fill-[#ffbf00] text-[#ffbf00]"
                        : ""
                    }`}
                  />
                </button>
                <span className="inline-flex items-center rounded-full bg-[#ffbf00] px-4 py-2 text-xs font-semibold text-[#1a1814] shadow-sm transition group-hover:bg-[#e5ab00]">
                  Read full review
                  <ArrowRight className="ml-1.5 size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Core Strategic Pillars Ribbon */}
        <section className="border-y border-[#e8e1ce] bg-[#f7f1e3]/60 py-10">
          <div className="mx-auto max-w-[1320px] px-5 lg:px-8">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#ffbf00]/20 text-[#1a1814]">
                  <Flame className="size-5 text-[#c29100]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1a1814]">
                    The 1.2-Second Law
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#575247]">
                    Without visual momentum in the opening frame, copy polish and offer quality will never be discovered.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#ffbf00]/20 text-[#1a1814]">
                  <Compass className="size-5 text-[#c29100]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1a1814]">
                    The Save-Over-Like Ratio
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#575247]">
                    Content that earns private bookmarking compounds audience trust exponentially faster than vanity reactions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-[#ffbf00]/20 text-[#1a1814]">
                  <Layers className="size-5 text-[#c29100]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#1a1814]">
                    Consistent Taste Index
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#575247]">
                    Every touchpoint—from local store banner to 4K reel—must broadcast the same uncompromising design standard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & Search Header */}
        <section
          className="mx-auto max-w-[1320px] px-5 pt-14 pb-20 lg:px-8 lg:pb-28"
          data-testid="insights-archive-section"
        >
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="flex flex-wrap items-center gap-2"
              role="tablist"
              aria-label="Insights categories"
            >
              {CATEGORIES.map((category) => {
                const count =
                  category === "All"
                    ? INSIGHTS_DATA.length
                    : INSIGHTS_DATA.filter((a) => a.category === category).length;
                const isSelected = selectedCategory === category;
                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition ${
                      isSelected
                        ? "border-[#1a1814] bg-[#1a1814] text-[#fffbf2] shadow-sm"
                        : "border-[#e8e1ce] bg-white text-[#575247] hover:border-[#ffbf00] hover:text-[#1a1814]"
                    }`}
                    data-testid={`filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span>{category}</span>
                    <span
                      className={`size-4 rounded-full text-[10px] flex items-center justify-center ${
                        isSelected
                          ? "bg-[#ffbf00] text-[#1a1814]"
                          : "bg-[#f7f1e3] text-[#8c8474]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-[#8c8474]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, topics, authors..."
                aria-label="Search insights"
                className="h-10 w-full rounded-full border border-[#e8e1ce] bg-white pl-10 pr-9 text-xs outline-none transition focus:border-[#ffbf00] focus:ring-2 focus:ring-[#ffbf00]/20"
                data-testid="insights-search-input"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c8474] hover:text-[#1a1814]"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Articles Grid - Clean Typographic Layout (No Photos) */}
          {filteredArticles.length === 0 ? (
            <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#e8e1ce] bg-white/50 p-12 text-center">
              <BookOpen className="size-10 text-[#8c8474]" />
              <h3 className="mt-4 font-serif text-2xl font-medium text-[#1a1814]">
                No insights found
              </h3>
              <p className="mt-2 text-sm text-[#575247]">
                We couldn't find any articles matching "{searchQuery}". Try selecting a different topic or clearing your search.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-5 inline-flex items-center rounded-full bg-[#1a1814] px-5 py-2 text-xs font-semibold text-[#fffbf2]"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="group flex cursor-pointer flex-col justify-between rounded-3xl border border-[#e8e1ce] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#ffbf00] hover:shadow-[0_16px_32px_rgba(26,24,20,0.06)]"
                  data-testid={`insight-card-${article.id}`}
                >
                  <div>
                    {/* Header bar */}
                    <div className="flex items-center justify-between border-b border-[#e8e1ce]/80 pb-4">
                      <span className="rounded-full bg-[#fffbf2] border border-[#e8e1ce] px-3 py-1 text-[11px] font-semibold text-[#1a1814]">
                        {article.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => toggleSave(article.id, e)}
                          className="flex size-7 items-center justify-center rounded-full border border-[#e8e1ce] bg-[#fffbf2] text-[#575247] transition hover:border-[#ffbf00] hover:text-[#ffbf00]"
                          title="Bookmark essay"
                        >
                          <Bookmark
                            className={`size-3.5 ${
                              savedArticles.includes(article.id)
                                ? "fill-[#ffbf00] text-[#ffbf00]"
                                : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Metadata & Title */}
                    <div className="mt-5">
                      <div className="flex items-center gap-3 text-xs font-mono text-[#8c8474]">
                        <span className="flex items-center gap-1">
                          <Clock className="size-3" />
                          {article.readTime}
                        </span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="mt-3 font-serif text-2xl font-medium leading-snug tracking-tight text-[#1a1814] transition group-hover:text-[#b38600]">
                        {article.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-xs leading-relaxed text-[#575247]">
                        {article.summary}
                      </p>
                    </div>

                    {/* Takeaway callout */}
                    <div className="mt-5 rounded-2xl border-l-2 border-[#ffbf00] bg-[#fffbf2] p-3.5 text-xs text-[#575247]">
                      <p className="font-semibold text-[11px] uppercase tracking-wider text-[#1a1814]">
                        Core insight:
                      </p>
                      <p className="mt-1 line-clamp-2 italic text-[#575247]">
                        "{article.takeaway}"
                      </p>
                    </div>
                  </div>

                  {/* Author and Action */}
                  <div className="mt-6 border-t border-[#e8e1ce]/80 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-7 items-center justify-center rounded-full bg-[#f7f1e3] border border-[#e8e1ce] font-mono text-[10px] font-bold text-[#1a1814]">
                          {article.author.initials}
                        </div>
                        <span className="text-xs font-medium text-[#1a1814]">
                          {article.author.name}
                        </span>
                      </div>

                      <span className="inline-flex items-center text-xs font-semibold text-[#1a1814] transition group-hover:text-[#ffbf00]">
                        Read review
                        <ChevronRight className="ml-1 size-3.5 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Free Resources & Consultation Banner */}
        <section
          className="border-t border-[#e8e1ce] bg-[#1a1814] text-[#fffbf2]"
          data-testid="insights-newsletter-section"
        >
          <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:px-8 lg:py-28">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#fffbf2]/20 bg-[#fffbf2]/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#ffbf00]">
                <TrendingUp className="size-3.5" />
                MONTHLY STRATEGY DISPATCH
              </div>
              <h2 className="mt-6 font-serif text-4xl leading-tight tracking-tight text-[#fffbf2] sm:text-5xl lg:text-6xl">
                Ideas worth keeping in your back pocket.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[#b9b1a2]">
                Join founders, creative directors, and marketing leaders who read the Luminor Letter. We share teardowns of real campaigns, production frameworks, and what is truly driving organic traction right now.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-[#b9b1a2]">
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-[#ffbf00]" /> Zero sales fluff
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-[#ffbf00]" /> One curated note a month
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-[#ffbf00]" /> Unsubscribe anytime
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-[#fffbf2]/15 bg-white/5 p-8 backdrop-blur-md">
              <h3 className="font-serif text-2xl font-medium text-[#fffbf2]">
                Have a brand ready for its next chapter?
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#b9b1a2]">
                We review your current social positioning, creative output, and ad spend to pinpoint immediate leverage points.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full bg-[#ffbf00] px-6 text-sm font-semibold text-[#1a1814] shadow-md transition hover:bg-[#e5ab00]"
                  data-testid="insights-start-conversation-button"
                >
                  Start a conversation <ArrowRight className="ml-2 size-4" />
                </Link>
                <Link
                  to="/results"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-[#fffbf2]/30 px-6 text-sm font-semibold text-[#fffbf2] transition hover:bg-white/10"
                  data-testid="insights-see-results-button"
                >
                  Explore our results
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Full Article Reading & Review Modal / Overlay - Completely Photo-Free */}
        {activeArticle && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1814]/80 p-4 backdrop-blur-md overflow-y-auto"
            onClick={() => setActiveArticle(null)}
            data-testid="article-reader-modal"
          >
            <div
              className="relative my-8 w-full max-w-3xl rounded-3xl border border-[#e8e1ce] bg-[#fffbf2] p-6 shadow-2xl sm:p-10 lg:p-12"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute right-5 top-5 flex size-10 items-center justify-center rounded-full border border-[#e8e1ce] bg-white text-[#1a1814] transition hover:bg-[#ffbf00]"
                aria-label="Close review"
                data-testid="close-article-modal"
              >
                <X className="size-5" />
              </button>

              {/* Header meta */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[#ffbf00]/20 px-3 py-1 text-xs font-semibold text-[#8f6b00]">
                  {activeArticle.category}
                </span>
                <span className="font-mono text-xs text-[#8c8474]">
                  {activeArticle.readTime}
                </span>
                <span className="text-xs text-[#8c8474]">•</span>
                <span className="font-mono text-xs text-[#8c8474]">
                  {activeArticle.date}
                </span>
              </div>

              {/* Title & subtitle */}
              <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-[#1a1814] sm:text-4xl">
                {activeArticle.title}
              </h2>
              <p className="mt-3 text-base text-[#575247]">
                {activeArticle.subtitle}
              </p>

              {/* Author and Action bar - Monogram Initials (No Photo) */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-[#e8e1ce] py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-[#1a1814] font-mono text-sm font-bold text-[#ffbf00] shadow-sm">
                    {activeArticle.author.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#1a1814]">
                      {activeArticle.author.name}
                    </h4>
                    <p className="text-xs text-[#8c8474]">
                      {activeArticle.author.role}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => toggleSave(activeArticle.id, e)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e1ce] bg-white px-3.5 py-1.5 text-xs font-medium text-[#575247] transition hover:border-[#ffbf00]"
                  >
                    <Bookmark
                      className={`size-3.5 ${
                        savedArticles.includes(activeArticle.id)
                          ? "fill-[#ffbf00] text-[#ffbf00]"
                          : ""
                      }`}
                    />
                    {savedArticles.includes(activeArticle.id) ? "Saved" : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={(e) => copyArticleLink(activeArticle.title, e)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#e8e1ce] bg-white px-3.5 py-1.5 text-xs font-medium text-[#575247] transition hover:border-[#ffbf00]"
                  >
                    <Copy className="size-3.5" />
                    Copy link
                  </button>
                </div>
              </div>

              {/* Key Takeaway Callout Box (No Photo in Review Section) */}
              <div className="mt-6 rounded-2xl border border-[#ffbf00]/50 bg-[#fff5d6] p-5">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-[#8f6b00]" />
                  <p className="eyebrow text-[#8f6b00]">Executive Takeaway</p>
                </div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#1a1814]">
                  {activeArticle.takeaway}
                </p>
              </div>

              {/* Article Content Sections */}
              <div className="mt-8 space-y-8 text-sm leading-7 text-[#575247]">
                {activeArticle.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="font-serif text-xl font-semibold text-[#1a1814]">
                      {section.heading}
                    </h3>
                    {section.body.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}

                    {section.quote && (
                      <blockquote className="my-5 rounded-2xl border-l-4 border-[#ffbf00] bg-white p-5 italic text-[#1a1814] shadow-sm">
                        "{section.quote}"
                      </blockquote>
                    )}

                    {section.bulletPoints && (
                      <ul className="my-4 space-y-2 pl-2">
                        {section.bulletPoints.map((pt, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#ffbf00]" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {/* Bottom navigation / Close */}
              <div className="mt-10 flex items-center justify-between border-t border-[#e8e1ce] pt-6">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="inline-flex items-center text-xs font-semibold text-[#575247] hover:text-[#1a1814]"
                >
                  ← Back to all insights
                </button>

                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full bg-[#ffbf00] px-5 py-2.5 text-xs font-semibold text-[#1a1814] hover:bg-[#e5ab00]"
                >
                  Discuss your brand strategy <ArrowRight className="ml-1.5 size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </PageShell>
  );
}
