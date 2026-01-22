const collections = [
  {
    name: "Diamond Rings",
    description: "Exquisite diamond rings that symbolize eternal love.",
    image:
      "https://images.unsplash.com/photo-1738694242379-ef21044985bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwcmluZ3MlMjBlbGVnYW50fGVufDF8fHx8MTc2ODk4MTA1Mnww&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    name: "Luxury Necklaces",
    description: "Statement pieces that elevate any ensemble.",
    image:
      "https://images.unsplash.com/photo-1767921482419-d2d255b5b700?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBuZWNrbGFjZSUyMGpld2Vscnl8ZW58MXx8fHwxNzY4OTUxODg5fDA&ixlib=rb-4.1.0&q=80&w=1200",
  },
  {
    name: "Designer Earrings",
    description: "Elegant earrings crafted with precious metals.",
    image:
      "https://images.unsplash.com/photo-1629224316810-9d8805b95e76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxlbGVnYW50JTIwZWFycmluZ3MlMjBnb2xkfGVufDF8fHx8MTc2ODkzNzg0Nnww&ixlib=rb-4.1.0&q=80&w=1200",
  },
];

export function Collections() {
  return (
    <section
      id="collections"
      className="snap-start bg-zinc-50 py-20"
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl tracking-[0.2em] sm:text-4xl md:text-5xl">
            Our Collections
          </h2>
          <p className="mx-auto max-w-2xl text-sm text-zinc-600 sm:text-base">
            Discover our curated selection of fine jewelry, each piece a
            masterpiece of craftsmanship.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {collections.map((item) => (
            <article key={item.name} className="group">
              <div className="relative mb-5 h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
              </div>
              <h3 className="mb-2 text-xl tracking-wide">{item.name}</h3>
              <p className="text-sm text-zinc-600">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
