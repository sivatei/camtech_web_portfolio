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
    <section id="top" className="w-full min-h-screen max-h-[900px] flex flex-col relative z-10 overflow-hidden">
      
      {/* 1. Base Gradient Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none" 
        style={{
          background: "radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.25) 0%, transparent 60%), linear-gradient(180deg, #020617 0%, #0c1426 100%)"
        }}
      ></div>
      
      {/* 2. Panning Tech Pattern Background (Full on mobile, 70% on right for desktop) */}
      <div 
        className="absolute inset-y-0 right-0 w-full lg:w-[70%] z-0 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 100%)"
        }}
      >
        <div className="bg-tech-pattern opacity-100"></div>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 p-8 sm:p-20 flex-1 flex flex-col justify-center transition-all duration-700 w-full ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >


        {/* Prompt */}
        <p className="font-medium tracking-wide text-blue-400/90">Hello, I'm</p>
        <h1 className="section-title mt-2 text-4xl text-white sm:text-6xl tracking-tight">
          {typed}
        </h1>

        <p className="mt-5 font-medium tracking-wide text-blue-400/80">Software Engineering</p>
        <p className="mt-2 max-w-xl text-lg text-slate-200/90 leading-relaxed">
          Full-stack developer and software engineering student, building web
          applications end-to-end.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="#projects" className="btn-glow w-full sm:w-auto text-center">
            <span>View Projects</span>
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto text-center rounded-md border border-white/20 px-6 py-2.5 font-medium tracking-wide text-sm text-white hover:border-blue-400 hover:text-blue-400 transition-colors"
          >
            Contact me
          </a>
        </div>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px z-20"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.5) 30%, rgba(59,130,246,0.7) 50%, rgba(37,99,235,0.5) 70%, transparent)",
        }}
      />
    </section>
  );
}
