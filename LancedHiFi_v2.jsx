import { useState, useRef, useEffect } from "react";

// ─── Palette ──────────────────────────────────────────────────────────────────
const P  = "#6B5CE7";
const PD = "#5A4FCF";
const PL = "#EDE9FF";
const PM = "#9B91F0";
const BK = "#0F0E17";
const GR = "#6B6890";
const BG = "#F7F6FF";
const BD = "#E9E6FF";
const WH = "#FFFFFF";

// ─── SVG Icons ────────────────────────────────────────────────────────────────
function Icon({ type, size = 18 }) {
  const p = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };
  const icons = {
    dashboard:     <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    appearance:    <svg {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    opportunities: <svg {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/></svg>,
    media:         <svg {...p}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
    notifications: <svg {...p}><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>,
    messages:      <svg {...p}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
    portfolios:    <svg {...p}><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>,
    applications:  <svg {...p}><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>,
    hub:           <svg {...p}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    career:        <svg {...p}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
    testimonials:  <svg {...p}><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>,
    circles:       <svg {...p}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>,
  };
  return icons[type] || icons.circles;
}

// ─── Sessions data (5 topics — artistic/career focused, no business topics) ───
const SESSIONS = [
  {
    id: 1,
    title: "Your artistic identity online",
    question: "How do you want to be seen as an artist?",
    img: "https://picsum.photos/seed/artistic1/200/160",
    date: "Thu 22 May · 18:00",
    duration: "120 min",
    spotsLeft: 2,
    total: 6,
    expert: {
      name: "Dani Mwangi",
      role: "Choreographer & Co-founder, moving.digital",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      bio: "Dani has built an international following as a choreographer and regularly advises emerging artists on digital presence, positioning, and audience-building.",
      link: "instagram.com/dani.mwangi",
      linkLabel: "Instagram",
    },
    plan: [
      { type: "expert", min: 25 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 20 },
      { type: "qa",     min: 15 },
    ],
    tool: { title: "Artist Bio & Positioning Worksheet", desc: "A one-page exercise to clarify who you are, who your work is for, and how to say it in one strong paragraph. Shared at the end of the session." },
    outcomes: [
      "Clarify your artistic positioning in one sentence",
      "Identify what your online presence is missing",
      "Define your next concrete step for visibility",
    ],
  },
  {
    id: 2,
    title: "Making your own work",
    question: "You have an idea. Now what?",
    img: "https://picsum.photos/seed/creatework/200/160",
    date: "Mon 26 May · 17:00",
    duration: "135 min",
    spotsLeft: 4,
    total: 6,
    expert: {
      name: "Tara Vos",
      role: "Artistic Director, Korzo Theater Den Haag",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      bio: "Tara has supported emerging choreographers and dance makers at Korzo Theater for over a decade — one of the Netherlands' leading dance production houses.",
      link: "korzo.nl",
      linkLabel: "korzo.nl",
    },
    plan: [
      { type: "expert", min: 40 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 20 },
      { type: "qa",     min: 15 },
    ],
    tool: { title: "Project Development Canvas", desc: "A one-page canvas to sketch your first own project — concept, audience, collaborators, budget estimate, and first milestone. Shared at the end of the session." },
    outcomes: [
      "Understand the steps from idea to produced work",
      "Know what support structures exist for emerging makers",
      "Define one concrete first action toward your own project",
    ],
  },
  {
    id: 3,
    title: "After rejection",
    question: "How do you keep going?",
    img: "https://picsum.photos/seed/resilience3/200/160",
    date: "Wed 28 May · 18:30",
    duration: "120 min",
    spotsLeft: 3,
    total: 6,
    expert: {
      name: "Amara Diallo",
      role: "Dancer, Coach & former principal, Scapino Ballet",
      photo: "https://randomuser.me/api/portraits/women/68.jpg",
      bio: "Amara combines 15 years of professional performance experience with certified coaching practice focused on resilience, identity, and artistic longevity.",
      link: "linkedin.com/in/amaradiallo",
      linkLabel: "LinkedIn",
    },
    plan: [
      { type: "expert", min: 25 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 20 },
      { type: "qa",     min: 15 },
    ],
    tool: { title: "Rejection Reframe Map", desc: "A structured exercise to revisit a recent rejection — extract useful feedback, identify what it tells you about fit, and define your next action. Shared at the end of the session." },
    outcomes: [
      "Shift your relationship to rejection from personal to professional",
      "Extract career data from recent setbacks",
      "Leave with one concrete next move",
    ],
  },
  {
    id: 4,
    title: "Finding the right collaborators",
    question: "Who do you want to make work with?",
    img: "https://picsum.photos/seed/collab4/200/160",
    date: "Tue 3 Jun · 17:30",
    duration: "130 min",
    spotsLeft: 5,
    total: 6,
    expert: {
      name: "Lotte van Dijk",
      role: "Choreographer & Co-founder, Club Guy & Roni",
      photo: "https://randomuser.me/api/portraits/women/55.jpg",
      bio: "Lotte co-founded one of the Netherlands' most internationally touring dance companies and has built her practice on long-term collaborative relationships.",
      link: "clubguyroni.nl",
      linkLabel: "clubguyroni.nl",
    },
    plan: [
      { type: "expert", min: 30 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 25 },
      { type: "qa",     min: 15 },
    ],
    tool: { title: "Collaboration Intention Map", desc: "A visual exercise to map the collaborators you have, the collaborators you want, and the gaps in between. Shared at the end of the session." },
    outcomes: [
      "Clarify what you're looking for in a creative collaborator",
      "Learn how others approach finding and building working relationships",
      "Identify one concrete step toward a new collaboration",
    ],
  },
  {
    id: 5,
    title: "Staying relevant as an artist",
    question: "How do you evolve without losing yourself?",
    img: "https://picsum.photos/seed/evolve5/200/160",
    date: "Thu 5 Jun · 18:00",
    duration: "130 min",
    spotsLeft: 3,
    total: 6,
    expert: {
      name: "Marco Berends",
      role: "Artistic Director, Dansateliers Rotterdam",
      photo: "https://randomuser.me/api/portraits/men/71.jpg",
      bio: "Marco has worked with hundreds of dance artists at different career stages and has a sharp eye for how artists navigate artistic evolution and cultural relevance.",
      link: "dansateliers.nl",
      linkLabel: "dansateliers.nl",
    },
    plan: [
      { type: "expert", min: 30 },
      { type: "peer",   min: 60 },
      { type: "disc",   min: 25 },
      { type: "qa",     min: 15 },
    ],
    tool: { title: "Artistic Evolution Timeline", desc: "An exercise to map how your practice has shifted over time — and to identify what you want to move toward next. Shared at the end of the session." },
    outcomes: [
      "Understand how other artists navigate reinvention",
      "Identify what you want to change and what to protect",
      "Leave with one concrete next direction to explore",
    ],
  },
];

// ─── Messages data ─────────────────────────────────────────────────────────────
const CHATS = [
  {
    id: "general",
    type: "group",
    name: "Career Circles — General",
    sub: "Community chat for all Career Circles members",
    initials: "CC",
    unread: 3,
    msgs: [
      { id:1, from:"Lena D.",  init:"L", self:false, time:"Mon 9:12", text:"Does anyone know if the next session will be recorded? I have a conflict." },
      { id:2, from:"Mira K.",  init:"M", self:false, time:"Mon 9:18", text:"I don't think they record — that's actually why I find these sessions more useful. You have to show up." },
      { id:3, from:"Sophie",   init:"S", self:true,  time:"Mon 9:21", text:"Agreed. The peer exchange is the actual value. I learned more in 10 minutes of sharing than in months of Googling." },
      { id:4, from:"Tomas R.", init:"T", self:false, time:"Mon 10:04", text:"Just signed up for the 'Making your own work' session. Nervous but excited." },
      { id:5, from:"Lena D.",  init:"L", self:false, time:"Mon 11:45", text:"I did that one last month! Tara Vos is incredible. You'll leave with so much clarity." },
    ],
  },
  {
    id: "session-chat",
    type: "group",
    name: "After rejection — May 28",
    sub: "Circle group · 6 participants · Amara Diallo",
    initials: "AR",
    completed: true,
    unread: 1,
    msgs: [
      { id:1, from:"Amara (Expert)", init:"A", expert:true, self:false, time:"18:31", text:"Great session everyone. Your Rejection Reframe Maps are in the chat. Use them this week while the session is fresh." },
      { id:2, from:"Mira K.",   init:"M", self:false, time:"18:33", text:"This was so needed. I've been spiraling over one rejection for months. Naming it as data instead of judgement changes everything." },
      { id:3, from:"Sophie",    init:"S", self:true,  time:"18:36", text:"The reframe from 'I wasn't good enough' to 'it wasn't the right fit' feels obvious now — but I genuinely couldn't see it before today." },
      { id:4, from:"Tomas R.",  init:"T", self:false, time:"18:40", text:"Amara — do you find that artists who've had more success still struggle with rejection the same way?" },
      { id:5, from:"Amara (Expert)", init:"A", expert:true, self:false, time:"18:42", text:"Always. The scale changes but the vulnerability doesn't. The difference is they've developed more tools for processing it quickly." },
      {
        id:6, from:"Lanced", init:"◆", system:true, self:false, time:"Wed 18:31",
        text:"📌 One week since your session on After Rejection! How did you use the Rejection Reframe Map? Share with your group — even a small update helps everyone stay motivated.",
      },
      { id:7, from:"Mira K.",  init:"M", self:false, time:"Wed 19:10", text:"Used it on two rejections I'd been avoiding. One of them I now want to reapply to — the map helped me see the feedback wasn't about my work." },
      { id:8, from:"Sophie",   init:"S", self:true,  time:"Wed 19:45", text:"I revisited a rejection from 6 months ago. Turns out it had nothing to do with me — the company went in a totally different direction. Should have looked at that sooner." },
    ],
  },
];

const DM_CHATS = [
  {
    id: "dm-mira",
    type: "dm",
    name: "Mira Kowalski",
    sub: "After rejection session",
    init: "M",
    unread: 0,
    msgs: [
      { id:1, from:"Mira K.", self:false, time:"Wed 20:14", text:"Hey Sophie! What you said in the session about the reframe really resonated. How did you actually apply it?" },
      { id:2, from:"Sophie",  self:true,  time:"Wed 20:31", text:"I literally wrote down the rejection at the top of the map and forced myself to fill in every field. The 'fit score' section was the most useful — realised the company wasn't looking for what I do at all." },
      { id:3, from:"Mira K.", self:false, time:"Wed 20:35", text:"That's such a useful way to make it less personal. I've been avoiding filling mine in." },
      { id:4, from:"Sophie",  self:true,  time:"Wed 20:38", text:"Just do the first field. That's what got me started." },
    ],
  },
];

// ─── Primitives ───────────────────────────────────────────────────────────────
function Av({ name = "?", size = "md", expert = false, system = false }) {
  const sz = size === "lg" ? "w-12 h-12 text-sm" : size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  const bg = system ? PL : expert ? PD : P;
  const tc = system ? P : WH;
  return (
    <div className={`${sz} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
      style={{ background: bg, color: tc }}>
      {name[0].toUpperCase()}
    </div>
  );
}

function Pill({ children, variant = "default" }) {
  const s = {
    default: { background: PL, color: PD, border: `1px solid ${BD}` },
    dark:    { background: BK, color: WH },
    outline: { background: WH, color: GR, border: `1px solid ${BD}` },
    green:   { background: "#EDFBF4", color: "#1D9A5A", border: "1px solid #B5EDD4" },
    orange:  { background: "#FFF4E6", color: "#C45E0A", border: "1px solid #FDDBB4" },
  };
  return (
    <span className="text-xs px-2.5 py-1 rounded-full font-medium inline-flex items-center gap-1"
      style={s[variant] || s.default}>
      {children}
    </span>
  );
}

function PBtn({ children, onClick, className = "", full = false, disabled = false, size = "md" }) {
  const sz = size === "lg" ? "px-6 py-3 text-base" : size === "sm" ? "px-3 py-1.5 text-xs" : "px-5 py-2.5 text-sm";
  return (
    <button onClick={onClick} disabled={disabled}
      className={`${sz} font-semibold rounded-xl ${full ? "w-full" : ""} ${className}`}
      style={{ background: P, color: WH, opacity: disabled ? 0.4 : 1 }}>
      {children}
    </button>
  );
}

function SBtn({ children, onClick, className = "", full = false }) {
  return (
    <button onClick={onClick}
      className={`px-5 py-2.5 text-sm font-semibold rounded-xl ${full ? "w-full" : ""} ${className}`}
      style={{ background: WH, color: P, border: `1.5px solid ${P}` }}>
      {children}
    </button>
  );
}

function Card({ children, className = "", onClick, pad = "p-5" }) {
  return (
    <div onClick={onClick} className={`bg-white rounded-2xl ${pad} ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{ boxShadow: "0 1px 4px rgba(107,92,231,0.08), 0 0 0 1px rgba(107,92,231,0.07)" }}>
      {children}
    </div>
  );
}

function Lbl({ children }) {
  return <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: PM }}>{children}</p>;
}

