import { useEffect, useState } from "react";
import { Link } from "react-router";

const images = [
  "/images/banner/anh-cuoi-phong-cach-han-quoc-5.jpg",
  "/images/banner/layout-02-1.jpg",
];

export default function HeroWedding() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  return (
    <section className="relative h-[70vh] overflow-hidden">
      {/* Carousel slides */}
      <div className="relative h-full">
        {images.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={src}
              alt={`Wedding banner ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg z-10"
        aria-label="Previous"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg z-10"
        aria-label="Next"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-white w-8" : "bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Overlay text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end pb-16">
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Chụp ảnh cưới & cho thuê váy cưới
          </h1>
          <p className="mt-3 text-lg md:text-xl drop-shadow">
            Studio hiện đại, ekip chuyên nghiệp, hậu kỳ đẹp mắt — mang tới bộ
            ảnh cưới như mơ.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              to="/signin"
              className="inline-block bg-rose-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-rose-700"
            >
              Đặt lịch
            </Link>
            <a
              href="#features"
              className="inline-block px-5 py-3 rounded-lg border-2 border-white text-white hover:bg-white/20"
            >
              Xem dịch vụ
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
