import portrait from '../assets/developer-illustration.png'
import Silhouette from './Silhouette'
import PipelineBackground from './PipelineBackground'

export default function Hero() {
  return (
    <section id="home" className="relative z-0 overflow-hidden">
      <PipelineBackground />
      <div className="hero-blob" />

      <div className="relative mx-auto max-w-8xl min-h-dvh overflow-y-auto">
        {/* Anchor whole row to bottom */}
        <div className="flex min-h-dvh flex-col justify-end px-6">

          {/* Row: stack on small; row on lg+; align to bottom */}
          <div className="flex flex-col items-center lg:flex-row lg:justify-center">

            {/* Left: Title */}
            <div className="lg:left-[40%] lg:bottom-[5%] mb-4 lg:mb-0 order-1">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Junior Software Developer
              </h1>

              <p className="hero-text mt-8">
                I craft digital experiences with modern frameworks.<br />
                Specializing in Typecript and Python to build solutions<br />
                that satisfy industry standards.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-indigo-400"
                >
                  View Projects
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-white/10"
                >
                  Get in Touch
                </a>
                <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Available for work
                </span>
              </div>
            </div>

            {/* Center: Portrait */}
            <div className="lg:w-[45%] lg:self-end pointer-events-none order-0 lg:order-1">
              <Silhouette
                src={portrait}
                className="-z-1 h-full w-full justify-center"
                thickness={3}
                duration="6s"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
