export default function About() {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
        <div>
          <span className="text-blue-500">ABOUT US</span>

          <h2 className="text-5xl font-bold mt-4">
            Engineering Digital Excellence
          </h2>
        </div>

        <div>
          <p className="text-xl text-gray-400 leading-relaxed">
            We combine strategy, design, engineering, and AI innovation to
            create products that drive measurable business outcomes.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-5xl font-bold">120+</h3>
              <p className="text-gray-400">Projects Delivered</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">98%</h3>
              <p className="text-gray-400">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}