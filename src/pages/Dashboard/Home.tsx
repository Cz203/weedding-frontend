import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import PageMeta from "../../components/common/PageMeta";
import { FolderIcon } from "../../icons";
import { getApiUrl, API_CONFIG } from "../../config/api";

interface Stats {
  dresses: number;
  vests: number;
  albums: number;
}

export default function Home() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    dresses: 0,
    vests: 0,
    albums: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem người dùng đã đăng nhập chưa
    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("Vui lòng đăng nhập để truy cập Dashboard");
      navigate("/signin", { replace: true });
      return;
    }

    // Fetch statistics
    const fetchStats = async () => {
      try {
        const [dressesRes, vestsRes, albumsRes] = await Promise.all([
          fetch(getApiUrl(API_CONFIG.ENDPOINTS.DRESSES)),
          fetch(getApiUrl(API_CONFIG.ENDPOINTS.VESTS)),
          fetch(getApiUrl(API_CONFIG.ENDPOINTS.ALBUMS)),
        ]);

        const dressesData = await dressesRes.json();
        const vestsData = await vestsRes.json();
        const albumsData = await albumsRes.json();

        setStats({
          dresses: dressesData.success ? dressesData.data.length : 0,
          vests: vestsData.success ? vestsData.data.length : 0,
          albums: albumsData.success ? albumsData.data.length : 0,
        });
      } catch {
        toast.error("Không thể tải thống kê");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const cards = [
    {
      title: "Váy Cưới",
      count: stats.dresses,
      icon: "👗",
      link: "/admin/dresses",
      color: "bg-rose-50 dark:bg-rose-900/20",
      iconColor: "text-rose-600",
    },
    {
      title: "Vest/Suit",
      count: stats.vests,
      icon: "🤵",
      link: "/admin/vests",
      color: "bg-blue-50 dark:bg-blue-900/20",
      iconColor: "text-blue-600",
    },
    {
      title: "Album",
      count: stats.albums,
      icon: "📸",
      link: "/admin/albums",
      color: "bg-purple-50 dark:bg-purple-900/20",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <>
      <PageMeta
        title="Dashboard - Hiếu Toàn Studio"
        description="Quản lý hình ảnh và dịch vụ studio ảnh cưới"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Chào mừng đến với Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Quản lý hình ảnh váy cưới, vest và album của studio
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-xl text-gray-600 dark:text-gray-400">
            Đang tải...
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cards.map((card) => (
              <Link
                key={card.title}
                to={card.link}
                className={`${card.color} rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:scale-105`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-4xl ${card.iconColor}`}>
                    {card.icon}
                  </div>
                  <FolderIcon className={`w-8 h-8 ${card.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {card.title}
                </h3>
                <p className={`text-3xl font-bold ${card.iconColor}`}>
                  {card.count}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Nhấn để quản lý
                </p>
              </Link>
            ))}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Hướng dẫn sử dụng
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">1️⃣</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Quản lý Váy Cưới
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Thêm, sửa, xóa thông tin và hình ảnh váy cưới cho thuê. Cập
                    nhật giá, kích thước và trạng thái.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">2️⃣</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Quản lý Vest/Suit
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Quản lý bộ sưu tập vest và suit dành cho chú rể. Theo dõi
                    tình trạng cho thuê.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">3️⃣</span>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Quản lý Album
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Upload và quản lý album ảnh cưới. Phân loại theo
                    wedding/prewedding, địa điểm và ngày chụp.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
