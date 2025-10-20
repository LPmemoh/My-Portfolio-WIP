
import githubMark from '../assets/github-mark-white.svg'
import { Mail } from 'lucide-react'

function Icon({ name }: { name: 'github' | 'mail' }) {
  if (name === 'github') {
    return <img src={githubMark} alt="GitHub" className="h-5 w-5" />
  }
  return <Mail className="h-5 w-5" aria-hidden="true" />
}

export default function Contact() {
  const email = 'you@example.com'
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Contact</h2>
        <p className="mt-2 text-sm text-slate-300">Let’s build something great together.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <form
            className="rounded-xl border border-white/10 bg-white/5 p-6"
            onSubmit={(e) => {
              e.preventDefault()
              const form = e.currentTarget as HTMLFormElement
              const data = new FormData(form)
              const subject = encodeURIComponent(String(data.get('subject') || 'Hello'))
              const body = encodeURIComponent(String(data.get('message') || ''))
              window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
            }}
          >
            <div className="grid gap-4">
              <input name="name" placeholder="Your name" className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <input name="subject" placeholder="Subject" className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <textarea name="message" placeholder="Message" rows={5} className="rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <button type="submit" className="inline-flex items-center justify-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-400">Send</button>
            </div>
          </form>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-lg font-semibold">Elsewhere</h3>
            <p className="mt-1 text-sm text-slate-300">Find me on the platforms below.</p>
            <div className="mt-4 flex gap-3">
              <a className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm hover:bg-white/10" href="https://github.com/LPmemoh" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                <Icon name="github" /> GitHub
              </a>
              <a className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm hover:bg-white/10" href={`mailto:${email}`} aria-label="Send email">
                <Icon name="mail" /> Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
