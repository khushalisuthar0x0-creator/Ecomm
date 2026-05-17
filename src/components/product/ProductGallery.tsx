import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-4 lg:grid-cols-[80px_1fr]">
      <div className="order-2 flex gap-2 lg:order-1 lg:flex-col">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={`aspect-square w-16 overflow-hidden border-2 lg:w-full ${
              i === active ? "border-foreground" : "border-transparent opacity-70"
            }`}
            aria-label={`View image ${i + 1}`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="order-1 aspect-[4/5] overflow-hidden bg-secondary lg:order-2">
        <img src={images[active]} alt={alt} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
