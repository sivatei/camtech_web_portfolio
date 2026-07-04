import { useEffect, useState } from "react";

const FULL_TEXT = "Yim Sivatey";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setTyped(FULL_TEXT);
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(FULL_TEXT.slice(0, i));
      if (i >= FULL_TEXT.length) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="top" className="w-full min-h-[calc(100vh-76px)] flex flex-col relative z-10">
      <div
        className={`p-8 sm:p-20 flex-1 flex flex-col justify-center transition-all duration-700 w-full ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.25) 0%, transparent 60%), linear-gradient(180deg, #020617 0%, #0c1426 100%)",
        }}
      >


        {/* Prompt */}
        <p className="font-mono text-sm text-blue-400/90">Hello, I'm</p>
        <h1 className="section-title mt-2 text-4xl text-white sm:text-6xl tracking-tight">
          {typed}
        </h1>

        <p className="mt-5 font-mono text-sm text-blue-400/80">Software Engineering</p>
        <p className="mt-2 max-w-xl text-lg text-slate-200/90 leading-relaxed">
          Full-stack developer and software engineering student, building web
          applications end-to-end.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap gap-4">
          <a href="#projects" className="btn-glow">
            <span>View Projects</span>
          </a>
          <a
            href="#contact"
            className="rounded-md border border-white/20 px-6 py-2.5 font-mono text-sm text-white hover:border-blue-400 hover:text-blue-400 transition-colors"
          >
            Contact me
          </a>
        </div>
      </div>
    </section>
  );
}
