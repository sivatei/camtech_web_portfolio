import { useEffect, useRef, useState } from "react";

const skillGroups = [
  {
    label: "Languages & Frameworks",
    skills: [
      { name: "JavaScript",        pct: 70 },
      { name: "Python",            pct: 72 },
      { name: "Java",              pct: 75 },
      { name: "C / C++",           pct: 80 },
      { name: "C#",                pct: 60 },
    ],
  },
  {
    label: "Frontend",
    skills: [
      { name: "React",        pct: 85 },
      { name: "Tailwind CSS", pct: 82 },
      { name: "HTML / CSS",   pct: 88 },
      { name: "Bootstrap",    pct: 75 },
    ],
  },
  {
    label: "Backend & Data",
    skills: [
      { name: "Node.js / Express", pct: 68 },
      { name: "MongoDB",           pct: 65 },
      { name: "MySQL",             pct: 62 },
      { name: "REST APIs",         pct: 68 },
    ],
  },
  {
    label: "Tools & Platforms",
    skills: [
      { name: "Git / GitHub", pct: 85 },
      { name: "Docker",       pct: 55 },
      { name: "Figma",        pct: 78 },
    ],
  },
];

function SkillBar({ name, pct, delay = 0 }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setWidth(pct), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [pct, delay]);

  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-mono text-xs text-slate-200 font-semibold">
          {name}
        </span>
        <span
          className="font-mono text-xs font-semibold transition-all duration-700"
          style={{ color: pct >= 80 ? "#60a5fa" : pct >= 70 ? "#3b82f6" : "#2563eb" }}
        >
          {width}%
        </span>
      </div>

      {/* Track */}
      <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
        {/* Fill */}
        <div
          className="h-full rounded-full relative overflow-hidden"
          style={{
            width: `${width}%`,
            transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
            background: "linear-gradient(90deg, #1e3a8a, #2563eb, #3b82f6)",
          }}
        >
          {/* Shimmer sweep */}
          <span
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 50%, transparent 100%)",
              animation: "shimmer 2.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20 relative z-10">
      <p className="eyebrow">02 / skills</p>
      <h2 className="section-title mt-2 text-3xl text-paper">Technical Skills</h2>
      <p className="mt-2 text-fog text-sm">proficiency across my tech stack</p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <div key={group.label} className="glass-card p-6">
            <p className="font-mono text-xs uppercase tracking-widest text-blue-400 font-bold mb-5">
              {group.label}
            </p>
            <div className="space-y-4">
              {group.skills.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  pct={skill.pct}
                  delay={i * 120}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