function Back({ onClick, label }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-sm font-medium mb-5"
      style={{ color: P }}>← {label}
    </button>
  );
}

function Stars({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((n) => (
        <button key={n} onClick={() => onChange(n)} className="text-2xl"
          style={{ color: n <= value ? "#F5A623" : BD }}>★</button>
      ))}
    </div>
  );
}

function ExpertPhoto({ src, name }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
        style={{ background: PL, color: P }}>{name[0]}</div>
    );
  }
  return (
    <img src={src} alt={name}
      className="w-16 h-16 rounded-2xl object-cover flex-shrink-0"
      onError={() => setErr(true)} />
  );
}

// ─── Plan colour bar (simplified — no breakdown list) ─────────────────────────
const PC = { expert: P, peer: "#34C785", disc: "#F59E0B", qa: "#EC6B6B" };
const PL2 = { expert: "Expert", peer: "Peer exchange", disc: "Discussion", qa: "Q&A" };

function PlanBar({ plan }) {
  const total = plan.reduce((s, p) => s + p.min, 0);
  return (
    <div>
      <div className="flex rounded-xl overflow-hidden h-3 mb-3">
        {plan.map((p, i) => (
          <div key={i} style={{ width: `${(p.min / total) * 100}%`, background: PC[p.type] }} />
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mb-2">
        {plan.map((p, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: PC[p.type] }} />
            <span className="text-xs" style={{ color: GR }}>{PL2[p.type]}</span>
          </div>
        ))}
      </div>
      <p className="text-xs mt-1" style={{ color: GR }}>* Peer exchange is about 10 min per participant</p>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
const NAV = [
  { id: "dashboard",    label: "Dashboard",     icon: "dashboard"     },
  { id: "appearance",   label: "Appearance",    icon: "appearance"    },
  { id: "opportunities",label: "Opportunities", icon: "opportunities" },
  { id: "media",        label: "Media Library", icon: "media"         },
  { id: "notifications",label: "Notifications", icon: "notifications" },
  { id: "messages",     label: "Messages",      icon: "messages",     clickable: true },
  null, // divider
  { id: "portfolios",   label: "My Portfolios", icon: "portfolios"    },
  { id: "applications", label: "Applications",  icon: "applications"  },
  { id: "hub",          label: "Artist Hub",    icon: "hub"           },
  { id: "career",       label: "Career Center", icon: "career"        },
  { id: "testimonials", label: "Testimonials",  icon: "testimonials"  },
  { id: "circles",      label: "Career Circles",icon: "circles",      clickable: true, badge: "New" },
];

function Sidebar({ active, onNav, unreadMsg }) {
  return (
    <aside className="w-56 flex-shrink-0 flex flex-col py-5 px-3 overflow-y-auto"
      style={{ background: BG, borderRight: `1px solid ${BD}`, minHeight: "100vh" }}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-2 mb-6">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-black"
          style={{ background: P }}>L</div>
        <span className="font-bold text-base" style={{ color: BK }}>Lanced</span>
      </div>

      <nav className="flex-1 space-y-0.5">
        {NAV.map((item, i) => {
          if (!item) return (
            <div key={`div-${i}`} className="my-2" style={{ height: 1, background: BD }} />
          );
          const isActive = item.id === active;
          return (
            <button key={item.id}
              onClick={item.clickable ? () => onNav(item.id) : undefined}
              className="w-full text-left px-3 py-2 rounded-xl text-sm flex items-center gap-3 transition-all"
              style={{
                background: isActive ? PL : "transparent",
                color: isActive ? P : item.clickable ? GR : "rgba(107,92,231,0.3)",
                fontWeight: isActive ? 600 : 400,
                border: isActive ? `1.5px solid ${BD}` : "1.5px solid transparent",
                cursor: item.clickable ? "pointer" : "default",
              }}>
              <span style={{ color: isActive ? P : item.clickable ? GR : "rgba(107,92,231,0.25)", flexShrink: 0 }}>
                <Icon type={item.icon} size={17} />
              </span>
              <span className="flex-1">{item.label}</span>
              {item.id === "messages" && unreadMsg > 0 && (
                <span className="text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                  style={{ background: "#EC6B6B", color: WH }}>{unreadMsg}</span>
              )}
              {item.badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                  style={{ background: P, color: WH }}>{item.badge}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-4 pt-3 px-2 flex items-center gap-2" style={{ borderTop: `1px solid ${BD}` }}>
        <Av name="S" size="sm" />
        <div className="min-w-0">
          <p className="text-xs font-semibold truncate" style={{ color: BK }}>Sophie Marler</p>
          <p className="text-xs truncate" style={{ color: GR }}>Artist</p>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CAREER CIRCLES SCREENS
// ─────────────────────────────────────────────────────────────────────────────

function CC_Overview({ onSelect }) {
  return (
    <div className="p-7 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1" style={{ color: BK }}>Career Circles</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-base" style={{ color: GR }}>Guided by experts. Shaped by peers.</p>
          <span style={{ color: BD }}>·</span>
          <Pill variant="outline">6 artists + 1 expert per session</Pill>
        </div>
      </div>

      <div className="space-y-3">
        {SESSIONS.map((s) => (
          <Card key={s.id} onClick={() => onSelect(s)} pad="p-0" className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="flex gap-0">
              {/* Thumbnail */}
              <img
                src={s.img}
                alt={s.title}
                className="w-24 flex-shrink-0 object-cover"
                style={{ minHeight: 90 }}
                onError={(e) => { e.target.style.background = PL; e.target.style.display = "block"; }}
              />
              {/* Content */}
              <div className="flex-1 min-w-0 px-4 py-3 flex flex-col justify-between">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-sm leading-snug" style={{ color: BK }}>{s.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: GR }}>{s.question}</p>
                  </div>
                  <span className="text-base font-black flex-shrink-0" style={{ color: P }}>€20</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-2.5">
                  <span className="text-xs" style={{ color: GR }}>📅 {s.date}</span>
                  <span className="text-xs" style={{ color: GR }}>·</span>
                  <span className="text-xs font-medium" style={{ color: BK }}>{s.expert.name}</span>
                  <span className="text-xs" style={{ color: GR }}>·</span>
                  <Pill variant={s.spotsLeft <= 2 ? "orange" : "outline"}>
                    {s.spotsLeft} spot{s.spotsLeft !== 1 ? "s" : ""} left
                  </Pill>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CC_Detail({ session: s, onJoin, back }) {
  const [tab, setTab] = useState("plan");

  return (
    <div className="max-w-2xl">
      {/* Hero */}
      <div className="px-7 pt-7 pb-5"
        style={{ background: `linear-gradient(135deg, ${PL} 0%, ${WH} 100%)`, borderBottom: `1px solid ${BD}` }}>
        <Back onClick={back} label="All sessions" />
        <h2 className="text-2xl font-bold mb-0.5" style={{ color: BK }}>{s.title}</h2>
        <p className="text-base mb-3" style={{ color: GR }}>{s.question}</p>
        <div className="flex flex-wrap gap-2">
          <Pill variant="outline">📅 {s.date}</Pill>
          <Pill variant="outline">⏱ {s.duration}</Pill>
          <Pill variant={s.spotsLeft <= 2 ? "orange" : "outline"}>{s.spotsLeft} spots left</Pill>
        </div>
      </div>

      <div className="p-7">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl" style={{ background: BG }}>
          {["plan", "expert"].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className="flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-all"
              style={{
                background: tab === t ? WH : "transparent",
                color: tab === t ? P : GR,
                boxShadow: tab === t ? "0 1px 4px rgba(107,92,231,0.12)" : "none",
              }}>
              {t === "plan" ? "Session plan" : "Expert"}
            </button>
          ))}
        </div>

        {/* Tab: Plan */}
        {tab === "plan" && (
          <div>
            <Lbl>Session structure</Lbl>
            <PlanBar plan={s.plan} />

            <div className="mt-6">
              <Lbl>What you'll get</Lbl>
              <div className="space-y-2 mb-4">
                {s.outcomes.map((o) => (
                  <div key={o} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0"
                      style={{ background: PL }}>
                      <span className="text-xs font-bold" style={{ color: P }}>✓</span>
                    </div>
                    <span className="text-sm" style={{ color: BK }}>{o}</span>
                  </div>
                ))}
                {/* Tool as special last item */}
                <div className="flex items-start gap-2.5">
                  <span className="text-base flex-shrink-0 mt-0.5">🛠</span>
                  <span className="text-sm font-semibold" style={{ color: BK }}>{s.tool.title}</span>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div className="mt-7 pt-6" style={{ borderTop: `1px solid ${BD}` }}>
              <div className="flex gap-3">
                <Card pad="p-4" className="flex-1 text-center">
                  <p className="text-2xl font-black" style={{ color: BK }}>€20</p>
                  <p className="text-xs mt-0.5" style={{ color: GR }}>Single session</p>
                  <p className="text-xs mt-1 font-medium leading-relaxed" style={{ color: P }}>
                    + your circle chat<br />+ community chat
                  </p>
                  <PBtn onClick={onJoin} full className="mt-3" size="sm">Join this session</PBtn>
                </Card>
                <Card pad="p-4" className="flex-1 text-center" style={{ border: `1.5px solid ${P}` }}>
                  <div className="flex items-center justify-center gap-1.5">
                    <p className="text-2xl font-black" style={{ color: P }}>€99</p>
                    <Pill variant="green">Save €21</Pill>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: GR }}>Bundle · 6 sessions</p>
                  <p className="text-xs mt-1 font-medium leading-relaxed" style={{ color: P }}>
                    + your circle chat<br />+ community chat
                  </p>
                  <SBtn full className="mt-3 text-xs py-2">Buy bundle</SBtn>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Expert */}
        {tab === "expert" && (
          <div>
            <Lbl>Your expert</Lbl>
            <Card pad="p-5">
              <div className="flex gap-4 items-start">
                <ExpertPhoto src={s.expert.photo} name={s.expert.name} />
                <div className="flex-1">
                  <p className="font-bold text-lg" style={{ color: BK }}>{s.expert.name}</p>
                  <p className="text-sm mb-2" style={{ color: P }}>{s.expert.role}</p>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: GR }}>{s.expert.bio}</p>
                  <a
                    href={`https://${s.expert.link}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold inline-flex items-center gap-1"
                    style={{ color: P }}>
                    ↗ {s.expert.linkLabel}
                  </a>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// Session in progress — Zoom-like UI
function CC_Session({ session: s, onEnd, back }) {
  const participants = ["Sophie", "Mira", "Lena", "Jules", "Tomas", "Annika"];

  return (
    <div className="flex flex-col h-full" style={{ background: "#0F0F23" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div>
          <p className="text-white text-sm font-semibold">{s.title}</p>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
            Career Circle · with {s.expert.name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: "#34C785" }} />
          <span className="text-xs font-semibold" style={{ color: "#34C785" }}>Live</span>
        </div>
      </div>

      {/* Main area — expert speaker tile */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-6 gap-4">
        <div className="rounded-2xl flex flex-col items-center justify-center relative"
          style={{ background: "#1C1A3A", width: "100%", maxWidth: 520, aspectRatio: "16/9",
            border: `2px solid ${P}`, boxShadow: `0 0 30px rgba(107,92,231,0.3)` }}>
          {/* Expert photo or avatar */}
          <div className="relative">
            <img
              src={s.expert.photo}
              alt={s.expert.name}
              className="w-20 h-20 rounded-full object-cover"
              style={{ border: `3px solid ${P}` }}
              onError={(e) => { e.target.style.display = "none"; }}
            />
          </div>
          <p className="text-white font-semibold mt-3 text-sm">{s.expert.name}</p>
          <p className="text-xs mt-0.5" style={{ color: PM }}>{s.expert.role}</p>
          {/* Mic indicator */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2 py-1 rounded-lg"
            style={{ background: "rgba(0,0,0,0.5)" }}>
            <span className="text-xs" style={{ color: "#34C785" }}>🎤</span>
            <span className="text-xs text-white opacity-70">Speaking</span>
          </div>
        </div>

        {/* Participant row */}
        <div className="flex gap-2.5 justify-center">
          {participants.map((p) => (
            <div key={p} className="flex flex-col items-center gap-1.5">
              <div className="w-16 rounded-xl flex items-center justify-center font-bold text-sm"
                style={{ background: "#1C1A3A", aspectRatio: "4/3",
                  border: "1.5px solid rgba(255,255,255,0.08)", color: PM }}>
                {p[0]}
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.45)" }}>{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 px-6 py-4 flex-shrink-0"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {/* Decorative controls */}
        {[
          { icon: "🎤", label: "Mute" },
          { icon: "📷", label: "Camera" },
          { icon: "👥", label: "Participants" },
          { icon: "💬", label: "Chat" },
        ].map((ctrl) => (
          <button key={ctrl.label} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl"
            style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>
            <span className="text-lg">{ctrl.icon}</span>
            <span className="text-xs">{ctrl.label}</span>
          </button>
        ))}
        <button onClick={onEnd}
          className="flex flex-col items-center gap-1 px-5 py-2 rounded-xl ml-4"
          style={{ background: "#E53E3E", color: WH }}>
          <span className="text-lg">📴</span>
          <span className="text-xs font-semibold">End session</span>
        </button>
      </div>
    </div>
  );
}

// Feedback form
function CC_Feedback({ session: s, onDone, back }) {
  const [rating, setRating]   = useState(0);
  const [expert, setExpert]   = useState(null);
  const [best, setBest]       = useState("");
  const [improve, setImprove] = useState("");
  const [again, setAgain]     = useState(null);

  const ready = rating > 0 && expert && again;

  return (
    <div className="p-7 max-w-xl">
      <Back onClick={back} label="Session" />
      <h2 className="text-2xl font-bold mb-6" style={{ color: BK }}>Session feedback</h2>

      <div className="space-y-4">
        <Card pad="p-4">
          <Lbl>How would you rate this session?</Lbl>
          <Stars value={rating} onChange={setRating} />
          {rating > 0 && (
            <p className="text-xs mt-2" style={{ color: PM }}>
              {["","Not what I expected","Below average","It was okay","Really valuable","Excellent — would highly recommend"][rating]}
            </p>
          )}
        </Card>

        <Card pad="p-4">
          <Lbl>Was the expert relevant and useful?</Lbl>
          <div className="flex gap-2">
            {["Yes, very", "Somewhat", "Not really"].map((opt) => (
              <button key={opt} onClick={() => setExpert(opt)}
                className="flex-1 py-2 rounded-xl text-sm font-medium border transition-all"
                style={{ background: expert === opt ? P : WH, color: expert === opt ? WH : GR,
                  borderColor: expert === opt ? P : BD }}>
                {opt}
              </button>
            ))}
          </div>
        </Card>

        <Card pad="p-4">
          <Lbl>What worked best?</Lbl>
          <textarea value={best} onChange={(e) => setBest(e.target.value)} rows={2}
            placeholder="e.g. the peer exchange, the expert's framework, the tool..."
            className="w-full text-sm rounded-xl px-3 py-2.5 resize-none focus:outline-none"
            style={{ border: `1.5px solid ${BD}`, color: BK }} />
        </Card>

        <Card pad="p-4">
          <Lbl>What could be improved?</Lbl>
          <textarea value={improve} onChange={(e) => setImprove(e.target.value)} rows={2}
            placeholder="Be specific — this goes directly to the Lanced team."
            className="w-full text-sm rounded-xl px-3 py-2.5 resize-none focus:outline-none"
            style={{ border: `1.5px solid ${BD}`, color: BK }} />
        </Card>

        <Card pad="p-4">
          <Lbl>Would you join another Career Circle?</Lbl>
          <div className="flex gap-2">
            {["Yes, definitely", "Maybe", "No"].map((opt) => (
              <button key={opt} onClick={() => setAgain(opt)}
                className="flex-1 py-2 rounded-xl text-sm font-medium border transition-all"
                style={{ background: again === opt ? P : WH, color: again === opt ? WH : GR,
                  borderColor: again === opt ? P : BD }}>
                {opt}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <PBtn onClick={onDone} full className="mt-6" size="lg" disabled={!ready}>
        Submit feedback →
      </PBtn>
      {!ready && (
        <p className="text-center text-xs mt-2" style={{ color: GR }}>Please answer the required questions above</p>
      )}
    </div>
  );
}

// Done screen
function CC_Done({ session: s, goBack }) {
  return (
    <div className="p-7 max-w-lg flex flex-col items-center text-center">
      <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5"
        style={{ background: PL }}>🎉</div>
      <h2 className="text-2xl font-bold mb-2" style={{ color: BK }}>Session complete!</h2>
      <p className="text-sm mb-6" style={{ color: GR }}>
        Thank you for your feedback — it goes directly to the Lanced team.<br />
        Your group chats are open and waiting.
      </p>
      <Card pad="p-4" className="w-full text-left mb-4" style={{ border: `1.5px solid ${P}` }}>
        <div className="flex gap-3">
          <span className="text-xl">🛠</span>
          <div>
            <p className="font-semibold text-sm" style={{ color: BK }}>{s.tool.title}</p>
            <p className="text-xs mt-0.5" style={{ color: GR }}>Shared to your circle group chat.</p>
            <p className="text-xs mt-1 font-medium" style={{ color: P }}>
              In 7 days, your group will be reminded to share how it went.
            </p>
          </div>
        </div>
      </Card>
      <PBtn onClick={goBack} full size="lg">Back to Career Circles</PBtn>
    </div>
  );
}

function CareerCircles() {
  const [screen, setScreen] = useState("overview");
  const [session, setSession] = useState(null);

  const go = (s, data) => { if (data) setSession(data); setScreen(s); };

  const screens = {
    overview: <CC_Overview onSelect={(s) => go("detail", s)} />,
    detail:   session && <CC_Detail session={session} onJoin={() => go("session")} back={() => go("overview")} />,
    session:  session && <CC_Session session={session} onEnd={() => go("feedback")} back={() => go("detail")} />,
    feedback: session && <CC_Feedback session={session} onDone={() => go("done")} back={() => go("session")} />,
    done:     session && <CC_Done session={session} goBack={() => go("overview")} />,
  };

  const isFullHeight = screen === "session";

  return (
    <div className={`${isFullHeight ? "h-full flex flex-col" : ""}`}>
      {screens[screen] || screens["overview"]}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MESSAGES
// ─────────────────────────────────────────────────────────────────────────────
function MSG_List({ onOpen }) {
  return (
    <div className="p-7 max-w-xl">
      <h2 className="text-2xl font-bold mb-6" style={{ color: BK }}>Messages</h2>

      {/* Career Circles chats */}
      <div className="mb-6">
        <Lbl>Career Circles chats</Lbl>
        <div className="space-y-2">
          {CHATS.map((c) => {
            const last = c.msgs[c.msgs.length - 1];
            return (
              <Card key={c.id} onClick={() => onOpen(c)} pad="p-4" className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                      style={{ background: BK, color: WH }}>{c.initials}</div>
                    {c.completed && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: "#34C785", color: WH, fontSize: 9 }}>✓</div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm truncate" style={{ color: BK }}>{c.name}</p>
                      <span className="text-xs flex-shrink-0" style={{ color: GR }}>{last.time}</span>
                    </div>
                    <p className="text-xs truncate" style={{ color: GR }}>
                      {last.system ? "📌 Lanced reminder" : `${last.from}: ${last.text}`}
                    </p>
                  </div>
                  {c.unread > 0 && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: P, color: WH }}>{c.unread}</div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Direct messages */}
      <div>
        <Lbl>Direct messages</Lbl>
        <div className="space-y-2">
          {DM_CHATS.map((c) => {
            const last = c.msgs[c.msgs.length - 1];
            return (
              <Card key={c.id} onClick={() => onOpen(c)} pad="p-4" className="hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm"
                    style={{ background: PL, color: P }}>{c.init}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-sm truncate" style={{ color: BK }}>{c.name}</p>
                      <span className="text-xs flex-shrink-0" style={{ color: GR }}>{last.time}</span>
                    </div>
                    <p className="text-xs truncate" style={{ color: GR }}>{last.from}: {last.text}</p>
                  </div>
                  {c.unread > 0 && (
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                      style={{ background: P, color: WH }}>{c.unread}</div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MSG_Chat({ chat, back }) {
  const [msgs, setMsgs] = useState(chat.msgs);
  const [text, setText] = useState("");
  const ref = useRef(null);
  const isDM = chat.type === "dm";

  const send = () => {
    if (!text.trim()) return;
    setMsgs((p) => [...p, {
      id: Date.now(), from: "Sophie", init: "S", self: true,
      time: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
      text: text.trim(),
    }]);
    setText("");
  };

  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 py-3 flex-shrink-0"
        style={{ background: WH, borderBottom: `1px solid ${BD}` }}>
        <button onClick={back} className="text-sm font-medium" style={{ color: P }}>←</button>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
          style={{ background: isDM ? PL : BK, color: isDM ? P : WH }}>
          {isDM ? chat.init : chat.initials}
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm" style={{ color: BK }}>{chat.name}</p>
          <p className="text-xs" style={{ color: GR }}>{chat.sub}</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4" style={{ background: BG }}>
        {msgs.map((m) => {
          if (m.system) {
            return (
              <div key={m.id} className="flex justify-center">
                <Card pad="px-4 py-3" className="max-w-sm text-center" style={{ border: `1.5px solid ${P}`, background: PL }}>
                  <p className="text-sm font-semibold mb-1" style={{ color: P }}>📌 Lanced</p>
                  <p className="text-xs" style={{ color: GR }}>{m.text}</p>
                  <p className="text-xs mt-1" style={{ color: PM }}>{m.time}</p>
                </Card>
              </div>
            );
          }
          const self = m.self;
          const expert = m.expert;
          return (
            <div key={m.id} className={`flex gap-2.5 ${self ? "flex-row-reverse" : ""}`}>
              <Av name={m.init || m.from} expert={expert} size="sm" />
              <div className={`flex flex-col gap-0.5 max-w-xs ${self ? "items-end" : ""}`}>
                {!self && (
                  <span className="text-xs font-semibold" style={{ color: expert ? P : GR }}>{m.from}</span>
                )}
                <div className={`px-3 py-2.5 rounded-2xl text-sm leading-relaxed ${self ? "rounded-tr-sm" : "rounded-tl-sm"}`}
                  style={{ background: self ? P : expert ? PL : WH, color: self ? WH : BK,
                    border: self ? "none" : `1px solid ${BD}` }}>
                  {m.text}
                </div>
                {!self && !isDM && (
                  <span className="text-xs" style={{ color: PM, cursor: "pointer" }}>Message privately</span>
                )}
                <span className="text-xs" style={{ color: "rgba(107,92,231,0.3)" }}>{m.time}</span>
              </div>
            </div>
          );
        })}
        <div ref={ref} />
      </div>

      <div className="flex gap-2 px-4 py-3 flex-shrink-0" style={{ background: WH, borderTop: `1px solid ${BD}` }}>
        <input value={text} onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={isDM ? `Message ${chat.name.split(" ")[0]}...` : "Message the group..."}
          className="flex-1 text-sm rounded-xl px-4 py-2.5 focus:outline-none"
          style={{ border: `1.5px solid ${BD}`, color: BK }} />
        <PBtn onClick={send}>Send</PBtn>
      </div>
    </div>
  );
}

function Messages() {
  const [screen, setScreen] = useState("list");
  const [chat, setChat] = useState(null);

  if (screen === "chat" && chat) {
    return (
      <div className="flex flex-col h-full">
        <MSG_Chat chat={chat} back={() => setScreen("list")} />
      </div>
    );
  }
  return <MSG_List onOpen={(c) => { setChat(c); setScreen("chat"); }} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [section, setSection] = useState("circles");
  const totalUnread = [...CHATS, ...DM_CHATS].reduce((s, c) => s + (c.unread || 0), 0);

  const isSessionScreen = section === "circles"; // handled internally
  const isFullHeight = section === "messages";

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: BG }}>
      <Sidebar active={section} onNav={setSection} unreadMsg={totalUnread} />
      <main className={`flex-1 ${isFullHeight ? "overflow-hidden flex flex-col" : "overflow-y-auto"}`}
        style={{ background: BG }}>
        {section === "circles" && (
          <div className="h-full">
            <CareerCircles />
          </div>
        )}
        {section === "messages" && <Messages />}
        {section !== "circles" && section !== "messages" && (
          <div className="p-10 text-sm" style={{ color: GR }}>
            This section is not in the prototype scope.
          </div>
        )}
      </main>
    </div>
  );
}
