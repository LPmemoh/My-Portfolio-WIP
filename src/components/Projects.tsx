type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
  repo?: string
}

const projects: Project[] = [
  {
    title: 'Project Atlas',
    description: 'Full‑stack web app with authentication, dashboards, and REST APIs.',
    tags: ['React', 'TypeScript', 'Node.js'],
    link: '#',
    repo: '#',
  },
  {
    title: 'DevOps Pipelines',
    description: 'CI/CD pipeline with automated testing and deployments.',
    tags: ['GitHub Actions', 'Docker', 'Vite'],
    link: '#',
  },
  {
    title: 'Realtime Chat',
    description: 'WebSocket-powered realtime chat with presence and typing indicators.',
    tags: ['WebSocket', 'React', 'Express'],
  },
  {
    title: 'Design System',
    description: 'Composable UI kit with accessible components and theming.',
    tags: ['Tailwind CSS', 'A11y', 'Storybook'],
  },
  {
    title: 'Data Visualizer',
    description: 'Interactive charts and visualizations for large datasets.',
    tags: ['D3.js', 'Performance'],
  },
  {
    title: 'Portfolio vNext',
    description: 'This site: modern, responsive, and content‑driven portfolio template.',
    tags: ['React', 'Tailwind'],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Featured Projects</h2>
            <p className="mt-2 text-sm text-slate-300">A selection of recent work and experiments.</p>
          </div>
          <a href="#contact" className="hidden rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 md:inline-block">Work with me</a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.title} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 shadow-sm transition-transform hover:-translate-y-1 hover:bg-white/10">
              <div className="mb-3 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-black/20 px-2 py-0.5 text-xs text-slate-300">{t}</span>
                ))}
              </div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-slate-300">{p.description}</p>
              <div className="mt-4 flex gap-3">
                {p.link && (
                  <a className="text-sm text-indigo-400 hover:text-indigo-300" href={p.link} target="_blank" rel="noreferrer">Live</a>
                )}
                {p.repo && (
                  <a className="text-sm text-indigo-400 hover:text-indigo-300" href={p.repo} target="_blank" rel="noreferrer">Code</a>
                )}
              </div>
              <div className="pointer-events-none absolute -inset-1 -z-10 opacity-0 blur transition-opacity duration-300 group-hover:opacity-20" style={{background:"radial-gradient(60% 60% at 30% 10%, rgba(99,102,241,.7), transparent), radial-gradient(60% 60% at 70% 50%, rgba(34,211,238,.7), transparent)"}} />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

