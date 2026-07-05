import { useState } from "react";

const links = [
  { href: "#about",      label: "about" },
  { href: "#skills",     label: "skills" },
  { href: "#projects",   label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#contact",    label: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 nav-bar">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-sm md:text-base font-semibold text-white tracking-wide uppercase">
          yim sivatey <span className="gradient-text">portfolio</span>
        </a>

        <ul className="hidden gap-8 font-mono text-sm text-slate-300 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition-colors duration-200 hover:text-blue-400"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="text-white md:hidden font-mono text-sm hover:text-blue-400 transition-colors"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "close" : "menu"}
        </button>
      </nav>

      {open && (
        <ul className="animate-slide-up flex flex-col gap-4 border-t border-blue-900/40 bg-[#020617] px-6 py-5 font-mono text-sm text-slate-300 md:hidden shadow-lg shadow-blue-950/20">
          {links.map((link) => (
            <li key={link.href} className="border-b border-slate-900/50 pb-2 last:border-0 last:pb-0">
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 hover:text-blue-400 transition-colors py-1 group"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
