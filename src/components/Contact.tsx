"use client";

export function Contact() {
  return (
    <section id="contact" className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl tracking-[0.2em] sm:text-4xl">
            Get In Touch
          </h2>
          <p className="mb-10 text-sm text-zinc-600 sm:text-base">
            Have a question or want to schedule a private viewing? We'd love to
            hear from you.
          </p>
          <div className="space-y-6 text-sm text-zinc-700">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Visit Our Showroom
              </p>
              <p>Trg Zlatarne 12, Zagreb 10000</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Call Us
              </p>
              <p>+385 1 234 5678</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Email
              </p>
              <p>info@zlatarna-popovic.hr</p>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
            >
              Name *
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full border border-zinc-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
            >
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full border border-zinc-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full border border-zinc-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-2 block text-xs uppercase tracking-[0.3em] text-zinc-700"
            >
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="w-full resize-none border border-zinc-300 px-4 py-3 text-sm focus:border-black focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black px-8 py-4 text-xs uppercase tracking-[0.35em] text-white transition-colors hover:bg-zinc-800"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
