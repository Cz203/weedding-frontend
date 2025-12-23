import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import HeaderWedding from "../components/HeaderWedding";
import Lightbox from "../components/Lightbox";
import { getApiUrl, API_CONFIG, getStorageUrl } from "../config/api";

interface Vest {
  id: number;
  title: string;
  description: string | null;
  image: string;
  price: number | null;
  size: string | null;
  status: "available" | "rented" | "unavailable";
  order: number;
}

const Suits: React.FC = () => {
  const [vests, setVests] = useState<Vest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "available" | "rented">("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    fetchVests();
  }, []);

  const fetchVests = async () => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.VESTS));
      const data = await response.json();
      if (data.success) {
        setVests(data.data);
      }
    } catch (error) {
      console.error("Không thể tải danh sách vest", error);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (imageUrl: string, title: string) => {
    setSelectedImage({ url: imageUrl, title });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedImage(null);
  };

  const filteredVests = vests.filter((vest) => {
    if (filter === "all") return true;
    return vest.status === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderWedding />

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          isOpen={lightboxOpen}
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          onClose={closeLightbox}
        />
      )}

      <main className="container mx-auto px-4 py-16 mt-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Bộ Sưu Tập Vest & Suit
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những bộ vest và suit cao cấp, lịch lãm dành cho chú rể trong ngày
            trọng đại
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === "all"
                ? "bg-rose-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setFilter("available")}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === "available"
                ? "bg-rose-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Có sẵn
          </button>
          <button
            onClick={() => setFilter("rented")}
            className={`px-6 py-2 rounded-full transition-colors ${
              filter === "rented"
                ? "bg-rose-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Đã thuê
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-xl text-gray-600">Đang tải...</div>
          </div>
        ) : filteredVests.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">Chưa có vest/suit nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredVests.map((vest) => (
              <div
                key={vest.id}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer"
                onClick={() =>
                  openLightbox(getStorageUrl(vest.image), vest.title)
                }
              >
                <img
                  src={getStorageUrl(vest.image)}
                  alt={vest.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Hover Overlay với Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="w-full">
                    <h3 className="text-white font-semibold text-lg">
                      {vest.title}
                    </h3>
                    {vest.description && (
                      <p className="text-white/90 text-sm mt-1 line-clamp-2">
                        {vest.description}
                      </p>
                    )}
                  </div>
                </div>
                {/* Status Badge */}
                {vest.status === "available" && (
                  <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Có sẵn
                  </span>
                )}
                {vest.status === "rented" && (
                  <span className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Đã thuê
                  </span>
                )}
                {vest.status === "unavailable" && (
                  <span className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                    Không khả dụng
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Bạn cần tư vấn về vest/suit?
          </h2>
          <p className="text-gray-600 mb-6">
            Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn và giúp bạn chọn
            được bộ vest/suit hoàn hảo
          </p>
          <Link
            to="/contact"
            className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 transition-colors font-semibold"
          >
            Liên hệ ngay
          </Link>
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Create by Cao Viet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Suits;
