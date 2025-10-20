export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/60 py-6">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} Your Name. All rights reserved.
      </div>
    </footer>
  )
}

