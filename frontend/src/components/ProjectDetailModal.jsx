import { useState, useEffect } from "react";

export default function ProjectDetailModal({ project, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const displayImages = project?.imageUrls?.length === 2 
    ? [...project.imageUrls, ...project.imageUrls] 
    : (project?.imageUrls || []);

  useEffect(() => {
    if (project && displayImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % displayImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [project]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative rounded-2xl w-full max-w-2xl max-h-[calc(100vh-2rem)] overflow-y-auto border border-white/10 shadow-2xl animate-slide-up flex flex-col" style={{ background: 'rgba(9, 13, 22, 0.92)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner with gradient or Image (taller h-56) */}
        <div className="relative h-40 sm:h-56 bg-gradient-to-br from-[#090d16] to-[#0c1a2e] flex items-center justify-center border-b border-white/10 overflow-hidden">
          {displayImages.length > 0 ? (
            <>
              {displayImages.map((url, i) => {
                let positionClass = "translate-x-full opacity-0 z-0 transition-none";
                if (i === currentSlide) {
                  positionClass = "translate-x-0 opacity-100 z-20 transition-all duration-700 ease-in-out";
                } else if (i === (currentSlide === 0 ? displayImages.length - 1 : currentSlide - 1)) {
                  positionClass = "-translate-x-full opacity-100 z-10 transition-all duration-700 ease-in-out";
                }
                return (
                  <img
                    key={i}
                    src={url}
                    alt={`${project.title} slide ${i}`}
                    className={`absolute inset-0 w-full h-full object-cover ${positionClass}`}
                  />
                );
              })}
              {project.imageUrls.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
                  {project.imageUrls.map((_, i) => (
                    <div key={i} className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? "bg-white w-3" : "bg-white/40"}`} />
                  ))}
                </div>
              )}
            </>
          ) : project.videoUrl ? (
            <video
              ref={(el) => { if (el) el.playbackRate = 2.0; }}
              src={project.videoUrl}
              className="w-full h-full object-contain"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            /* Big Project Initial */
            <span
              className="text-6xl font-display font-bold select-none"
              style={{
                background: "linear-gradient(135deg, #60a5fa, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {project.title?.[0]?.toUpperCase() ?? "?"}
            </span>
          )}

          {/* Close button top-right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white rounded-full p-2.5 transition-all shadow-sm border border-white/10 flex items-center justify-center z-30"
            aria-label="Close modal"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="section-title text-2xl font-bold text-white">
              {project.title}
            </h3>
            {project.role && (
              <span className="badge text-[10px] uppercase font-mono tracking-wider">
                {project.role}
              </span>
            )}
          </div>

          <p className="text-sm leading-relaxed text-slate-300">
            {project.description}
          </p>

          {/* Tech stack */}
          {Array.isArray(project.techStack) && project.techStack.length > 0 && (
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-slate-400 mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          <div className="flex gap-3 pt-4 border-t border-white/10 justify-end">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-white/15 px-4 py-2 font-mono text-xs text-slate-200 hover:border-blue-400 hover:text-blue-400 transition-colors flex items-center gap-1.5"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-glow text-xs px-4 py-2 flex items-center gap-1.5"
              >
                <span>
                  <svg className="w-3.5 h-3.5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                  live demo
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
