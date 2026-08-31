import { ShieldCheck, Target, Sparkles, Code2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      <div className="relative pt-32 pb-20 px-6 max-w-5xl mx-auto">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-full max-w-2xl h-[30rem] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-l from-indigo-500 to-purple-500 blur-[100px] rounded-full mix-blend-screen" />
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-purple-300 mb-6">
            <Sparkles className="w-4 h-4" />
            Our Mission
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
            Democratizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">SEO & Accessibility</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-3xl leading-relaxed mb-16">
            SiteScope AI was built with a simple premise: technical SEO and web accessibility shouldn't require expensive consultants or complex enterprise software. By leveraging cutting-edge generative AI, we allow anyone to paste a URL and immediately receive actionable, expert-level audits.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Precision Auditing</h3>
              <p className="text-slate-400 leading-relaxed">
                Our system doesn't just look for missing tags. It analyzes the context of your content, evaluates heading structures, and checks Core Web Vitals implications to give you a holistic view of your site's health.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Accessibility First</h3>
              <p className="text-slate-400 leading-relaxed">
                The web is for everyone. We prioritize critical accessibility checks—from ARIA landmarks to viewport tags—ensuring your site is usable by people with disabilities and compliant with modern standards.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 md:col-span-2 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-16 h-16 rounded-2xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                <Code2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">Built with Modern Tech</h3>
                <p className="text-slate-400 leading-relaxed">
                  SiteScope AI is powered by Next.js, Tailwind CSS, and the Vercel AI SDK. This ensures blazing fast performance, seamless streaming responses, and a resilient architecture that scales with your needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
