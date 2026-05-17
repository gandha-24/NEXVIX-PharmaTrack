import React from 'react';
import { Mail, Lock, ArrowRight, Activity } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden text-slate-200">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-600/20 blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]"></div>

      <div className="w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 mb-6 shadow-lg shadow-brand-500/10">
            <Activity className="w-8 h-8 text-brand-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome back</h1>
          <p className="text-slate-400 text-sm">Enter your credentials to access the portal</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={onLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300" htmlFor="email">Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block pl-12 p-3.5 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-slate-300" htmlFor="password">Password</label>
                <a href="#" className="text-xs font-medium text-brand-400 hover:text-brand-300 transition-colors">Forgot password?</a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-500 group-focus-within:text-brand-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-slate-950/50 border border-slate-800 text-white text-sm rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 block pl-12 p-3.5 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white bg-brand-600 hover:bg-brand-500 focus:ring-4 focus:outline-none focus:ring-brand-500/30 font-medium rounded-xl text-sm px-5 py-3.5 text-center flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40"
            >
              Sign in to account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-brand-400 hover:text-brand-300 transition-colors">
              Request access
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
