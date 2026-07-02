import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <div>
          <span className="bg-white/10 px-4 py-2 rounded-full">
            AI • Web • Mobile Development
          </span>

          <h1 className="text-6xl lg:text-8xl font-bold mt-8 leading-tight">
            Build
            <span className="text-blue-500"> Future-Ready </span>
            Digital Products
          </h1>

          <p className="text-xl text-gray-400 mt-6 max-w-xl">
            We help startups and enterprises launch scalable AI solutions,
            SaaS platforms, mobile applications, and enterprise software.
          </p>

          <div className="flex gap-4 mt-10">
            <button className="bg-blue-600 px-8 py-4 rounded-xl flex items-center gap-2">
              Start Project
              <ArrowRight size={18} />
            </button>

            <button className="border border-white/20 px-8 py-4 rounded-xl">
              View Work
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-[120px] opacity-30"></div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <img
              src="/dashboard-preview.png"
              alt="Dashboard"
              className="rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}