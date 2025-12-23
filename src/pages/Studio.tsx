import { Link } from "react-router";
import HeaderWedding from "../components/HeaderWedding";

export default function Studio() {
  const studios = [
    {
      name: "Studio Classic",
      description:
        "Không gian tinh tế, background đa dạng phù hợp mọi phong cách.",
      price: "2.000.000đ",
      features: [
        "Ánh sáng chuyên nghiệp",
        "Background 10+ kiểu",
        "Phòng thay đồ riêng",
      ],
      image: "/images/banner/layout-02-1.jpg",
    },
    {
      name: "Studio Premium",
      description:
        "Thiết kế hiện đại, trang thiết bị cao cấp, không gian rộng rãi.",
      price: "3.500.000đ",
      features: [
        "Ánh sáng studio pro",
        "Background premium 20+ kiểu",
        "Makeup room VIP",
        "Free nước uống & snack",
      ],
      image: "/images/banner/anh-cuoi-phong-cach-han-quoc-5.jpg",
    },
    {
      name: "Studio VIP",
      description: "Đẳng cấp 5 sao, phục vụ trọn gói với ekip chuyên nghiệp.",
      price: "6.000.000đ",
      features: [
        "Full lighting setup",
        "Background không giới hạn",
        "Private suite",
        "Makeup artist đi kèm",
        "Photographer riêng",
      ],
      image: "/images/banner/layout-02-1.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <HeaderWedding />

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700">
            Studio chụp ảnh cưới
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Không gian chụp ảnh hiện đại, đa dạng phong cách từ cổ điển đến hiện
            đại, phù hợp mọi concept cưới.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studios.map((studio) => (
            <div
              key={studio.name}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={studio.image}
                  alt={studio.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-rose-700">
                  {studio.name}
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  {studio.description}
                </p>
                <div className="mt-4 text-3xl font-extrabold text-gray-800">
                  {studio.price}
                </div>
                <ul className="mt-4 space-y-2">
                  {studio.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <svg
                        className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signin"
                  className="mt-6 block text-center bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700"
                >
                  Đặt lịch ngay
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-rose-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-rose-700">Cần tư vấn thêm?</h2>
          <p className="mt-3 text-gray-700">
            Liên hệ với chúng tôi để được hỗ trợ chọn studio phù hợp nhất.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 justify-center">
            <a
              href="tel:+840123456789"
              className="inline-block bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700"
            >
              Gọi ngay: 0123 456 789
            </a>
            <Link
              to="/contact"
              className="inline-block border-2 border-rose-600 text-rose-700 px-6 py-3 rounded-lg hover:bg-rose-50"
            >
              Liên hệ qua form
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Weedding — Dịch vụ cưới trọn gói
        </div>
      </footer>
    </div>
  );
}
