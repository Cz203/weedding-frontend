import { useEffect, useState } from "react";
import HeaderWedding from "../components/HeaderWedding";
import Lightbox from "../components/Lightbox";
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

export default function Album() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    title: string;
  } | null>(null);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.ALBUMS));
      const data = await response.json();
      if (data.success) {
        setAlbums(data.data);
      }
    } catch (error) {
      console.error("Không thể tải danh sách album", error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
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

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700">
            Album ảnh cưới
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá những bộ ảnh cưới đẹp lung linh, được chụp bởi ekip chuyên
            nghiệp tại Hiếu Toàn Studio.
          </p>
        </div>

        {/* Gallery Grid */}
        {albums.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Chưa có album nào.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {albums.map((album) => (
              <div
                key={album.id}
                className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all cursor-pointer"
                onClick={() =>
                  openLightbox(getStorageUrl(album.image), album.title)
                }
              >
                <img
                  src={getStorageUrl(album.image)}
                  alt={album.title}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <div className="w-full">
                    <h3 className="text-white font-semibold text-lg">
                      {album.title}
                    </h3>
                    {album.description && (
                      <p className="text-white/90 text-sm mt-1 line-clamp-2">
                        {album.description}
                      </p>
                    )}
                    {album.category && (
                      <span className="inline-block mt-2 bg-white/20 text-white px-2 py-1 rounded text-xs">
                        {album.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-rose-50 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-rose-700">
            Muốn có bộ ảnh như vậy?
          </h2>
          <p className="mt-3 text-gray-700">
            Đặt lịch ngay hôm nay để được tư vấn miễn phí và nhận ưu đãi đặc
            biệt.
          </p>
          <div className="mt-6">
            <a
              href="/signin"
              className="inline-block bg-rose-600 text-white px-8 py-3 rounded-lg hover:bg-rose-700 shadow-lg"
            >
              Đặt lịch chụp ảnh
            </a>
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
