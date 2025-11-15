import cssLogo from '../assets/Official_CSS_Logo.svg'
import gitHubActionsLogo from '../assets/GitHub Actions.svg'
import gitLogo from '../assets/Git_icon.svg'
import jiraLogo from '../assets/Jira_Logo.svg'
import javascriptLogo from '../assets/jsIconGreen.svg'
import pythonLogo from '../assets/Python_logo_01.svg'
import reactLogo from '../assets/React-icon.svg'
import reactNativeLogo from '../assets/react-native-1.svg'
import sqlLogo from '../assets/Sql_data_base_with_logo.svg'
import typescriptLogo from '../assets/Typescript_logo_2020.svg'

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
      { label: 'CSS', icon: cssLogo },
      { label: 'SQL', icon: sqlLogo },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { label: 'REACT', icon: reactLogo },
      { label: 'REACT NATIVE', icon: reactNativeLogo },
    ],
  },
  {
    title: 'Tools & Platforms',
    items: [
      { label: 'GIT', icon: gitLogo },
      { label: 'GITHUB ACTIONS', icon: gitHubActionsLogo },
      { label: 'JIRA', icon: jiraLogo },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">&lt;/&gt; Skills</h2>
          <span className="h-px w-3xs flex bg-indigo-500"></span>
        </div>
        <p className="mt-2 text-sm text-slate-300">Tech-stacks I have used.</p>

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div key={group.title} className="mt-4 rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-10">
                {group.items.map((item) => (
                  <div key={item.label} className="flex w-28 h-35 flex-col text-center">
                    <div className="flex-1 h-35 w-35 justify-items-center content-center rounded-xl border border-white/15 bg-slate-900">
                      <img src={item.icon} alt={item.label} className="h-12 w-12 object-contain" />
                      <span className="mt-2 text-sm text-slate-200">{item.label}</span>
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
