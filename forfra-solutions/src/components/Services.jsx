import {
  Globe,
  Smartphone,
  Brain,
  Database,
  Shield,
  Cloud,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "High-performance web applications built for growth.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Native and cross-platform mobile experiences.",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    desc: "Custom AI agents, automation and ML products.",
  },
  {
    icon: Database,
    title: "Enterprise Software",
    desc: "Scalable internal and customer-facing platforms.",
  },
  {
    icon: Shield,
    title: "Cyber Security",
    desc: "Security-first architecture and compliance.",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "Modern cloud-native deployments and DevOps.",
  },
];

export default function Services() {
  return (
    <section className="py-32 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-16">
          Services Built For Scale
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-blue-500 transition"
            >
              <service.icon className="mb-6 text-blue-500" size={40} />

              <h3 className="text-2xl font-semibold mb-4">
                {service.title}
              </h3>

              <p className="text-gray-400">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}