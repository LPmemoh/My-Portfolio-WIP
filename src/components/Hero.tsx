export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="hero-blob" />
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start py-20 md:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" /> Available for work
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Software Developer crafting reliable, delightful products
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            I build high-quality web apps with a focus on performance, clean
            architecture, and great developer experience.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

