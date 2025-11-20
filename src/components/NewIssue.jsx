import { useState } from 'react'

function CheckIcon({ className = 'w-10 h-10' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22 11.5C22 17.299 17.299 22 11.5 22S1 17.299 1 11.5 5.701 1 11.5 1 22 5.701 22 11.5Z" stroke="currentColor" strokeWidth="2" />
      <path d="M7 12l3 3 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function NewIssue() {
  const [selected, setSelected] = useState(null)
  const [status, setStatus] = useState('idle') // idle | loading | success

  const options = [
    {
      id: 'soap',
      title: 'Folyékony szappan utántöltés',
      subtitle: 'Soap refill',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="8" width="18" height="12" rx="2" />
          <path d="M8 8V6a4 4 0 0 1 4-4h1" />
        </svg>
      ),
    },
    {
      id: 'toilet-paper',
      title: 'WC papír utántöltés',
      subtitle: 'Toilet paper refill',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 6a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v9a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V6Z" />
          <path d="M7 2v13" />
          <circle cx="10" cy="9" r="1" />
          <circle cx="13" cy="9" r="1" />
        </svg>
      ),
    },
  ]

  const onSubmit = async () => {
    if (!selected || status !== 'idle') return
    setStatus('loading')
    // Simulate async submission
    await new Promise((res) => setTimeout(res, 1400))
    setStatus('success')
  }

  const reset = () => {
    setSelected(null)
    setStatus('idle')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 text-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header / Logo */}
          <div className="px-8 pt-8 pb-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.25)]">
              <img src="/flame-icon.svg" alt="Logo" className="w-9 h-9" />
            </div>
            <h1 className="mt-5 text-2xl font-semibold tracking-tight">New Issue</h1>
            <p className="mt-1 text-sm text-slate-300/80">Choose the type of refill request below, then submit.</p>
          </div>

          {/* Content */}
          <div className="px-6 pb-6">
            {status === 'idle' && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {options.map((opt) => {
                    const active = selected === opt.id
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelected(opt.id)}
                        className={[
                          'group rounded-xl border p-4 text-left transition-all',
                          'bg-slate-900/40 hover:bg-slate-900/70',
                          active ? 'border-blue-400/60 ring-2 ring-blue-400/40' : 'border-slate-700/60'
                        ].join(' ')}
                      >
                        <div className="flex items-start gap-3">
                          <div className={[
                            'shrink-0 w-10 h-10 rounded-lg flex items-center justify-center',
                            active ? 'bg-blue-500/15 text-blue-400 border border-blue-400/30' : 'bg-slate-800 text-slate-300 border border-slate-700/60'
                          ].join(' ')}>
                            {opt.icon}
                          </div>
                          <div className="min-w-0">
                            <div className={[
                              'font-medium truncate',
                              active ? 'text-blue-200' : 'text-slate-100'
                            ].join(' ')}>{opt.title}</div>
                            <div className="text-xs text-slate-400">{opt.subtitle}</div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                <button
                  onClick={onSubmit}
                  disabled={!selected}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 text-white font-medium py-3 px-4 transition hover:bg-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            )}

            {status === 'loading' && (
              <div className="py-10 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-500/30 border-t-blue-400 animate-spin" />
                </div>
                <p className="mt-4 text-sm text-slate-300">Submitting your request...</p>
              </div>
            )}

            {status === 'success' && (
              <div className="py-10 text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-400/30 flex items-center justify-center">
                  <CheckIcon className="w-10 h-10" />
                </div>
                <h2 className="mt-4 text-xl font-semibold">Request submitted</h2>
                <p className="mt-1 text-sm text-slate-400">Thank you! We have recorded your selection.</p>
                <button onClick={reset} className="mt-6 text-sm text-blue-300 hover:text-blue-200 underline underline-offset-4">Submit another</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
