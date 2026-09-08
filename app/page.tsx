"use client";

import {
  ArrowRight,
  Bike,
  CalendarDays,
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
import { FormEvent, useEffect, useMemo, useState } from "react";

const navItems = [
  { label: "Rides & Shreds", href: "#schedule" },
  { label: "Trail Gallery", href: "#gallery" },
  { label: "The Fleet & Gear", href: "#membership" },
  { label: "Join The Pack", href: "#signup-form" },
];

const stats = [
  { value: "450+", label: "Active Riders" },
  { value: "24", label: "Group Shreds / Yr" },
  { value: "3", label: "Bike Clinics" },
  { value: "#1", label: "Legendary Mascot", featured: true },
];

const rides = [
  {
    id: "twilight",
    day: "Wednesday Twilight",
    time: "6:00 PM",
    title: "Bragg Creek Twilight Laps & Bragging Rights",
    body:
      "Fast, flowy singletrack along Ranger Summit and Strange Brew followed by trailhead burritos. Headlights required for final descents.",
    level: "Blue Square / Intermediate",
    tone: "gold",
    icon: Bike,
    lead: "Sarah \"Crank\" M.",
    metricA: "Elevation gain: +420m",
    metricB: "Distance: 16.4 km",
    action: "Instant RSVP (18/25)",
    confirmed: "RSVP Confirmed",
    className: "ride-card-wide tilt-left",
    path: "M0 38 Q 40 38, 70 20 T 140 10 T 210 28 T 260 5 L 300 35",
  },
  {
    id: "clinic",
    day: "Thursday",
    time: "6:30 PM",
    title: "Campus Wrench & Tubeless Clinic",
    body:
      "Learn derailleur indexing, brake bleeding, and tubeless plugging at the UCalgary Kinesiology B outdoor shop.",
    level: "Free for members",
    tone: "neutral",
    icon: Hammer,
    lead: "Outdoor Centre Shop",
    metricA: "Capacity: 15 spots max",
    metricB: "Loaner stands ready",
    action: "Reserve Spot",
    confirmed: "Spot Reserved",
    className: "ride-card-small tilt-right",
    path: "M0 32 Q 60 10, 115 22 T 210 16 T 300 28",
  },
  {
    id: "moose",
    day: "Saturday",
    time: "8:30 AM",
    title: "Moose Mountain Downhill Gravity Shuttle",
    body:
      "Full-face helmets, knee pads, and send-it attitude mandatory. Shuttles run Moose Mountain road for Jean-Guy, Toothless, and T-Rex laps.",
    level: "Double Black Diamond",
    tone: "red",
    icon: Truck,
    lead: "Dave & Tyler",
    metricA: "Vertical drop: -1,850m",
    metricB: "Run count: 5 laps",
    action: "Grab Shuttle Seat",
    confirmed: "Waitlist Joined",
    className: "tilt-right-soft",
    path: "M0 8 Q 45 35, 88 18 T 172 8 T 250 24 T 300 6",
  },
  {
    id: "coffee",
    day: "Sunday",
    time: "10:00 AM",
    title: "Canmore Nordic Centre Coffee & Flow",
    body:
      "Relaxed pace, zero drops left behind. Smooth berms, vista photo stops, and post-ride espresso in downtown Canmore.",
    level: "Green Circle / Beginner Friendly",
    tone: "gold",
    icon: Coffee,
    lead: "Maya K.",
    metricA: "Elevation: +180m",
    metricB: "Distance: 11.2 km",
    action: "Instant RSVP (12/30)",
    confirmed: "RSVP Confirmed",
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

const tiers = [
  {
    id: "cruiser",
    name: "Campus Cruiser",
    badge: "Entry",
    price: "$25",
    description: "Ideal for campus commuters and casual weekend singletrack riders.",
    features: [
      "Weekend social trail rides",
      "Club vinyl sticker pack",
      "10% off service at Bow Cycle",
    ],
    action: "Select Cruiser",
  },
  {
    id: "shredder",
    name: "Alpine Shredder",
    badge: "Most Popular",
    price: "$45",
    description:
      "The sweet spot: exclusive UCalgary MTB tech jersey, free shuttles, and event entries.",
    features: [
      "Official UCalgary MTB club custom jersey",
      "2 free Moose Mtn shuttle passes",
      "Unlimited Wrench Night tool access",
      "Tailgate BBQ hospitality",
    ],
    action: "Get Alpine Shredder",
    featured: true,
  },
  {
    id: "racer",
    name: "Enduro Racer",
    badge: "Race Team",
    price: "$70",
    description: "For competitive racers chasing Alberta Cup and collegiate downhill points.",
    features: [
      "Collegiate race team license affiliation",
      "Custom race number plate and speed suit discount",
      "Weekly high-performance skills coaching",
    ],
    action: "Select Enduro Racer",
  },
];

const questions = [
  {
    question: "Do I need a high-end bike to join group rides?",
    answer:
      "Not at all. Sunday Coffee & Flow rides are tailored for beginner to intermediate riders on any functioning mountain bike or gravel rig. You can also rent trail-ready rigs at student rates through the UCalgary Outdoor Centre.",
  },
  {
    question: "How does transportation to Bragg Creek and Canmore work?",
    answer:
      "We coordinate carpooling for every weekend ride through the club Discord. Drivers with hitch racks get gas compensated, and the club van transports up to 10 additional bikes for official trail days.",
  },
  {
    question: "What gear is mandatory for participation?",
    answer:
      "A certified cycling helmet is non-negotiable for all events. Technical rides and Moose Mountain shuttles require a full-face helmet and knee guards. We keep some loaner armor at the Outdoor Centre.",
  },
];

const galleryFilters = ["All Shreds", "Downhill / Freeride", "Flow & XC", "Social & Tailgates"];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Shreds");
  const [selectedTier, setSelectedTier] = useState("shredder");
  const [rideStates, setRideStates] = useState<Record<string, boolean>>({});
  const [openQuestion, setOpenQuestion] = useState(0);
  const [formSent, setFormSent] = useState(false);
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

  function selectTier(tier: string) {
    setSelectedTier(tier);
    document.getElementById("signup-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormSent(true);
  }

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
              <small>Calgary Shred Pack</small>
            </span>
          </a>

          <span className="established-badge">
            <Sparkles size={15} />
            Est. 1994 / YYC
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
            <a className="btn btn-primary compact" href="#signup-form">
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
                  <Flag size={15} />
                  Est. 1994 / SU Certified
                </span>
                <span className="sticker sticker-red">
                  <Mountain size={15} />
                  Rocky Mtn Certified Shred
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
                <a className="btn btn-primary btn-large" href="#signup-form">
                  <Users size={20} />
                  Join The Pack ($35/Yr)
                  <span>2026 Pass</span>
                </a>
                <a className="btn btn-secondary" href="#schedule">
                  View Weekly Shreds
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
                  Singletrack Agenda
                </span>
                <h2 id="schedule-title">Rides & Weekly Shreds</h2>
                <p>
                  From relaxed recovery river spins to rowdy double-black downhill drops.
                  Pick your pace, RSVP, and meet at the MacEwan trailhead van or the trail lot.
                </p>
              </div>
              <div className="segmented" aria-label="Ride filters">
                <button type="button">All Levels</button>
                <button type="button" className="selected">
                  This Week (4)
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
                      <span className="ride-lead">
                        <span className="lead-avatar">D</span>
                        Lead: {ride.lead}
                      </span>
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
              <span className="section-kicker red">Season Membership 2026</span>
              <h2 id="membership-title">Pick Your Pack Tier</h2>
              <p>
                Every membership funds trail maintenance volunteer days with Bragg Creek
                Trails and gets you rides, shuttle access, and local bike shop discounts.
              </p>
            </div>

            <div className="tier-grid">
              {tiers.map((tier, index) => (
                <article
                  className={`tier-card ${tier.featured ? "featured" : ""}`}
                  key={tier.id}
                  data-reveal
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div>
                    <div className="tier-head">
                      <h3>{tier.name}</h3>
                      <span>{tier.badge}</span>
                    </div>
                    <div className="tier-price">
                      <strong>{tier.price}</strong>
                      <span>/ Season</span>
                    </div>
                    <p>{tier.description}</p>
                    <ul>
                      {tier.features.map((feature) => (
                        <li key={feature}>
                          <Check size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    className={tier.featured ? "btn btn-gold" : "btn btn-ghost"}
                    type="button"
                    onClick={() => selectTier(tier.id)}
                  >
                    {tier.action}
                  </button>
                </article>
              ))}
            </div>

            <div className="signup-panel" id="signup-form" data-reveal>
              <div className="signup-head">
                <div>
                  <span>Fast-track roster enrollment</span>
                  <h3>Claim Your Jersey & Rider Badge</h3>
                </div>
                <p>
                  <ShieldCheck size={16} />
                  UCalgary students, alumni, and community welcome
                </p>
              </div>

              {formSent ? (
                <div className="success-message" role="status">
                  <Check size={24} />
                  <div>
                    <strong>Welcome to the pack.</strong>
                    <span>Orientation ride details and Discord access are queued for your inbox.</span>
                  </div>
                </div>
              ) : (
                <form className="signup-form" onSubmit={submitForm}>
                  <label>
                    <span>UCalgary Email or Student ID</span>
                    <input type="email" required placeholder="dino.rider@ucalgary.ca" />
                  </label>
                  <label>
                    <span>Skill / Trail Comfort</span>
                    <select defaultValue="blue">
                      <option value="green">Green: beginner, gravel, flow</option>
                      <option value="blue">Blue: intermediate singletrack</option>
                      <option value="black">Black: technical roots</option>
                      <option value="double-black">Double black: downhill drops</option>
                    </select>
                  </label>
                  <label>
                    <span>Membership Plan</span>
                    <select value={selectedTier} onChange={(event) => setSelectedTier(event.target.value)}>
                      <option value="cruiser">Campus Cruiser ($25)</option>
                      <option value="shredder">Alpine Shredder ($45)</option>
                      <option value="racer">Enduro Racer ($70)</option>
                    </select>
                  </label>
                  <button className="btn btn-primary" type="submit">
                    Send It
                    <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="section faq-section topo-section" id="faq" aria-labelledby="faq-title">
          <div className="container faq-grid">
            <div data-reveal>
              <span className="section-kicker gold">No Drop Culture</span>
              <h2 id="faq-title">Got Questions Before Dropping In?</h2>
              <p>
                Whether you own a campus hardtail or a full downhill machine, the club is
                built on stoke, inclusion, and getting everyone safely into the Rockies.
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
            <h3>Campus Trailhead Hub</h3>
            <p>MacEwan Student Centre Rm 248, University of Calgary</p>
            <p>Wrench Nights: Wed 6:30 PM at Kinesiology B</p>
          </div>

          <div>
            <h3>Rockies Stewardship</h3>
            <div className="footer-note">
              <Mountain size={18} />
              <span>450+ volunteer hours committed each season to Bragg Creek trail repair.</span>
            </div>
          </div>

          <div>
            <h3>Crew Sponsors</h3>
            <p>Proudly fueled by Calgary bike builders and Alberta gear shops.</p>
            <div className="sponsor-tags">
              <span>Bow Cycle</span>
              <span>Ridley's</span>
              <span>7Mesh YYC</span>
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
