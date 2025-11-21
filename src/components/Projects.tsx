import { useEffect, useRef } from 'react'

type Project = {
  title: string
  description: string
  tags: string[]
  link?: string
  repo?: string
}

const projects: Project[] = [
  {
    title: 'Tutoring Application',
    description: 'Fullstack mobile app with authentication, dashboards, and admin monitoring.',
    tags: ['React Native', 'Javascript', 'PostgreSQL'],
    repo: 'https://github.com/LPmemoh/Lucidity',
  },
  {
    title: 'Dev Portfolio',
    description: 'This site: modern, responsive, and content‑driven portfolio template.',
    tags: ['React', 'Tailwind', 'TypeScript'],
    repo: 'https://github.com/LPmemoh/My-Portfolio-WIP'
    
  },
  {
    title: 'Movie Rental Application',
    description: 'Utilizes SQL, allowing customers to rent and return copies of movies.',
    tags: ['C#', 'MSSQL'],
  },
  {
    title: 'Secure Email Client/Server',
    description: 'Client/server mail transfer system in Python, implementing encryption and symmetric key management.',
    tags: ['Python', 'Socket Programming', 'RSA Encryption'],
    
  },
  {
    title: 'Simple Virtual Machine',
    description: 'A virtual machine for a toy 16-bit processor, with fetch/decode/execute loop, and a CLI that runs programs through bundled sasm assembler.',
    tags: ['C', 'Linux'],
  },
  {
    title: 'Polynomial Solver',
    description: 'Program to add, subtract, multiply, and divide polynomials.',
    tags: ['Python'],
  }
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-card--visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    section.querySelectorAll('.fade-card').forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="projects" className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-2 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">&lt;/&gt; Projects</h2>
            <span className="h-px w-3xs flex bg-indigo-500"></span>
          </div>
          <a href="#contact" className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 hover:bg-white/10 md:inline-block">Work with me</a>
        </div>
        <p className="mb-8 text-sm text-slate-300">A selection of recent work and projects.</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <article key={p.title} className="fade-card group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 shadow-sm transition-transform hover:-translate-y-1 hover:bg-white/10">
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
              <div className="project-glow pointer-events-none absolute -inset-1 -z-1 opacity-0 blur transition-opacity duration-300 group-hover:opacity-20" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
