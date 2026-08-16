import React, { useState } from 'react';
import Head from 'next/head';
import { Menu, X, ExternalLink, Zap, Code, Layers, Rocket } from 'lucide-react';

const UPWORK_URL = 'https://www.upwork.com/freelancers/~013eb65ac88de3feb6';
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyegdqzn';

export default function AppDevLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', project: '' });
  const [status, setStatus] = useState('idle');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Form submission failed');
      setStatus('sent');
      setFormData({ name: '', email: '', project: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 to-slate-900 text-white overflow-hidden">
      <Head>
        <title>PWAs & Mobile Apps, Built Your Way</title>
        <meta name="description" content="Production-ready apps for startups. React, Supabase, Vercel. Fixed scope, fixed price, 2-week MVP builds." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="PWAs & Mobile Apps, Built Your Way" />
        <meta property="og:description" content="Production-ready apps for startups. React, Supabase, Vercel. Fixed scope, fixed price, 2-week MVP builds." />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <nav className="fixed w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-blue-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-end items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-blue-400">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex gap-8 absolute md:relative top-16 md:top-auto left-0 md:left-auto w-full md:w-auto bg-slate-950/95 md:bg-transparent px-6 md:px-0 pb-4 md:pb-0`}>
            <a href="#portfolio" className="block text-gray-300 hover:text-blue-400 transition">Portfolio</a>
            <a href="#services" className="block text-gray-300 hover:text-blue-400 transition">Services</a>
            <a href="#contact" className="block text-gray-300 hover:text-blue-400 transition">Contact</a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-32 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 inline-block px-4 py-2 bg-blue-500/20 border border-blue-400/50 rounded-full">
            <span className="text-blue-300 text-sm font-semibold">⚡ Full-Stack Apps in 2 Weeks</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 bg-clip-text text-transparent">
            Your App Idea, Built Right
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Production-ready apps. React, Supabase, Vercel. Fixed scope. Fixed price. No fluff.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105">
              Start Your Project
            </a>
            <a href={UPWORK_URL} target="_blank" rel="noopener noreferrer" className="border-2 border-blue-400 text-blue-300 px-8 py-4 rounded-lg font-semibold hover:bg-blue-500/10 transition flex items-center justify-center gap-2 group">
              View on Upwork <ExternalLink size={18} className="group-hover:translate-x-1 transition" />
            </a>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Built & Shipped</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card title="ProRated" tag="iOS & Android" icon={<Zap className="w-6 h-6" />} color="from-blue-500 to-cyan-500" description="Verified job site intelligence for trade professionals. Real-time bid tracking, trust scoring, team collaboration." stack="React PWA, Supabase, RevenueCat IAP, Stripe" link="https://prorated.app" />
            <Card title="FlipTrader" tag="Trading PWA" icon={<Rocket className="w-6 h-6" />} color="from-green-500 to-emerald-500" description="Day/swing trading alerts and automated execution bot. Real-time signals, portfolio tracking, multi-strategy execution." stack="React PWA, Supabase, Alpaca API" link="https://flip-trader.vercel.app" />
            <Card title="StockYard" tag="Livestock Marketplace" icon={<Layers className="w-6 h-6" />} color="from-amber-500 to-orange-500" description="Cattle market intelligence and proxy bidding. Live pricing, auction tracking, marketplace for dealers." stack="React, Supabase, USDA AMS data, Stripe" />
            <Card title="Stateside Deliveries" tag="Island Logistics" icon={<Code className="w-6 h-6" />} color="from-purple-500 to-pink-500" description="Flexible last-mile delivery for US Virgin Islands. Reduces friction with flexible drop-off points and tracking." stack="React, Supabase, real-time tracking" link="https://frontend-pi-seven-81.vercel.app" demoLink="https://claude.ai/code/artifact/0f52058a-7826-4365-887b-77cb5a9a6b98" />
          </div>
        </div>
      </section>

      <section id="services" className="py-24 px-6 bg-slate-900/50 border-y border-blue-500/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <StepCard step={1} title="Scope Call" description="We talk through your vision. I ask hard questions. You get a clear scope and fixed price." />
            <StepCard step={2} title="2-Week Build" description="I build your MVP. React, Supabase, Vercel. Database, auth, payments—the full stack." />
            <StepCard step={3} title="Deploy & Handoff" description="Live app, full code access, documented. You own it. I'm here for questions." />
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-6 text-blue-300">I specialize in:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <SpecialtyItem text="Marketplace platforms (bidding, payments, reviews)" />
              <SpecialtyItem text="Real-time data apps (alerts, dashboards, tracking)" />
              <SpecialtyItem text="SaaS apps (auth, billing, team management)" />
              <SpecialtyItem text="Mobile-first PWAs (offline, fast, installable)" />
              <SpecialtyItem text="Payment integration (Stripe, webhooks)" />
              <SpecialtyItem text="Database design & optimization" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Pricing</h2>
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-400/50 rounded-2xl p-12 backdrop-blur">
            <p className="text-gray-300 mb-4">Fixed-scope projects</p>
            <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">$2K–$5K</div>
            <p className="text-gray-300 mb-8">2-week MVP. Can scale for bigger scope. Let's talk.</p>
            <a href="#contact" className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105">
              Get a Quote
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Let's Build</h2>
          <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-8 backdrop-blur">
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-blue-300">Your Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition" required />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-blue-300">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition" required />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-blue-300">Tell me about your project</label>
              <textarea name="project" value={formData.project} onChange={handleInputChange} rows="5" className="w-full px-4 py-3 bg-slate-900/50 border border-blue-400/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 transition" required />
            </div>
            <button type="submit" disabled={status === 'sending'} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100">
              {status === 'sending' ? 'Sending…' : status === 'sent' ? '✓ Message sent!' : 'Send'}
            </button>
            {status === 'error' && (
              <p className="text-sm text-red-400 mt-4 text-center">Something went wrong — please email me directly instead.</p>
            )}
            <p className="text-sm text-gray-400 mt-4 text-center">Or email: <a href="mailto:canaan.farris@gmail.com" className="text-blue-300 hover:text-blue-200 font-semibold transition">canaan.farris@gmail.com</a></p>
          </form>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-blue-500/20 py-12 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="text-gray-400">Building production apps, fast.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-300">Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href={UPWORK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">Upwork</a></li>
              <li><a href="https://github.com/pr0rat3d" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">GitHub</a></li>
              <li><a href="https://prorated.app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">ProRated</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-blue-300">Contact</h4>
            <p className="text-gray-400"><a href="mailto:canaan.farris@gmail.com" className="hover:text-blue-400 transition">canaan.farris@gmail.com</a></p>
          </div>
        </div>
        <div className="border-t border-blue-500/20 pt-8 text-center text-gray-500">
          <p>&copy; 2026 Built with React + Vercel.</p>
        </div>
      </footer>
    </div>
  );
}

function Card({ title, tag, icon, color, description, stack, link, demoLink }) {
  return (
    <div className="group bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-blue-500/30 p-8 hover:border-blue-400/60 transition hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-2">
      <div className="flex items-center gap-4 mb-4">
        <div className={`bg-gradient-to-br ${color} p-3 rounded-lg text-white`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">{title}</h3>
          <p className="text-sm text-gray-400">{tag}</p>
        </div>
      </div>
      <p className="text-gray-300 mb-4">{description}</p>
      <p className="text-sm text-gray-400 mb-4"><strong className="text-gray-300">Stack:</strong> {stack}</p>
      <div className="flex gap-6">
        {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition">Live App →</a>}
        {demoLink && <a href={demoLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition">View Demo →</a>}
      </div>
    </div>
  );
}

function StepCard({ step, title, description }) {
  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-400/30 rounded-xl p-8 hover:border-blue-400/60 transition">
      <div className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text mb-4">{step}</div>
      <h3 className="font-bold text-lg text-white mb-3">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

function SpecialtyItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-blue-400 mt-1">✓</span>
      <span className="text-gray-300">{text}</span>
    </div>
  );
}
