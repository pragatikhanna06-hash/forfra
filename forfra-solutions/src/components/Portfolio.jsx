const projects = [
  {
    title: "AI Customer Support Platform",
    category: "Artificial Intelligence",
  },
  {
    title: "Healthcare Management System",
    category: "Enterprise Software",
  },
  {
    title: "Fintech Mobile Application",
    category: "Mobile Development",
  },
];

export default function Portfolio() {
  return (
    <section className="py-32 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-16">
          Featured Projects
        </h2>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-3xl bg-white/5"
            >
              <div className="h-72 bg-gradient-to-br from-blue-600 to-purple-600"></div>

              <div className="p-8">
                <p className="text-blue-500 mb-2">
                  {project.category}
                </p>

                <h3 className="text-2xl font-semibold">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}