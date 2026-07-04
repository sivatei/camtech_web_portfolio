const PHOTO_SRC = "/avatar.jpg";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20 relative z-10">
      <p className="eyebrow">01 / about</p>
      <h2 className="section-title mt-2 text-3xl text-paper">About me</h2>

      {/* ── Bio paragraph at the top ── */}
      <div className="mt-8 max-w-3xl space-y-4 text-paper/85 leading-relaxed text-sm">
        <p>
          I'm Sivatey, a software engineering student with the ability to work across the entire development process, including interface design in Figma, frontend development, backend logic, and data structuring.
        </p>
        <p>
          
        </p>
      </div>

      {/* ── Align Photo & Quick Facts side-by-side with customized column weights ── */}
      <div className="mt-8 grid gap-6 md:grid-cols-4 items-stretch">
        
        {/* Photo Container styled exactly like a card (md:col-span-1 - smaller weight) */}
        <div 
          className="glass-card overflow-hidden flex items-center justify-center p-4 min-h-[320px] md:col-span-1"
          style={{ background: "#edf2f7" }} /* Soft matte grey container to make picture bg not too white */
        >
          <div className="relative w-full h-full max-h-[300px] flex items-center justify-center">
            <img
              src={PHOTO_SRC}
              alt="Yim Sivatey"
              className="rounded-xl w-full h-full object-cover object-top scale-150 transition-transform duration-500 hover:scale-160"
              style={{ mixBlendMode: "multiply", aspectRatio: "3/4" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
            {/* Fallback initials */}
            <div
              className="absolute inset-0 items-center justify-center flex-col gap-1"
              style={{ display: "none" }}
            >
              <span
                className="text-5xl font-display font-bold select-none"
                style={{
                  background: "linear-gradient(135deg, #2563eb, #1e3a8a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                YS
              </span>
              <span className="font-mono text-[10px] text-fog/60 uppercase tracking-widest">
                add photo
              </span>
            </div>
          </div>
        </div>

        {/* Quick facts (md:col-span-3 - larger weight) */}
        <div className="glass-card p-6 flex flex-col justify-between md:col-span-3">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-ember mb-5">
              About me
            </p>
            <dl className="space-y-4 text-sm">
              {[
                { dt: "Name",   dd: "Yim Sivatey" },
                { dt: "Date",   dd: "22 September 2006" },
                { dt: "Status", dd: "Software Engineering Student" },
                { dt: "School", dd: "Camtech University" },
                { dt: "Email",  dd: "sivateyyim@gmail.com" },
                { dt: "Phone",  dd: "+855 957 739 41" },
              ].map(({ dt, dd }) => (
                <div
                  key={dt}
                  className="flex justify-between gap-4 border-b border-slate-200 pb-2.5 last:border-0 last:pb-0"
                >
                  <dt className="text-fog font-medium">{dt}</dt>
                  <dd className="text-right text-paper font-semibold">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

      </div>
    </section>
  );
}
