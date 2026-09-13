import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow, PageIntro, PageShell, Testimonial } from "@/components/LuminorSite";
import { HowWeWorkGraphic } from "@/components/HowWeWorkGraphic";
import preethamImg from "@/assets/images/team/preetham.jpg";
import ravindraImg from "@/assets/images/team/ravindra.jpg";
import chetasImg from "@/assets/images/team/chetas.jpg";
import vishnuImg from "@/assets/images/team/vishnu.jpg";
import hardikImg from "@/assets/images/team/hardik.jpg";
import gokulImg from "@/assets/images/team/gokul.jpg";
import sanjanaImg from "@/assets/images/team/sanjana.jpg";
import sagarImg from "@/assets/images/team/sagar.jpg";
import suheartImg from "@/assets/images/team/suheart.jpg";

const team = [
  ["Preetham A", "Founder", preethamImg],
  ["Hardik P", "Co Founder / Content Strategist", suheartImg],
  ["Ravindra M.O", "Web Developer", ravindraImg],
  ["Chetas", "Creative Head", chetasImg],
  ["Vishnu Reddy", "Executive Manager", vishnuImg],
  ["Suheart", "Cinematographer", hardikImg],
  ["Gokul", "Graphic Designer", gokulImg],
  ["Sanjana A", "Finance Co-ordinator", sanjanaImg],
  ["Sagar RS", "Technical Advisor", sagarImg],
];

export default function About() {
  const [revealedTeam, setRevealedTeam] = useState<Record<string, boolean>>({});

  const toggleReveal = (name: string) => {
    setRevealedTeam((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const marqueeTeam = [...team, ...team];

  return <PageShell><main><PageIntro eyebrow="The studio" title={<>A little more <span className="italic text-[#ffbf00]">light</span> on the way in.</>} description="Luminor is an independent social and digital studio for brands with ambition, taste, and somewhere meaningful to go next." />
    <section className="mx-auto max-w-[1320px] px-5 pb-24 lg:px-8 lg:pb-32" data-testid="about-story-section">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="w-full">
          <HowWeWorkGraphic />
        </div>
        <div className="flex flex-col justify-center">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-[#8c8474]" data-testid="section-eyebrow">
            How we work
          </p>
          <h2 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl uppercase leading-[1.12]" data-testid="about-story-title">
            WE DON’T JUST BUILD BRANDS.<br />
            <span className="text-[#ffbf00]">WE BRING THEM INTO THE LIGHT.</span>
          </h2>
          <Link to="/services" className="mt-8 inline-flex items-center text-sm font-semibold" data-testid="about-story-services-link">
            See how we work <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
    <section className="bg-[#1a1814] text-[#fffbf2] py-20 lg:py-28 overflow-hidden" data-testid="about-team-section">
      <div className="mx-auto max-w-[1320px] px-5 lg:px-8 mb-12 flex flex-col items-center text-center gap-4">
        <Eyebrow>People behind the light</Eyebrow>
        <h2 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">
          The team, in focus.
        </h2>
        <p className="max-w-md text-sm sm:text-base leading-6 text-[#b9b1a2]">
          Senior thinking, generous collaboration, and just enough healthy obsession.
        </p>
      </div>

      <div className="relative w-full overflow-hidden mask-fade-edges">
        <div
          className="marquee-track py-6 gap-6 sm:gap-8 px-4"
          data-testid="team-marquee-track"
        >
          {marqueeTeam.map(([name, role, image], idx) => {
            const isRevealed = !!revealedTeam[name];
            return (
              <div
                key={`${name}-${idx}`}
                data-testid={`team-card-${name.toLowerCase().replaceAll(" ", "-")}-${idx}`}
                className="group relative flex flex-col items-center shrink-0 cursor-pointer select-none rounded-3xl border border-white/10 bg-[#24211c]/90 p-5 sm:p-6 w-[200px] sm:w-[220px] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ffbf00]/50 hover:bg-[#24211c] hover:shadow-[0_16px_36px_rgba(255,191,0,0.15)]"
                onClick={() => toggleReveal(name)}
              >
                <div
                  className={`aspect-square w-32 sm:w-36 overflow-hidden rounded-full transition-all duration-300 ${
                    isRevealed
                      ? "ring-4 ring-[#ffbf00] shadow-xl shadow-[#ffbf00]/25 scale-105"
                      : "group-hover:scale-105"
                  }`}
                >
                  <img
                    src={image}
                    alt={name}
                    className={`size-full object-cover transition duration-700 ${
                      isRevealed
                        ? "grayscale-0"
                        : "grayscale group-hover:grayscale-[30%]"
                    }`}
                  />
                </div>
                <div className="mt-4 min-h-[52px] w-full text-center">
                  {isRevealed && (
                    <div className="animate-in fade-in slide-in-from-top-1 duration-300">
                      <h3 className="font-serif text-base sm:text-lg font-medium text-[#ffbf00] leading-snug">{name}</h3>
                      <p className="mt-1 text-xs sm:text-sm text-white font-medium leading-tight">{role}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-[1320px] px-5 py-24 lg:px-8 lg:py-32" data-testid="about-difference-section">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 className="font-serif text-4xl tracking-tight text-[#1a1814] sm:text-5xl lg:text-6xl" data-testid="why-luminor-heading">
            <span className="font-bold text-[#ffbf00]">WHY</span> LUMINOR MEDIA
          </h2>
        </div>
        <div className="space-y-4">
          {[
            "Strategy built around your goals",
            "Creative that feels true to your brand",
            "Content made to connect, not just fill a feed",
            "A team that works with you, not just for you",
          ].map((text) => (
            <div
              key={text}
              className="flex items-center gap-4 border-b border-[#e8e1ce] pb-5 text-lg font-medium text-[#1a1814] sm:text-xl"
              data-testid={`why-luminor-${text.slice(0, 8).toLowerCase().replaceAll(" ", "-")}`}
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#ffbf00] text-[#1a1814]">
                <Check className="size-4 stroke-[3]" />
              </span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
    <section className="border-t border-[#e8e1ce] bg-[#f7f1e3]" data-testid="about-cta-section"><div className="mx-auto max-w-[1320px] px-5 py-20 lg:px-8"><Testimonial quote="The best partner is the one who makes your ambition feel more achievable." name="The Luminor philosophy" role="Since 2018" /></div></section>
  </main></PageShell>;
}