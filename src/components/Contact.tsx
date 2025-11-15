
import githubMark from '../assets/github-mark-white.svg'
import { Mail } from 'lucide-react'

export default function Contact() {
  const email = 'prsal@mymacewan.ca'
  return (
    <section id="contact" className="mb-12 justify-items-center">
      <div className="mx-auto max-w-6xl px-4 justify-items-center">
        <div className='flex items-center gap-3'>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Contact</h2>
        </div>
        <p className="mt-2 text-sm text-slate-300">Have questions or want to work together? Let me know!</p>

        <div className="mt-8">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="flex gap-3">
              <a className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm hover:bg-white/10" href="https://github.com/LPmemoh">
                <img src={githubMark} className="h-5 w-5" /> Github
              </a>
              <a className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm hover:bg-white/10" href={`mailto:${email}`} aria-label="Send email">
                <Mail color='white' className='h-5 w-5'/> prsal@mymacewan.ca
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
