import { useEffect, useState } from "react";
import HeaderWedding from "../components/HeaderWedding";
import HeroWedding from "../components/HeroWedding";
import SocialFloatingButtons from "../components/SocialFloatingButtons";
import { Link } from "react-router";
import { getApiUrl, API_CONFIG, getStorageUrl } from "../config/api";

interface Album {
  id: number;
  title: string;
  description: string | null;
  image: string;
  category: string | null;
  location: string | null;
  shoot_date: string | null;
  order: number;
}

export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingAlbums, setLoadingAlbums] = useState(true);

  // Kiểm tra xem user đã đăng nhập chưa
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    setIsLoggedIn(!!token);
  }, []);

  // Fetch albums từ database
  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ALBUMS));
      const data = await response.json();
      if (data.success) {
        // Lấy 8 albums đầu tiên để hiển thị
        setAlbums(data.data.slice(0, 8));
      }
    } catch (error) {
      console.error("Không thể tải danh sách album", error);
    } finally {
      setLoadingAlbums(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 via-white to-amber-50 text-gray-800">
      <HeaderWedding />
      <HeroWedding />

      {/* Floating Social Media Buttons */}
      <SocialFloatingButtons />

      <section id="features" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-rose-700">Cho thuê váy cưới</h4>
            <p className="mt-2 text-sm text-gray-600">
              Studio hiện đại, background phong phú, hỗ trợ ánh sáng chuyên
              nghiệp.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-rose-700">
              Chụp ảnh & quay phim
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              Nhiếp ảnh gia kinh nghiệm, ekip chuyên nghiệp, hậu kỳ chỉnh sửa
              đẹp mắt.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-sm">
            <h4 className="font-semibold text-rose-700">
              Trang trí & cho thuê váy
            </h4>
            <p className="mt-2 text-sm text-gray-600">
              Trang trí sân khấu, hoa tươi, cho thuê váy cưới và veston cao cấp.
            </p>
          </div>
        </div>
      </section>

      {/* Video & Graphic Section */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-rose-700">
              Video & Graphic Design
            </h2>
            <p className="mt-3 text-gray-600">
              Quay phim và thiết kế đồ họa chuyên nghiệp cho ngày trọng đại
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Video Production */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm12.553 1.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Quay phim cưới
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Cinematic wedding video với flycam, gimbal và hậu kỳ điện ảnh.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Full HD / 4K</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Flycam & Slow motion</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Color grading chuyên nghiệp</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Graphic Design */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="relative h-64 bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Thiết kế đồ họa
                </h3>
                <p className="mt-2 text-gray-600 text-sm">
                  Thiết kế thiệp cưới, backdrop, menu, và tất cả vật phẩm in ấn.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Thiệp mời & Save the date</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Backdrop & Standee</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-rose-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Menu & bảng welcome</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Album Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-rose-700">
              Album ảnh cưới đẹp
            </h2>
            <p className="mt-3 text-gray-600">
              Những khoảnh khắc hạnh phúc được lưu giữ mãi mãi
            </p>
          </div>

          {loadingAlbums ? (
            // Loading skeleton
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : albums.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {albums.map((album) => (
                <div
                  key={album.id}
                  className="group relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                >
                  <img
                    src={getStorageUrl(album.image)}
                    alt={album.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <div>
                      <h3 className="text-white font-semibold text-sm">
                        {album.title}
                      </h3>
                      {album.category && (
                        <span className="text-white/80 text-xs">
                          {album.category}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Chưa có album nào</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/album"
              className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 shadow-lg"
            >
              Xem thêm album
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-rose-700">
              Bảng giá dịch vụ
            </h2>
            <p className="mt-3 text-gray-600">
              Chọn gói phù hợp với ngân sách và nhu cầu của bạn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition border-2 border-transparent hover:border-rose-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">Gói Basic</h3>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-rose-600">
                    5.000.000đ
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Phù hợp cho cặp đôi tiết kiệm
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Chụp ảnh studio (4 giờ)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    30 ảnh chỉnh sửa cao cấp
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    1 Album 20x30cm (20 trang)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    File ảnh gốc đầy đủ
                  </span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/signin"
                  className="block text-center bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700"
                >
                  Chọn gói này
                </Link>
              </div>
            </div>

            {/* Premium Package */}
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-2xl p-8 text-white relative transform scale-105">
              <div className="absolute top-0 right-6 bg-yellow-400 text-gray-900 px-4 py-1 rounded-b-lg text-xs font-bold">
                PHỔ BIẾN
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold">Gói Premium</h3>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold">10.000.000đ</span>
                </div>
                <p className="mt-2 text-sm text-rose-100">
                  Lựa chọn được yêu thích nhất
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-yellow-300 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">
                    Chụp studio + ngoại cảnh (8 giờ)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-yellow-300 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">60 ảnh chỉnh sửa cao cấp</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-yellow-300 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">2 Album cao cấp 30x40cm</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-yellow-300 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Video highlight 3-5 phút</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-yellow-300 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">Makeup & trang phục miễn phí</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/signin"
                  className="block text-center bg-white text-rose-600 py-3 rounded-lg hover:bg-gray-100 font-semibold"
                >
                  Chọn gói này
                </Link>
              </div>
            </div>

            {/* VIP Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition border-2 border-transparent hover:border-rose-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-800">Gói VIP</h3>
                <div className="mt-4">
                  <span className="text-4xl font-extrabold text-rose-600">
                    20.000.000đ
                  </span>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Đẳng cấp sang trọng
                </p>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Không giới hạn thời gian chụp
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    100+ ảnh chỉnh sửa hoàn hảo
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Album da cao cấp 40x50cm
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Full video ceremony + flycam
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Ekip makeup & stylist riêng
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-rose-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">
                    Trang trí backdrop & in ấn
                  </span>
                </li>
              </ul>
              <div className="mt-8">
                <Link
                  to="/signin"
                  className="block text-center bg-rose-600 text-white py-3 rounded-lg hover:bg-rose-700"
                >
                  Chọn gói này
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-rose-50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h4 className="text-lg font-semibold text-rose-700">
                Cần tư vấn ngay?
              </h4>
              <p className="mt-2 text-sm text-gray-600">
                Gọi cho chúng tôi hoặc để lại thông tin, đội ngũ sẽ liên hệ
                trong 24h.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <a
                href="tel:+840123456789"
                className="inline-block bg-rose-600 text-white px-4 py-2 rounded"
              >
                Gọi ngay: 0123 456 789
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center font-bold text-white">
                  W
                </div>
                <span className="font-semibold text-xl text-white">
                  Hiếu Toàn
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Dịch vụ cưới trọn gói chuyên nghiệp, mang đến kỷ niệm đẹp nhất
                cho ngày trọng đại của bạn.
              </p>
              <div className="flex gap-3 mt-4">
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-8 h-8 bg-gray-800 hover:bg-rose-600 rounded-full flex items-center justify-center transition"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Dịch vụ</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/studio" className="hover:text-rose-400 transition">
                    Chụp ảnh cưới
                  </Link>
                </li>
                <li>
                  <Link to="/studio" className="hover:text-rose-400 transition">
                    Quay phim cưới
                  </Link>
                </li>
                <li>
                  <Link to="/album" className="hover:text-rose-400 transition">
                    Album ảnh
                  </Link>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-400 transition">
                    Cho thuê váy cưới
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-400 transition">
                    Makeup & làm tóc
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-rose-400 transition">
                    Trang trí tiệc cưới
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Liên kết</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="hover:text-rose-400 transition">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link to="/album" className="hover:text-rose-400 transition">
                    Album
                  </Link>
                </li>
                <li>
                  <a
                    href="#features"
                    className="hover:text-rose-400 transition"
                  >
                    Dịch vụ
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-rose-400 transition">
                    Bảng giá
                  </a>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="hover:text-rose-400 transition"
                  >
                    Liên hệ
                  </Link>
                </li>
                {!isLoggedIn && (
                  <li>
                    <Link
                      to="/signin"
                      className="hover:text-rose-400 transition"
                    >
                      Đăng nhập
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-white font-semibold mb-4">Liên hệ</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>123 Đường ABC, Quận 1, TP.HCM</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <div>0123 456 789</div>
                    <div>0987 654 321</div>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>contact@weedding.vn</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>
              © {new Date().getFullYear()} Create by Cao Viet. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
