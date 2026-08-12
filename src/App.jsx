import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Send,
  X,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  DONNÉES                                                            */
/* ------------------------------------------------------------------ */

const PROFILE = {
  name: "Mamadou Traoré",
  initials: "MT",
  role: "Développeur Full-Stack",
  photo: "/fond.jpeg",
  cv: "/cv-mamadou-traore.pdf",
  email: "mamadou.traore84@gmail.com",
  linkedin: "https://www.linkedin.com/in/mamadoutraore",
  github: "https://github.com/leh12000",
  location: "Paris, France",
  stats: [
    { value: "5 ans", label: "d'expérience" },
    { value: "24", label: "projets livrés" },
    { value: "Paris", label: "France" },
  ],
  about:
    "Je construis des produits digitaux depuis 5 ans. Parti de l'autodidaxie, j'ai appris en livrant — une ligne de code après l'autre, un projet après l'autre, sans filet et sans diplôme pour me couvrir. Ma vision : créer des outils qui simplifient vraiment la vie des gens, où la technique s'efface derrière l'usage.",
};

const EXPERIENCES = [
  {
    period: "2023 — Aujourd'hui",
    role: "Développeur Full-Stack Freelance",
    company: "Indépendant · Paris",
    description:
      "J'accompagne startups et PME de la conception à la mise en production. Architecture React / Node.js, bases PostgreSQL, déploiement continu. Douze produits livrés, du MVP en trois semaines à la refonte complète d'une plateforme SaaS.",
  },
  {
    period: "2021 — 2023",
    role: "Développeur Front-End",
    company: "Startup SaaS · Série A",
    description:
      "Responsable de l'interface produit utilisée quotidiennement par plus de 15 000 utilisateurs. Migration complète vers TypeScript, création du design system interne, réduction de 40 % du temps de chargement initial.",
  },
  {
    period: "2020 — 2021",
    role: "Développeur Junior",
    company: "Agence digitale · Paris",
    description:
      "Premier poste, terrain d'apprentissage intensif. Intégration de sites vitrines et e-commerce pour des clients variés, du cahier des charges à la recette. C'est là que j'ai appris à livrer dans les délais, quoi qu'il arrive.",
  },
];

const SKILLS = [
  { name: "React", level: 92, tier: "Expert" },
  { name: "Node.js", level: 86, tier: "Avancé" },
  { name: "TypeScript", level: 81, tier: "Avancé" },
  { name: "UI/UX Design", level: 75, tier: "Solide" },
  { name: "PostgreSQL", level: 70, tier: "Solide" },
];

const EDUCATION = [
  {
    year: "2022",
    degree: "AWS Certified Cloud Practitioner",
    school: "Amazon Web Services",
  },
  {
    year: "2020",
    degree: "Bootcamp Développement Web Full-Stack",
    school: "Le Wagon · Paris",
  },
  {
    year: "2019",
    degree: "Licence Informatique",
    school: "Université Paris-Saclay",
  },
];

const NAV_LINKS = [
  { label: "À propos", href: "#apropos" },
  { label: "Expérience", href: "#experience" },
  { label: "Compétences", href: "#competences" },
  { label: "Contact", href: "#contact" },
];

const IMAGES = {
  // Schéma de circuit rétroéclairé — traces neutres sur fond noir, aucun conflit avec l'or
  hero: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2400&auto=format&fit=crop",
};

