type Role = {
  role: string
  company: string
  period: string
  highlights: string[]
}

const roles: Role[] = [
  {
    role: 'Scrum Lead & Mobile App Developer',
    company: 'MacEwan University – Android App Development',
    period: '2024',
    highlights: [
      'Led a Scrum team of 4 to build a cross-platform mobile app using React Native',
      'Integrated Supabase for authentication and data storage',
      'Ran sprint planning, daily standups, and retrospectives in an Agile environment',
    ],
  },
  {
    role: 'Sales Associate',
    company: 'Canadian Tire',
    period: 'Sep 2019 — Present',
    highlights: [
      'Recognized as a dependable team member trusted with time-sensitive tasks by store management',
      'Maintained efficiency during high-demand periods by balancing multiple priorities under pressure',
      'Quickly learned new departments and processes, often assisting across multiple areas as needed',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            &lt;/&gt; Experience
          </h2>
          <span className="h-px w-3xs flex bg-indigo-500" />
        </div>
        <p className="mt-2 text-sm text-slate-300">
          Where I’ve learned and led.
        </p>

        <div className="mt-8 grid gap-6">
          {roles.map((r) => (
            <article
              key={r.role + r.company}
              className="relative rounded-xl border border-white/10 bg-white/5 p-6"
            >
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
