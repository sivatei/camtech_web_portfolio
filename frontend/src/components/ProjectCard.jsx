const CARD_GRADIENTS = [
  "from-[#eff6ff] via-[#dbeafe] to-[#f8fafc]", // Soft blue
  "from-[#f5f3ff] via-[#ede9fe] to-[#f8fafc]", // Soft indigo
  "from-[#ecfeff] via-[#cffafe] to-[#f8fafc]", // Soft cyan
  "from-[#f0fdf4] via-[#dcfce7] to-[#f8fafc]", // Soft emerald
];

export default function ProjectCard({ project, isAdmin, onEdit, onDelete, onClick, index = 0 }) {
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <article
      onClick={() => onClick(project)}
      className="glass-card flex flex-col overflow-hidden group transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
    >
      {/* ── Gradient or Image header banner (taller h-36) ── */}
      <div
        className={`relative h-36 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden border-b border-slate-200/40`}
      >
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <>
            {/* Glowing orb */}
            <div
              className="absolute w-28 h-28 rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500"
              style={{
                background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)",
                top: "-10px",
                left: "20%",
                filter: "blur(15px)",
              }}
            />
            {/* Project initial */}
            <span
              className="relative z-10 text-4xl font-display font-bold select-none"
              style={{
                background: "linear-gradient(135deg, #3b82f6, #1e3a8a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {project.title?.[0]?.toUpperCase() ?? "?"}
            </span>
          </>
        )}

      </div>

      {/* ── Body (Title only) ── */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="section-title text-base font-bold text-white group-hover:text-blue-400 transition-colors duration-200 leading-snug">
          {project.title}
        </h3>

        {/* Admin controls */}
        {isAdmin && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="mt-3.5 flex gap-4 border-t border-slate-100 pt-2.5 font-mono text-[10px]"
          >
            <button
              onClick={() => onEdit(project)}
              className="text-fog hover:text-ember transition-colors"
            >
              edit
            </button>
            <button
              onClick={() => onDelete(project)}
              className="text-fog hover:text-rose transition-colors"
            >
              delete
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
