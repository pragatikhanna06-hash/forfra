export default function Contact() {
  return (
    <section className="py-32 bg-black text-white">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-5xl font-bold mb-12">
          Let's Talk
        </h2>

        <form className="grid gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="bg-white/5 p-5 rounded-xl border border-white/10"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="bg-white/5 p-5 rounded-xl border border-white/10"
          />

          <textarea
            rows="6"
            placeholder="Tell us about your project"
            className="bg-white/5 p-5 rounded-xl border border-white/10"
          />

          <button className="bg-blue-600 py-4 rounded-xl">
            Send Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}