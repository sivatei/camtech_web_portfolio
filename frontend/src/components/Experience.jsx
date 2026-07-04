const timeline = [
  {
    period: "2025 - 2028",
    title: "Bachelor in Software Engineering",
    org: "Camtech University",
    tags: [],
    description:
      "Coursework spanning web development, databases, data structures, and software engineering practice.",
  },
  {
    period: "2025",
    title: "Bus Ticket Booking App Design",
    org: "Personal Project",
    tags: ["Figma", "UX/UI Design", "Prototyping"],
    description:
      "Created schedule search interfaces, seat layout maps, and clean booking checkout flows in Figma for a bus reservation app.",
  },
  {
    period: "2025",
    title: "Food Receipt Front-End",
    org: "Personal Project",
    tags: ["React", "Tailwind CSS"],
    description:
      "Built an interactive frontend website for food course receipts, managing course options, pricing totals, and client-side receipt layouts.",
  },
  {
    period: "2025",
    title: "E-Commerce Project",
    org: "Personal Project",
    tags: ["React", "Tailwind CSS"],
    description:
      "Developed a responsive e-commerce frontend featuring product listings, search filtering, dynamic cart management, and checkout simulation.",
  },
  {
    period: "2025",
    title: "Supermarket Mobile App Design",
    org: "Personal Project",
    tags: ["Figma", "UX/UI Design", "Wireframing"],
    description:
      "Designed a comprehensive UX/UI prototype for a modern supermarket shopping mobile application, focusing on intuitive checkout user flows.",
  },
  {
    period: "2025 - 2027",
    title: "Internship Team Project",
    org: "Internship",
    tags: ["Figma", "React", "Tailwind CSS"],
    description:
      "Served as the UX/UI designer for the team project, designing interactive UI wireframes and visual styles in Figma, while collaborating on layout implementation using React and Tailwind CSS.",
  },
  {
    period: "2026",
    title: "Portfolio Website",
    org: "Personal Project",
    tags: ["React", "Vite", "Tailwind CSS", "Express.js", "MongoDB"],
    description:
      "Designed and built this full-stack portfolio site end-to-end — React + Tailwind frontend, Express REST API, and MongoDB database for live project management.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-20 relative z-10">
      <p className="eyebrow">04 / education &amp; experience</p>
      <h2 className="section-title mt-2 text-3xl text-paper">Development Timeline</h2>

      <div className="mt-10 space-y-8 timeline-line pl-7">
        {timeline.map((entry) => (
          <div key={entry.title} className="relative">
            <span className="timeline-dot absolute -left-[34px] top-1.5 h-4 w-4 rounded-full border-2 border-ink" />
            <p className="font-mono text-xs text-ember">{entry.period}</p>
            <h3 className="section-title mt-1 text-lg text-paper">{entry.title}</h3>
            <p className="font-mono text-xs text-fog/80 mt-0.5">{entry.org}</p>
            <p className="mt-2 max-w-xl text-sm text-paper/75 leading-relaxed">
              {entry.description}
            </p>
            {entry.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {entry.tags.map((tag) => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
