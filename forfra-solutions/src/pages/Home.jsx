import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Globe,
  Smartphone,
  Cloud,
  Database,
  Shield,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Modern web applications built for scale and performance.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile experiences.",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    desc: "Automation, AI Agents, Chatbots & Machine Learning.",
  },
  {
    icon: Database,
    title: "Enterprise Software",
    desc: "Robust systems for growing businesses.",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    desc: "Secure cloud infrastructure and deployment.",
  },
  {
    icon: Shield,
    title: "Cyber Security",
    desc: "Enterprise-grade protection and compliance.",
  },
];

const projects = [
  "AI Customer Platform",
  "Fintech SaaS Dashboard",
  "Healthcare Management System",
];

export default function Home() {
  return (
    <div className="bg-black text-white overflow-hidden">
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Forfra<span className="text-blue-500">.</span>
          </h1>

          <div className="hidden md:flex gap-8">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>

          <button className="bg-blue-600 px-5 py-2 rounded-lg">
            Let's Talk
          </button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center">
        {/* Floating Background */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
          }}
          className="absolute w-[500px] h-[500px] bg-blue-600 rounded-full blur-[180px] opacity-20"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 15,
          }}
          className="absolute right-0 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[180px] opacity-20"
        />

        <div className="max-w-7xl mx-auto px-6 pt-24 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="px-4 py-2 bg-white/10 rounded-full"
            >
              AI • Software • Innovation
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-bold mt-8 leading-tight"
            >
              Building
              <span className="text-blue-500"> Digital </span>
              Products That Scale
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 text-xl mt-8 max-w-xl"
            >
              We help startups and enterprises create world-class web apps,
              mobile experiences, AI systems and digital products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <button className="bg-blue-600 px-8 py-4 rounded-xl flex items-center gap-2 hover:scale-105 transition">
                Start Project
                <ArrowRight size={18} />
              </button>

              <button className="border border-white/20 px-8 py-4 rounded-xl hover:bg-white hover:text-black transition">
                View Work
              </button>
            </motion.div>
          </div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, rotateY: -20 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-64 rounded-xl"></div>

              <div className="grid grid-cols-3 gap-4 mt-5">
                <div className="bg-white/10 h-20 rounded-lg"></div>
                <div className="bg-white/10 h-20 rounded-lg"></div>
                <div className="bg-white/10 h-20 rounded-lg"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-24 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10 text-center">
          {[
            ["150+", "Projects"],
            ["98%", "Success Rate"],
            ["35+", "Experts"],
            ["10M+", "Users Served"],
          ].map(([num, label]) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              key={label}
            >
              <h2 className="text-5xl font-bold text-blue-500">{num}</h2>
              <p className="text-gray-400 mt-2">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 50 }}
            className="text-5xl font-bold text-center mb-20"
          >
            Services That Drive Growth
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl"
              >
                <service.icon
                  className="text-blue-500 mb-6"
                  size={40}
                />

                <h3 className="text-2xl font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="py-32 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-16">
            Featured Projects
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project}
                whileHover={{ y: -12 }}
                className="rounded-3xl overflow-hidden bg-white/5"
              >
                <div className="h-80 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold">
                    {project}
                  </h3>

                  <p className="text-gray-400 mt-3">
                    Enterprise-level digital solution.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-32">
        <motion.div
          whileInView={{ scale: [0.9, 1] }}
          className="max-w-5xl mx-auto px-8 py-20 rounded-[40px] bg-gradient-to-r from-blue-600 to-purple-600 text-center"
        >
          <h2 className="text-5xl md:text-6xl font-bold">
            Let's Build Something Extraordinary
          </h2>

          <p className="mt-6 text-xl opacity-90">
            Transform your vision into a powerful digital product.
          </p>

          <button className="mt-10 bg-white text-black px-10 py-5 rounded-xl font-semibold hover:scale-105 transition">
            Book Free Consultation
          </button>
        </motion.div>
      </section>
    </div>
  );
}