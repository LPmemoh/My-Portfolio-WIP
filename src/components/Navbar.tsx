import { useState } from 'react'

const NAV_ITEMS = [
  { href: '#home', label: '#home' },
  { href: '#projects', label: '#projects' },
  { href: '#skills', label: '#skills' },
  { href: '#experience', label: '#experience' },
  { href: '#contact', label: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-4">
          <a href="#home" className="text-lg font-semibold tracking-tight">
            <span className="text-indigo-400">&lt;/&gt;</span> Liam Prsa
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {open && (
          <nav className="md:hidden grid gap-2 pb-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-slate-200 hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}

