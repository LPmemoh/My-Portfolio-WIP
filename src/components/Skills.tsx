import cssLogo from '../assets/Tailwind CSS.svg'
import gitHubActionsLogo from '../assets/GitHub Actions.svg'
import gitLogo from '../assets/Git_icon.svg'
import jiraLogo from '../assets/Jira.svg'
import javascriptLogo from '../assets/jsIconGreen.svg'
import pythonLogo from '../assets/Python_logo_01.svg'
import reactLogo from '../assets/React-icon.svg'
import sqlLogo from '../assets/Sql_data_base_with_logo.svg'
import typescriptLogo from '../assets/Typescript_logo_2020.svg'
import { useEffect, useRef } from 'react'

type SkillItem = {
  label: string
  icon: string
}

const skillGroups: { title: string; items: SkillItem[] }[] = [
  {
    title: 'Languages',
    items: [
      { label: 'TYPESCRIPT', icon: typescriptLogo },
      { label: 'NODE.JS', icon: javascriptLogo },
      { label: 'PYTHON', icon: pythonLogo },
      { label: 'TAILWIND CSS', icon: cssLogo },
      { label: 'MSSQL', icon: sqlLogo },
    ],
  },
  {
    title: 'Tools & Platforms',
    items: [
      { label: 'REACT + REACT NATIVE', icon: reactLogo },
      { label: 'GIT', icon: gitLogo },
      { label: 'GITHUB ACTIONS', icon: gitHubActionsLogo },
      { label: 'JIRA', icon: jiraLogo },
    ],
  },
]

export default function Skills() {
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
    <section ref={sectionRef} id="skills" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">&lt;/&gt; Skills</h2>
          <span className="h-px w-3xs flex bg-indigo-500"></span>
        </div>
        <p className="mt-2 text-sm text-slate-300">Tech-stacks I am most proficient in:</p>

        <div className="grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="mt-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-10">
                {group.items.map((item) => (
                  <div key={item.label} className="fade-card flex w-28 h-35 flex-col text-center">
                    <div className="flex-1 h-35 w-35 justify-items-center content-center rounded-xl border border-white/8 bg-slate-900">
                      <img src={item.icon} alt={item.label} className="h-12 w-12 object-contain" />
                      <span className="skills-itemname mt-2 text-sm text-slate-200">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
