type Role = {
  role: string
  company: string
  period: string
  highlights: string[]
}

const roles: Role[] = [
  {
    role: 'Software Developer',
    company: 'Tech Co',
    period: '2023 — Present',
    highlights: [
      'Built performant React features used by thousands of users',
      'Reduced build times by 40% with optimized tooling',
    ],
  },
  {
    role: 'Intern Developer',
    company: 'Startup Inc.',
    period: '2022 — 2023',
    highlights: [
      'Prototyped new dashboards and data visualizations',
      'Improved accessibility and testing coverage across the app',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">&lt;/&gt; Experience</h2>
          <span className="h-px w-3xs flex bg-indigo-500"></span>
        </div>
        <p className="mt-2 text-sm text-slate-300">Where I’ve learned and delivered.</p>

        <div className="mt-8 grid gap-6">
          {roles.map((r) => (
            <article key={r.role + r.company} className="relative rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{r.role}</h3>
                  <p className="text-sm text-slate-300">{r.company}</p>
                </div>
                <span className="text-xs text-slate-400">{r.period}</span>
              </div>
              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {r.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

