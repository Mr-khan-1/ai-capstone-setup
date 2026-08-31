import Link from "next/link";
import { ArrowRight, BarChart3, Globe, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Hero Section */}
      <div className="relative overflow-hidden flex flex-col items-center justify-center pt-32 pb-20 px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[40rem] opacity-30 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm font-medium text-indigo-300 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
            SiteScope AI 2.0 is Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Supercharge your SEO <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">with AI Precision.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Instantly audit any website for SEO, accessibility, and Core Web Vitals. Chat with our advanced AI to get actionable, step-by-step strategies tailored to your exact site.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link 
              href="/audit" 
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-full hover:bg-indigo-500 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.5)] hover:-translate-y-0.5"
            >
              Start Free Audit
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              href="/about" 
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-slate-300 transition-all duration-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white"
            >
              How it works
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Globe className="w-6 h-6 text-indigo-400" />,
              title: "Instant Analysis",
              description: "Paste a URL and our system fetches raw HTML to extract critical SEO and accessibility signals in seconds."
            },
            {
              icon: <Zap className="w-6 h-6 text-purple-400" />,
              title: "Actionable Insights",
              description: "Don't just stare at numbers. Our AI breaks down complex metrics into clear, easy-to-follow action items."
            },
            {
              icon: <BarChart3 className="w-6 h-6 text-pink-400" />,
              title: "Interactive Chatbot",
              description: "Dive deeper into your audit. Ask the AI specific questions about your SEO strategy and get dynamic suggestions."
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors duration-300">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
