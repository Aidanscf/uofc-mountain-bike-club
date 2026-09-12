"use client";

import {
  ArrowRight,
  Bike,
  Check,
  ChevronDown,
  CircleUserRound,
  CloudSun,
  Coffee,
  Filter,
  Flag,
  Gauge,
  Hammer,
  Map,
  MapPin,
  Menu,
  Mountain,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const joinUrl = "https://linktr.ee/uofc_mtb";

const navItems = [
  { label: "Past Rides", href: "#schedule" },
  { label: "Trail Gallery", href: "#gallery" },
  { label: "About & Benefits", href: "#membership" },
  { label: "Join The Pack", href: "#signup-form" },
];

const stats = [
  { value: "60+", label: "Active Riders" },
  { value: "24", label: "Past Ride Recaps" },
  { value: "3", label: "Bike Clinics" },
  { value: "#1", label: "Legendary Mascot", featured: true },
];

const rides = [
  {
    id: "twilight",
    day: "Fall 2025",
    time: "Twilight",
    title: "Bragg Creek Twilight Laps & Bragging Rights",
    body:
      "Fast, flowy singletrack along Ranger Summit and Strange Brew followed by trailhead burritos and sunset photos from the lot.",
    level: "Blue Square / Intermediate",
    tone: "gold",
    icon: Bike,
    metricA: "Elevation gain: +420m",
    metricB: "Distance: 16.4 km",
    action: "View Recap",
    confirmed: "Recap Opened",
    className: "ride-card-wide tilt-left",
    path: "M0 38 Q 40 38, 70 20 T 140 10 T 210 28 T 260 5 L 300 35",
  },
  {
    id: "clinic",
    day: "Winter 2026",
    time: "Clinic Night",
    title: "Campus Wrench & Tubeless Clinic",
    body:
      "Members learned derailleur indexing, brake bleeding, tubeless plugging, and trailside fixes at the UCalgary Outdoor Centre shop.",
    level: "Free for members",
    tone: "neutral",
    icon: Hammer,
    metricA: "Capacity: 15 spots max",
    metricB: "Loaner stands ready",
    action: "View Recap",
    confirmed: "Recap Opened",
    className: "ride-card-small tilt-right",
    path: "M0 32 Q 60 10, 115 22 T 210 16 T 300 28",
  },
  {
    id: "moose",
    day: "Summer 2025",
    time: "Shuttle Day",
    title: "Moose Mountain Downhill Gravity Shuttle",
    body:
      "A full day of Moose Mountain shuttle laps with certified helmets, trail-ready setups, Jean-Guy, Toothless, and T-Rex descents.",
    level: "Double Black Diamond",
    tone: "red",
    icon: Truck,
    metricA: "Vertical drop: -1,850m",
    metricB: "Run count: 5 laps",
    action: "View Recap",
    confirmed: "Recap Opened",
    className: "tilt-right-soft",
    path: "M0 8 Q 45 35, 88 18 T 172 8 T 250 24 T 300 6",
  },
  {
    id: "coffee",
    day: "Spring 2026",
    time: "Coffee Ride",
    title: "Canmore Nordic Centre Coffee & Flow",
    body:
      "A beginner-friendly Canmore Nordic loop with smooth berms, mountain vista photo stops, and post-ride espresso downtown.",
    level: "Green Circle / Beginner Friendly",
    tone: "gold",
    icon: Coffee,
    metricA: "Elevation: +180m",
    metricB: "Distance: 11.2 km",
    action: "View Recap",
    confirmed: "Recap Opened",
    className: "tilt-left-soft",
    path: "M0 25 Q 75 15, 150 18 T 300 20",
  },
];

const gallery = [
  {
    id: "drop",
    category: "Downhill / Freeride",
    image: "/mockup-assets/gallery-drop.jpg",
    label: "Moose Mtn: Toothless Drop",
    title: "Sending The Gap",
    meta: "Rider: Alex C. / Shot by Tyler",
    tilt: "tilt-left-strong",
  },
  {
    id: "emblem",
    category: "Social & Tailgates",
    image: "/mockup-assets/emblem.jpg",
    label: "Official Emblem",
    title: "Club Sticker Badge",
    meta: "Stickered on 600+ bikes across Alberta",
    tilt: "tilt-right-soft",
    emblem: true,
  },
  {
    id: "summit",
    category: "Flow & XC",
    image: "/mockup-assets/gallery-summit.jpg",
    label: "Prairie View Summit Push",
    title: "Sunday Summit Laps",
    meta: "Elevation: 2,240m / 14 riders",
    tilt: "tilt-left-soft",
  },
  {
    id: "tailgate",
    category: "Social & Tailgates",
    image: "/mockup-assets/gallery-tailgate.jpg",
    label: "Dino Tailgate BBQ",
    title: "Post-Shred Burgers",
    meta: "West Bragg parking lot social",
    tilt: "tilt-right-strong",
  },
];

const benefits = [
  {
    title: "Ride Community",
    badge: "No Drop",
    description:
      "Meet riders across campus, find trail partners, and plug into casual group rides without needing to know anyone first.",
    points: ["Beginner-friendly loops", "Intermediate trail crews", "Discord ride planning"],
  },
  {
    title: "Skills & Wrench Nights",
    badge: "Learn",
    description:
      "Build confidence on the bike and in the shop with clinics covering trail technique, tubeless repairs, brakes, and drivetrain basics.",
    points: ["Campus repair nights", "Trailside repair practice", "Coaching from experienced members"],
    featured: true,
  },
  {
    title: "Deals & Trail Days",
    badge: "Perks",
    description:
      "Membership helps support club logistics, sponsor discounts, trail stewardship, and access to shared knowledge about local riding zones.",
    points: ["Sponsor discounts", "Trail build opportunities", "Gear and route advice"],
  },
];

const sponsors = ["Ridley's Cycle", "Inside Line"];

const questions = [
  {
    question: "Where do we ride twice a week?",
    answer:
      "We split both weekly group rides by skill level so newer riders can cruise beginner-friendly loops while experienced riders head for faster blue and black trail options.",
  },
  {
    question: "Can I rent a bike or gear?",
    answer:
      "Yes. The UCalgary Outdoor Centre has bike rentals and other outdoor gear available, which makes it easier to try a ride before committing to your own setup.",
  },
  {
    question: "What gear and transportation do I need?",
    answer:
      "A certified cycling helmet is required for every ride. Full-face helmets and knee pads are not required. We do not have a club van, so members use Discord to arrange carpools and coordinate who has rack space.",
  },
];

const galleryFilters = ["All Shreds", "Downhill / Freeride", "Flow & XC", "Social & Tailgates"];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Shreds");
  const [rideStates, setRideStates] = useState<Record<string, boolean>>({});
  const [openQuestion, setOpenQuestion] = useState(0);
  const [activeSection, setActiveSection] = useState("#schedule");

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.12, 0.35, 0.6] },
    );

    document
      .querySelectorAll<HTMLElement>("section[id]")
      .forEach((section) => sectionObserver.observe(section));

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  const filteredGallery = useMemo(() => {
    if (activeFilter === "All Shreds") {
      return gallery;
    }

    return gallery.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand-lockup" href="#top" aria-label="UofC MTB Club home">
            <img src="/mockup-assets/emblem.jpg" alt="" className="brand-mark" />
            <span className="brand-text">
              <span>
                <strong>UofC</strong> MTB Club
              </span>
            </span>
          </a>

          <span className="established-badge">
            <ShieldCheck size={15} />
            SU Certified
          </span>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map((item) => (
              <a
                key={item.href}
                className={activeSection === item.href ? "active" : ""}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="header-actions">
            <div className="trail-pill" aria-label="Moose Mountain status">
              <span className="live-dot" />
              <span>Moose Mtn: Primed</span>
            </div>
            <a className="btn btn-primary compact" href={joinUrl} target="_blank" rel="noreferrer">
              <Users size={17} />
              Join Club
            </a>
            <button
              className="icon-button"
              type="button"
              aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="avatar" aria-hidden="true">
              <CircleUserRound size={19} />
            </div>
          </div>
        </div>

        <div className={`mobile-nav ${mobileMenuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
      </header>

      <main id="top">
        <section className="hero-section topo-section" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy" data-reveal>
              <div className="badge-row">
                <span className="sticker sticker-gold">
                  <ShieldCheck size={15} />
                  SU Certified
                </span>
                <span className="sticker sticker-red">
                  <Mountain size={15} />
                  Rocky Mountain Based
                </span>
                <span className="sticker sticker-muted">
                  <ShieldCheck size={15} />
                  YYC / Canmore / Bragg Creek
                </span>
              </div>

              <span className="eyebrow">Official University of Calgary Club</span>
              <h1 id="hero-title">
                Send It With
                <span>The Dinos!</span>
              </h1>
              <p className="hero-lede">
                Ripping singletrack, gravity jumps, and twilight loops across Bragg Creek,
                Moose Mountain, Kananaskis, and the Bow Valley. High-cadence outdoor
                community for trail rookies, weekend riders, and collegiate racers.
              </p>

              <div className="hero-actions">
                <a className="btn btn-primary btn-large" href={joinUrl} target="_blank" rel="noreferrer">
                  <Users size={20} />
                  Join The Pack
                  <span>2026 Pass</span>
                </a>
                <a className="btn btn-secondary" href="#schedule">
                  View Past Rides
                  <ArrowRight size={18} />
                </a>
              </div>

              <div className="stats-grid">
                {stats.map((stat) => (
                  <div className={stat.featured ? "stat-tile featured" : "stat-tile"} key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="hero-art" data-reveal>
              <div className="art-plate" />
              <div className="mascot-card">
                <img
                  src="/mockup-assets/hero-rider.jpg"
                  alt="Cartoon UofC dinosaur mascot riding a mountain bike through a Rocky Mountain trail"
                />
                <span className="callout callout-red">Whoosh!</span>
                <span className="callout callout-gold">Airtime!</span>
                <span className="location-tag">
                  <MapPin size={13} />
                  Moose Mtn Ridge Run
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="status-strip" aria-label="Live trail status">
          <div className="container status-inner">
            <div className="status-track">
              <Gauge size={17} />
              <strong>Live trail status feed:</strong>
              <span>
                West Bragg Creek dry and buffed / Moose Mountain shuttles running Sat 9 AM /
                Canmore Nordic firm / Nose Hill after-class laps open
              </span>
            </div>
            <div className="weather">
              <CloudSun size={16} />
              18 C / Calgary Rockies Sunny
            </div>
          </div>
        </div>

        <section className="section schedule-section diagonal-band" id="schedule" aria-labelledby="schedule-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <span className="section-kicker">
                  <Map size={14} />
                  Ride Scrapbook
                </span>
                <h2 id="schedule-title">Past Rides</h2>
                <p>
                  A look back at club rides, clinics, and trail days from Bragg Creek,
                  Moose Mountain, Canmore, and campus wrench nights.
                </p>
              </div>
              <div className="segmented" aria-label="Ride filters">
                <button type="button">All Recaps</button>
                <button type="button" className="selected">
                  Recent Highlights
                </button>
              </div>
            </div>

            <div className="rides-grid">
              {rides.map((ride, index) => {
                const Icon = ride.icon;
                const confirmed = rideStates[ride.id];
                return (
                  <article
                    className={`ride-card ${ride.className}`}
                    key={ride.id}
                    data-reveal
                    style={{ transitionDelay: `${index * 80}ms` }}
                  >
                    <div className="ride-topline">
                      <span className={`ride-chip ${ride.tone}`}>
                        <Icon size={14} />
                        {ride.day} / {ride.time}
                      </span>
                      <span className={`difficulty ${ride.tone}`}>{ride.level}</span>
                    </div>
                    <h3>{ride.title}</h3>
                    <p>{ride.body}</p>
                    <div className="elevation-box">
                      <div>
                        <span>{ride.metricA}</span>
                        <span>{ride.metricB}</span>
                      </div>
                      <svg viewBox="0 0 300 42" preserveAspectRatio="none" aria-hidden="true">
                        <path
                          d={`${ride.path} L300 42 L0 42 Z`}
                          className="chart-fill"
                        />
                        <path d={ride.path} className="chart-line" />
                      </svg>
                    </div>
                    <div className="ride-footer">
                      <button
                        className={confirmed ? "btn btn-confirmed small" : "btn btn-primary small"}
                        type="button"
                        onClick={() =>
                          setRideStates((state) => ({ ...state, [ride.id]: true }))
                        }
                        disabled={confirmed}
                      >
                        {confirmed ? <Check size={16} /> : <ArrowRight size={16} />}
                        {confirmed ? ride.confirmed : ride.action}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section gallery-section topo-section" id="gallery" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-heading" data-reveal>
              <div>
                <span className="section-kicker gold">
                  <Sparkles size={14} />
                  Field Dispatches
                </span>
                <h2 id="gallery-title">Trail Gallery & Moments</h2>
              </div>
              <div className="filter-row" aria-label="Gallery filters">
                <Filter size={16} aria-hidden="true" />
                {galleryFilters.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className={activeFilter === filter ? "active" : ""}
                    onClick={() => setActiveFilter(filter)}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="gallery-grid">
              {filteredGallery.map((item, index) => (
                <article
                  className={`gallery-card ${item.tilt} ${item.emblem ? "emblem-card" : ""}`}
                  key={item.id}
                  data-reveal
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <div className="gallery-image">
                    <img src={item.image} alt={`${item.title}: ${item.label}`} />
                    <span>{item.label}</span>
                  </div>
                  <div className="gallery-caption">
                    <h3>{item.title}</h3>
                    <p>{item.meta}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section membership-section diagonal-band" id="membership" aria-labelledby="membership-title">
          <div className="container">
            <div className="center-heading" data-reveal>
              <span className="section-kicker red">Club Membership / $10</span>
              <h2 id="membership-title">About The Club & Member Benefits</h2>
              <p>
                UofC MTB is a student-led mountain bike community for riders who want
                trail friends, skill progression, local route knowledge, and a reason to
                get out into the Rockies.
              </p>
            </div>

            <div className="club-info-grid" data-reveal>
              <article className="about-card">
                <span className="section-kicker gold">What We Are About</span>
                <h3>Ride More, Learn More, Build The Local Trail Scene</h3>
                <p>
                  The club brings together UCalgary students and community riders for
                  mountain bike rides, maintenance nights, trail stewardship, sponsor
                  perks, and low-pressure ways to meet people who love dirt, bikes, and
                  weekends outside.
                </p>
              </article>
              <article className="fee-card" id="signup-form">
                <span>Membership Fee</span>
                <strong>$10</strong>
                <p>
                  One simple club fee for the season. Join through Linktree to get current
                  sign-up details, club channels, and ride announcements.
                </p>
                <a className="btn btn-gold" href={joinUrl} target="_blank" rel="noreferrer">
                  Join Through Linktree
                  <ArrowRight size={18} />
                </a>
              </article>
            </div>

            <div className="benefit-grid">
              {benefits.map((benefit, index) => (
                <article
                  className={`benefit-card ${benefit.featured ? "featured" : ""}`}
                  key={benefit.title}
                  data-reveal
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div>
                    <div className="benefit-head">
                      <h3>{benefit.title}</h3>
                      <span>{benefit.badge}</span>
                    </div>
                    <p>{benefit.description}</p>
                    <ul>
                      {benefit.points.map((feature) => (
                        <li key={feature}>
                          <Check size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>

            <div className="sponsor-panel" data-reveal>
              <div>
                <span className="section-kicker gold">Club Sponsors</span>
                <h3>Backed By Local Bike Shops</h3>
                <p>
                  Members get 15% off parts and select discounts on bike purchases
                  through participating club sponsors.
                </p>
              </div>
              <div className="club-sponsor-grid">
                {sponsors.map((sponsor) => (
                  <span key={sponsor}>{sponsor}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section topo-section" id="faq" aria-labelledby="faq-title">
          <div className="container faq-grid">
            <div data-reveal>
              <span className="section-kicker gold">No Drop Culture</span>
              <h2 id="faq-title">Ride Details Before Dropping In</h2>
              <p>
                Twice a week, the club organizes group rides with skill-based splits,
                practical rental options, and Discord planning for getting riders and
                bikes to the trailhead.
              </p>
              <div className="karma-note">
                <strong>Trail Karma Notice:</strong>
                <span>
                  Every member is invited to one BCCA trail build day per semester. Keep
                  the singletrack clean and primed.
                </span>
              </div>
            </div>

            <div className="accordion" data-reveal>
              {questions.map((item, index) => (
                <div className="accordion-item" key={item.question}>
                  <button
                    type="button"
                    aria-expanded={openQuestion === index}
                    onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <ChevronDown size={19} />
                  </button>
                  <div className={openQuestion === index ? "accordion-panel open" : "accordion-panel"}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <strong>UofC MTB</strong>
              <span>Canmore / Bragg</span>
            </div>
            <p>
              The official collegiate club ripping singletrack across Kananaskis, Bragg
              Creek, and the Bow Valley. High-octane, dirt-first outdoor community.
            </p>
            <div className="sponsor-tags">
              <span>SU Club Certified</span>
              <span>IMBA Trail Crew</span>
            </div>
          </div>

          <div>
            <h3>Rockies Stewardship</h3>
            <div className="footer-note">
              <Mountain size={18} />
              <span>Trail stewardship and volunteer days help keep Bragg Creek singletrack ride-ready.</span>
            </div>
          </div>

          <div>
            <h3>Crew Sponsors</h3>
            <p>Members can get 15% off parts and select discounts on bike purchases.</p>
            <div className="sponsor-tags">
              <span>Ridley's Cycle</span>
              <span>Inside Line</span>
            </div>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>
            <Flag size={18} />
            Ride fast, leave no trace, watch out for Rex.
          </span>
          <small>2026 University of Calgary MTB Club</small>
        </div>
      </footer>
    </>
  );
}