/* ------------------------------------------------------------------ */
/*  A. NAVBAR — « La Signature Flottante »                             */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel");
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Referme le menu mobile si on repasse en desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const shellLight = scrolled || open;

  return (
    <div className="fixed left-1/2 top-4 z-[80] w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 sm:top-6">
      <nav
        className={`rounded-full border px-4 py-2.5 backdrop-blur-xl transition-all duration-500 sm:px-5 sm:py-3 ${
          shellLight
            ? "border-charbon/10 bg-cream/80 text-charbon shadow-[0_16px_50px_-22px_rgba(15,15,19,0.75)]"
            : "border-cream/20 bg-charbon/35 text-cream md:border-transparent md:bg-transparent md:backdrop-blur-none"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.25,0.46,0.45,0.94)" }}
      >
        <div className="flex items-center justify-between gap-3">
          <a
            href="#top"
            onClick={() => setOpen(false)}
            className="lift flex shrink-0 items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.28em]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
            {PROFILE.initials}
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="lift text-[13px] font-medium tracking-tight opacity-80 hover:opacity-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PROFILE.cv}
              download
              className="magnetic flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-[12px] font-semibold tracking-tight text-charbon shadow-[0_10px_30px_-12px_rgba(212,168,67,0.95)] sm:px-5"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2.4} />
              <span className="hidden sm:inline">Télécharger CV</span>
              <span className="sm:hidden">CV</span>
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open}
              className={`magnetic flex h-9 w-9 items-center justify-center rounded-full border md:hidden ${
                shellLight ? "border-charbon/15" : "border-cream/30"
              }`}
            >
              {open ? (
                <X className="h-4 w-4" strokeWidth={2.2} />
              ) : (
                <Menu className="h-4 w-4" strokeWidth={2.2} />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Panneau de navigation mobile */}
      <div
        data-open={open}
        className="nav-panel absolute left-0 right-0 top-[calc(100%+0.6rem)] origin-top rounded-[2rem] border border-charbon/10 bg-cream/95 p-3 shadow-[0_24px_70px_-30px_rgba(15,15,19,0.8)] backdrop-blur-xl md:hidden"
      >
        <div className="flex flex-col">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-[1.4rem] px-4 py-3.5 text-[15px] font-medium tracking-tight text-charbon transition-colors duration-300 hover:bg-gold/15"
            >
              <span className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-goldink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {link.label}
              </span>
              <ArrowUpRight className="h-4 w-4 text-goldink" strokeWidth={2.2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  B. HERO — « La Première Impression »                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-photo", { y: 40, opacity: 0, scale: 0.9, duration: 1.1 })
        .from(".hero-name", { y: 60, opacity: 0, duration: 1.2 }, "-=0.98")
        .from(".hero-role", { y: 34, opacity: 0, duration: 1.1 }, "-=1.08")
        .from(
          ".hero-stat",
          { y: 22, opacity: 0, duration: 0.9, stagger: 0.08 },
          "-=1.0"
        )
        .from(
          ".hero-cta",
          { y: 22, opacity: 0, duration: 0.9, stagger: 0.12 },
          "-=0.86"
        )
        .from(".hero-hint", { opacity: 0, duration: 0.8 }, "-=0.5");

      gsap.to(".hero-bg", {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex h-[100dvh] min-h-[640px] w-full items-center justify-center overflow-hidden bg-charbon"
    >
      {/* Texture tech + overlays dorés */}
      <div className="hero-bg absolute inset-0 -top-[7%] h-[114%] w-full">
        <img
          src={IMAGES.hero}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover opacity-[0.44]"
        />
      </div>
      {/* Voile vertical + vignettage central, uniquement sous le bloc de texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-charbon/80 via-charbon/66 to-charbon" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_48%_at_50%_44%,rgba(15,15,19,0.70),transparent_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_36%,rgba(212,168,67,0.26),transparent_62%)]" />

      {/* Contenu */}
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <div className="hero-photo mb-8 sm:mb-10">
          <div className="photo-ring h-[126px] w-[126px] overflow-hidden rounded-full bg-ink sm:h-[152px] sm:w-[152px]">
            <img
              src={PROFILE.photo}
              alt={PROFILE.name}
              className="h-full w-full scale-[1.12] object-cover"
            />
          </div>
        </div>

        <h1 className="hero-name glow-gold text-balance font-sans text-[14vw] font-extrabold leading-[0.88] tracking-tightest text-cream sm:text-7xl md:text-[5.6rem] lg:text-[6.4rem]">
          {PROFILE.name}
        </h1>

        <p className="hero-role mt-5 font-serif text-3xl italic leading-tight text-gold sm:mt-6 sm:text-4xl md:text-[2.9rem]">
          {PROFILE.role}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-cream/55 sm:mt-11 sm:gap-x-5 sm:text-xs">
          {PROFILE.stats.map((stat, i) => (
            <span key={stat.value} className="hero-stat flex items-center gap-3">
              {i > 0 && <span className="text-gold/70">·</span>}
              <span>
                <span className="text-cream/90">{stat.value}</span> {stat.label}
              </span>
            </span>
          ))}
        </div>

        <div className="mt-11 flex flex-col items-center gap-3 sm:mt-12 sm:flex-row sm:gap-4">
          <a
            href={PROFILE.cv}
            download
            className="hero-cta magnetic flex w-full items-center justify-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-tight text-charbon shadow-[0_18px_50px_-16px_rgba(212,168,67,1)] sm:w-auto"
          >
            <Download className="h-4 w-4" strokeWidth={2.4} />
            Télécharger CV
          </a>
          <a
            href="#contact"
            className="hero-cta magnetic flex w-full items-center justify-center gap-2.5 rounded-full border border-cream/30 px-8 py-4 text-sm font-semibold tracking-tight text-cream hover:border-gold/70 hover:bg-gold/10 sm:w-auto"
          >
            Me contacter
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
          </a>
        </div>
      </div>

      <div className="hero-hint absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex h-9 w-[22px] items-start justify-center rounded-full border border-cream/25 pt-1.5">
          <span className="animate-scroll-hint h-1.5 w-1.5 rounded-full bg-gold" />
        </div>
      </div>

      <div
        id="hero-sentinel"
        className="pointer-events-none absolute left-0 top-[72dvh] h-px w-full"
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  C. À PROPOS — « Le Manifeste Personnel »                           */
/* ------------------------------------------------------------------ */

function About() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 44,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });

      gsap.from(".about-rule", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.4,
        ease: "power2.inOut",
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="apropos"
      ref={root}
      className="relative scroll-mt-28 bg-cream px-6 py-28 text-ink sm:px-10 sm:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[minmax(0,0.85fr)_1px_minmax(0,1.15fr)] md:gap-16">
        <div>
          <span className="about-reveal mb-6 block font-mono text-[11px] uppercase tracking-[0.3em] text-goldink">
            01 — Manifeste
          </span>
          <h2 className="about-reveal font-serif text-5xl italic leading-[0.95] tracking-tight text-charbon sm:text-6xl md:text-7xl">
            À propos
          </h2>
        </div>

        <div className="about-rule hidden w-px bg-gradient-to-b from-gold via-gold/50 to-transparent md:block" />

        <div className="flex flex-col justify-center">
          <p className="about-reveal text-balance text-[19px] font-light leading-[1.75] text-ink/85 sm:text-xl sm:leading-[1.8]">
            {PROFILE.about}
          </p>

          <div className="about-reveal mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/45">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-goldink" strokeWidth={2.2} />
              {PROFILE.location}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
              Disponible pour missions
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  D. EXPÉRIENCE — « La Timeline Vivante »                            */
/* ------------------------------------------------------------------ */

function Experience() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".xp-head", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.from(".xp-line", {
        scaleY: 0,
        transformOrigin: "top center",
        duration: 1.6,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".xp-timeline", start: "top 80%" },
      });

      gsap.utils.toArray(".xp-item").forEach((item, i) => {
        const card = item.querySelector(".xp-card");
        const dot = item.querySelector(".xp-dot");
        const fromLeft = i % 2 === 0;

        gsap.from(card, {
          x: () => (window.innerWidth >= 768 ? (fromLeft ? -70 : 70) : -40),
          opacity: 0,
          duration: 1.05,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 82%" },
        });

        gsap
          .timeline({ scrollTrigger: { trigger: item, start: "top 82%" } })
          .from(dot, { scale: 0, duration: 0.5, ease: "power3.out" })
          .to(dot, { scale: 1.9, duration: 0.35, ease: "power2.out" })
          .to(dot, { scale: 1, duration: 0.45, ease: "power2.inOut" });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={root}
      className="relative scroll-mt-28 bg-ivory px-6 py-28 text-ink sm:px-10 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 sm:mb-24">
          <span className="xp-head mb-6 block font-mono text-[11px] uppercase tracking-[0.3em] text-goldink">
            02 — Parcours
          </span>
          <h2 className="xp-head font-sans text-4xl font-extrabold leading-[0.95] tracking-tightest text-charbon sm:text-6xl">
            Expérience
          </h2>
          <p className="xp-head mt-5 max-w-md font-serif text-2xl italic leading-snug text-ink/50 sm:text-3xl">
            Cinq ans à livrer, pas à théoriser.
          </p>
        </div>

        <div className="xp-timeline relative">
          <div className="xp-line absolute left-[7px] top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-20">
            {EXPERIENCES.map((xp, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={xp.role}
                  className="xp-item relative pl-10 md:grid md:grid-cols-2 md:gap-16 md:pl-0"
                >
                  <span className="xp-dot absolute left-[2px] top-8 h-[11px] w-[11px] rounded-full bg-gold shadow-[0_0_0_5px_rgba(212,168,67,0.22)] md:left-1/2 md:-translate-x-1/2" />

                  <div
                    className={
                      left
                        ? "md:col-start-1 md:row-start-1 md:text-right"
                        : "md:col-start-2 md:row-start-1"
                    }
                  >
                    <article className="xp-card card-lift rounded-[2rem] border border-charbon/5 bg-cream p-7 shadow-card hover:border-gold/45 hover:shadow-cardHover sm:p-9">
                      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-goldink">
                        {xp.period}
                      </span>
                      <h3 className="mt-4 font-sans text-xl font-bold leading-tight tracking-tight text-charbon sm:text-2xl">
                        {xp.role}
                      </h3>
                      <p className="mt-1.5 text-sm font-normal text-ink/55">
                        {xp.company}
                      </p>
                      <p className="mt-5 text-[15px] font-light leading-relaxed text-ink/75">
                        {xp.description}
                      </p>
                    </article>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  E. COMPÉTENCES — « Le Radar de Compétences »                       */
/* ------------------------------------------------------------------ */

const RADAR = { cx: 240, cy: 200, r: 130, labelR: 160 };

const radarAngle = (i, total) => -Math.PI / 2 + (i * 2 * Math.PI) / total;

const radarPoint = (i, total, radius) => [
  RADAR.cx + Math.cos(radarAngle(i, total)) * radius,
  RADAR.cy + Math.sin(radarAngle(i, total)) * radius,
];

const radarPolygon = (radiusFn, total) =>
  Array.from({ length: total }, (_, i) => radarPoint(i, total, radiusFn(i)))
    .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
    .join(" ");

function Skills() {
  const root = useRef(null);
  const shapeRef = useRef(null);
  const counters = useRef([]);

  const total = SKILLS.length;
  const rings = [0.25, 0.5, 0.75, 1];
  const shapePoints = radarPolygon(
    (i) => (SKILLS[i].level / 100) * RADAR.r,
    total
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const shape = shapeRef.current;
      const length = shape ? shape.getTotalLength?.() ?? 900 : 900;

      gsap.from(".skills-head", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 76%" },
      });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: ".skills-panel", start: "top 78%" },
      });

      tl.from(".skills-panel", { y: 50, opacity: 0, duration: 1 })
        .from(
          ".radar-ring",
          { scale: 0.55, opacity: 0, duration: 0.9, stagger: 0.08 },
          "-=0.6"
        )
        .set(".radar-axis", {
          strokeDasharray: RADAR.r,
          strokeDashoffset: RADAR.r,
        })
        .to(
          ".radar-axis",
          { strokeDashoffset: 0, duration: 0.55, stagger: 0.1 },
          "-=0.45"
        )
        .set(shape, { strokeDasharray: length, strokeDashoffset: length })
        .to(shape, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" })
        .to(shape, { fillOpacity: 0.18, duration: 0.8 }, "-=0.55")
        .from(
          ".radar-vertex",
          { scale: 0, duration: 0.5, stagger: 0.07, ease: "back.out(2.4)" },
          "-=0.9"
        )
        .from(
          ".radar-label",
          { opacity: 0, y: 10, duration: 0.6, stagger: 0.07 },
          "-=0.85"
        )
        .from(
          ".skill-row",
          { x: 26, opacity: 0, duration: 0.7, stagger: 0.08 },
          "-=0.9"
        );

      counters.current.forEach((el, i) => {
        if (!el) return;
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: SKILLS[i].level,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.v)}%`;
            },
          },
          "<"
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="competences"
      ref={root}
      className="relative scroll-mt-28 bg-cream px-6 py-28 text-ink sm:px-10 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 sm:mb-20">
          <span className="skills-head mb-6 block font-mono text-[11px] uppercase tracking-[0.3em] text-goldink">
            03 — Tableau de bord
          </span>
          <h2 className="skills-head font-sans text-4xl font-extrabold leading-[0.95] tracking-tightest text-charbon sm:text-6xl">
            Compétences
          </h2>
          <p className="skills-head mt-5 max-w-md font-serif text-2xl italic leading-snug text-ink/50 sm:text-3xl">
            Le stack, mesuré sans complaisance.
          </p>
        </div>

        {/* Panneau instrument — le seul bloc sombre de la partie basse */}
        <div className="skills-panel relative overflow-hidden rounded-[2.5rem] bg-charbon px-6 py-12 shadow-panel sm:rounded-[3rem] sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_28%_45%,rgba(212,168,67,0.20),transparent_62%)]" />

          <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            {/* Radar SVG */}
            <div>
              <svg
                viewBox="0 0 480 420"
                className="h-auto w-full max-w-[540px] overflow-visible"
                role="img"
                aria-label="Radar des compétences"
              >
                {rings.map((k) => (
                  <polygon
                    key={k}
                    className="radar-ring"
                    points={radarPolygon(() => RADAR.r * k, total)}
                    fill="none"
                    stroke="rgba(245,243,238,0.10)"
                    strokeWidth="1"
                    style={{ transformOrigin: `${RADAR.cx}px ${RADAR.cy}px` }}
                  />
                ))}

                {SKILLS.map((skill, i) => {
                  const [x, y] = radarPoint(i, total, RADAR.r);
                  return (
                    <line
                      key={skill.name}
                      className="radar-axis"
                      x1={RADAR.cx}
                      y1={RADAR.cy}
                      x2={x}
                      y2={y}
                      stroke="rgba(245,243,238,0.18)"
                      strokeWidth="1"
                    />
                  );
                })}

                <polygon
                  ref={shapeRef}
                  points={shapePoints}
                  fill="#D4A843"
                  fillOpacity="0"
                  stroke="#D4A843"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  style={{
                    filter: "drop-shadow(0 0 18px rgba(212,168,67,0.55))",
                  }}
                />

                {SKILLS.map((skill, i) => {
                  const [x, y] = radarPoint(
                    i,
                    total,
                    (skill.level / 100) * RADAR.r
                  );
                  return (
                    <circle
                      key={skill.name}
                      className="radar-vertex"
                      cx={x}
                      cy={y}
                      r="4.5"
                      fill="#0F0F13"
                      stroke="#D4A843"
                      strokeWidth="2.5"
                      style={{ transformOrigin: `${x}px ${y}px` }}
                    />
                  );
                })}

                {SKILLS.map((skill, i) => {
                  const [x, y] = radarPoint(i, total, RADAR.labelR);
                  const cos = Math.cos(radarAngle(i, total));
                  const anchor =
                    Math.abs(cos) < 0.12 ? "middle" : cos > 0 ? "start" : "end";
                  const isTop = i === 0;
                  return (
                    <text
                      key={skill.name}
                      className="radar-label"
                      x={x}
                      y={isTop ? y - 6 : y}
                      textAnchor={anchor}
                      fill="rgba(245,243,238,0.72)"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "12px",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      <tspan x={x}>{skill.name}</tspan>
                      <tspan
                        x={x}
                        dy="17"
                        fill="#D4A843"
                        ref={(el) => {
                          counters.current[i] = el;
                        }}
                      >
                        0%
                      </tspan>
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Légende */}
            <div className="flex flex-col divide-y divide-cream/10 border-y border-cream/10">
              {SKILLS.map((skill, i) => (
                <div
                  key={skill.name}
                  className="skill-row lift group flex items-center justify-between gap-6 py-5"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-gold/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-lg font-semibold tracking-tight text-cream">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/40 transition-colors duration-300 group-hover:text-gold">
                    {skill.tier}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  F. FORMATION — « Les Fondations »                                  */
/* ------------------------------------------------------------------ */

function Education() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".edu-reveal", {
        y: 38,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 76%" },
      });

      gsap.from(".edu-card", {
        y: 44,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".edu-list", start: "top 82%" },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative scroll-mt-28 bg-ivory px-6 py-28 text-ink sm:px-10 sm:py-36"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <div>
          <span className="edu-reveal mb-6 block font-mono text-[11px] uppercase tracking-[0.3em] text-goldink">
            04 — Fondations
          </span>
          <h2 className="edu-reveal font-sans text-4xl font-extrabold leading-[0.95] tracking-tightest text-charbon sm:text-5xl">
            Formation
          </h2>
          <p className="edu-reveal mt-5 max-w-xs font-serif text-2xl italic leading-snug text-ink/45">
            Autodidacte, puis certifié.
          </p>
        </div>

        <div className="edu-list flex flex-col gap-4">
          {EDUCATION.map((item) => (
            <article
              key={item.degree}
              className="edu-card card-lift rounded-[2rem] border border-charbon/8 bg-cream p-7 shadow-card hover:border-gold/50 hover:shadow-cardHover sm:p-8"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-goldink">
                {item.year}
              </span>
              <h3 className="mt-3 font-sans text-lg font-bold tracking-tight text-charbon sm:text-xl">
                {item.degree}
              </h3>
              <p className="mt-1.5 text-sm font-normal text-ink/55">
                {item.school}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  G. CONTACT — « Le Pont » (fond accent plein or)                    */
/* ------------------------------------------------------------------ */

const CONTACT_LINKS = [
  {
    icon: Mail,
    label: "Email",
    value: PROFILE.email,
    href: `mailto:${PROFILE.email}`,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/mamadoutraore",
    href: PROFILE.linkedin,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@leh12000",
    href: PROFILE.github,
  },
  { icon: MapPin, label: "Localisation", value: PROFILE.location, href: null },
];

function Contact() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root.current, start: "top 72%" },
      });

      tl.from(".contact-reveal", {
        y: 44,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
      })
        .from(
          ".contact-link",
          { y: 26, opacity: 0, duration: 0.8, stagger: 0.15 },
          "-=0.75"
        )
        .from(".contact-cta", { y: 22, opacity: 0, duration: 0.9 }, "-=0.5");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={root}
      className="relative scroll-mt-28 overflow-hidden bg-gold px-6 py-28 text-charbon sm:px-10 sm:py-36"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.35),transparent_58%)]" />

      <div className="relative mx-auto max-w-5xl text-center">
        <span className="contact-reveal mb-7 block font-mono text-[11px] uppercase tracking-[0.3em] text-charbon/60">
          05 — Le pont
        </span>
        <h2 className="contact-reveal text-balance font-serif text-5xl italic leading-[0.95] text-charbon sm:text-7xl md:text-[5.2rem]">
          Travaillons ensemble
        </h2>
        <p className="contact-reveal mx-auto mt-7 max-w-xl text-balance text-[17px] font-light leading-relaxed text-charbon/70 sm:text-lg">
          Un produit à lancer, une plateforme à reprendre, une idée encore floue —
          écrivez-moi. Je réponds sous 24 heures.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-8 text-left sm:grid-cols-2 lg:grid-cols-4">
          {CONTACT_LINKS.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <Icon
                  className="mb-4 h-5 w-5 text-charbon"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="block font-mono text-[10px] uppercase tracking-[0.26em] text-charbon/55">
                  {label}
                </span>
                <span className="underline-sweep mt-2 inline-block text-[15px] font-medium tracking-tight text-charbon">
                  {value}
                </span>
              </>
            );

            return href ? (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="contact-link lift block"
              >
                {inner}
              </a>
            ) : (
              <div key={label} className="contact-link block">
                {inner}
              </div>
            );
          })}
        </div>

        <div className="contact-cta mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={`mailto:${PROFILE.email}?subject=Projet%20%E2%80%94%20prise%20de%20contact`}
            className="magnetic flex w-full items-center justify-center gap-2.5 rounded-full bg-charbon px-9 py-4 text-sm font-semibold tracking-tight text-cream shadow-[0_20px_60px_-18px_rgba(15,15,19,0.9)] sm:w-auto"
          >
            <Send className="h-4 w-4" strokeWidth={2.4} />
            Envoyer un message
          </a>
          <a
            href={PROFILE.cv}
            download
            className="magnetic flex w-full items-center justify-center gap-2.5 rounded-full border border-charbon/35 px-9 py-4 text-sm font-semibold tracking-tight text-charbon hover:border-charbon hover:bg-charbon/10 sm:w-auto"
          >
            <Download className="h-4 w-4" strokeWidth={2.4} />
            Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  H. PIED DE PAGE                                                    */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="-mt-12 rounded-t-[4rem] bg-onyx px-6 py-14 sm:px-10 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <p className="font-sans text-base font-semibold tracking-tight text-cream">
            {PROFILE.name}
          </p>
          <p className="mt-1 text-sm font-light text-cream/40">
            Fait avec le vibe coding · {new Date().getFullYear()}
          </p>
        </div>

        <div className="flex items-center gap-2.5 rounded-full border border-cream/10 px-4 py-2">
          <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-cream/50">
            En ligne
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh());
    }
  }, []);

  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
