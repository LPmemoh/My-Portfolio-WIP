const skillGroups = [
  {
    title: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Python', 'C#', 'SQL'],
  },
  {
    title: 'Frameworks',
    items: ['React', 'Node.js', 'Express', 'Vite', 'Jest'],
  },
  {
    title: 'Tools',
    items: ['Git', 'Docker', 'CI/CD', 'Postman', 'VS Code'],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">&lt;/&gt; Skills</h2>
          <span className="h-px w-3xs flex bg-indigo-500"></span>
        </div>
        <p className="mt-2 text-sm text-slate-300">A snapshot of technologies I use.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-slate-200">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

