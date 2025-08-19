import { NavLink } from "react-router"

export default function Home() {
  return (
    <div className="min-h-screen text-white bg-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>

        {/* Neon glow effects */}
        <div className="absolute rounded-full top-20 left-10 w-72 h-72 bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute rounded-full bottom-20 right-10 w-96 h-96 bg-purple-500/10 blur-3xl"></div>

        <div className="relative z-10 max-w-4xl px-6 py-20 mx-auto">
          {/* Main heading */}
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-5xl font-bold text-transparent md:text-7xl bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text">
              Task Master
            </h1>
            <div className="w-24 h-1 mx-auto mb-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></div>
          </div>

          {/* Description */}
          <div className="mb-16 text-center">
            <p className="max-w-3xl mx-auto text-xl leading-relaxed md:text-2xl text-slate-300">
              A powerful task management application that helps you stay organized and productive. Built with modern
              technologies for a seamless experience.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid gap-8 mb-16 md:grid-cols-3">
            <div className="p-6 text-center transition-all duration-300 border rounded-xl bg-slate-800/50 border-slate-700/50 hover:border-cyan-500/50">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-cyan-400 to-cyan-600">
                <span className="text-xl font-bold text-slate-900">⚡</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-cyan-400">Lightning Fast</h3>
              <p className="text-slate-400">Optimized performance for instant task management</p>
            </div>

            <div className="p-6 text-center transition-all duration-300 border rounded-xl bg-slate-800/50 border-slate-700/50 hover:border-purple-500/50">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-purple-400 to-purple-600">
                <span className="text-xl font-bold text-slate-900">🔒</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-purple-400">Secure & Reliable</h3>
              <p className="text-slate-400">Your data is protected with enterprise-grade security</p>
            </div>

            <div className="p-6 text-center transition-all duration-300 border rounded-xl bg-slate-800/50 border-slate-700/50 hover:border-green-500/50">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r from-green-400 to-green-600">
                <span className="text-xl font-bold text-slate-900">📱</span>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-green-400">Cross Platform</h3>
              <p className="text-slate-400">Access your tasks anywhere, on any device</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <NavLink to="/signup" className="group">
              <button className="relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl font-semibold text-slate-900 text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25 min-w-[200px]">
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-xl group-hover:opacity-100 blur-sm"></div>
              </button>
            </NavLink>

            <NavLink to="/login" className="group">
              <button className="relative px-8 py-4 bg-slate-800 border-2 border-slate-600 rounded-xl font-semibold text-slate-200 text-lg transition-all duration-300 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-lg hover:shadow-cyan-400/20 min-w-[200px]">
                <span className="relative z-10">Sign In</span>
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Tech stack indicator */}
      <div className="py-8 border-t border-slate-800">
        <div className="max-w-4xl px-6 mx-auto">
          <p className="text-sm text-center text-slate-500">
            Powered by <span className="font-semibold text-cyan-400">React</span> •
            <span className="font-semibold text-purple-400"> Redux</span> •
            <span className="font-semibold text-green-400"> Supabase</span>
          </p>
        </div>
      </div>
    </div>
  )
}
