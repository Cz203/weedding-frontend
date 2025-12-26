import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { getApiUrl, API_CONFIG, getStorageUrl } from "../../config/api";

interface Album {
  id: number;
  title: string;
  description: string | null;
  image: string;
  category: string | null;
  location: string | null;
  shoot_date: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

const AlbumManagement: React.FC = () => {
  const { isLoggedIn, isLoading } = useUser();
  const navigate = useNavigate();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    shoot_date: "",
    order: "0",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // File size limit: 10MB (reasonable for web)
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

  useEffect(() => {
    // Chỉ redirect khi đã load xong và chưa đăng nhập
    if (!isLoading && !isLoggedIn) {
      navigate("/signin");
    }
  }, [isLoggedIn, isLoading, navigate]);

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
    } catch {
      toast.error("Không thể tải danh sách album");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > MAX_FILE_SIZE) {
        toast.error(
          `File quá lớn! Kích thước tối đa: ${
            MAX_FILE_SIZE / 1024 / 1024
          }MB. File của bạn: ${(file.size / 1024 / 1024).toFixed(2)}MB`
        );
        e.target.value = ""; // Reset input
        return;
      }

      // Check file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Chỉ chấp nhận file ảnh: JPG, PNG, WEBP");
        e.target.value = ""; // Reset input
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Show file info
      toast.success(
        `Đã chọn file: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)`
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("Vui lòng đăng nhập");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);

    // Chỉ append các field có giá trị
    if (formData.description && formData.description.trim()) {
      form.append("description", formData.description);
    }

    if (formData.category && formData.category.trim()) {
      form.append("category", formData.category);
    }

    if (formData.location && formData.location.trim()) {
      form.append("location", formData.location);
    }

    if (formData.shoot_date && formData.shoot_date.trim()) {
      form.append("shoot_date", formData.shoot_date);
    }

    form.append("order", formData.order);

    if (imageFile) {
      form.append("image", imageFile);
    }

    try {
      const url = editingAlbum
        ? `${getApiUrl(API_CONFIG.ENDPOINTS.ALBUMS)}/${editingAlbum.id}`
        : getApiUrl(API_CONFIG.ENDPOINTS.ALBUMS);

      if (editingAlbum) {
        form.append("_method", "PUT");
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        setShowModal(false);
        resetForm();
        fetchAlbums();
      } else {
        // Hiển thị lỗi chi tiết từ validation
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          errorMessages.forEach((msg) => toast.error(msg as string));
        } else {
          toast.error(data.message || "Có lỗi xảy ra");
        }
        // Log chi tiết lỗi để debug
        console.error("Backend error:", data);
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      toast.error(
        "Không thể kết nối đến server. Kiểm tra console để biết chi tiết."
      );
    }
  };

  const handleEdit = (album: Album) => {
    setEditingAlbum(album);
    setFormData({
      title: album.title,
      description: album.description || "",
      category: album.category || "",
      location: album.location || "",
      shoot_date: album.shoot_date || "",
      order: album.order.toString(),
    });
    setImagePreview(getStorageUrl(album.image));
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa album này?")) {
      return;
    }

    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("Vui lòng đăng nhập");
      return;
    }

    try {
      const response = await fetch(
        `${getApiUrl(API_CONFIG.ENDPOINTS.ALBUMS)}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);
        fetchAlbums();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Không thể xóa album");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      shoot_date: "",
      order: "0",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingAlbum(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "60px",
          },
        }}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Album</h1>
        <button
          onClick={openAddModal}
          className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
        >
          + Thêm Album
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {albums.map((album) => (
          <div
            key={album.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={getStorageUrl(album.image)}
              alt={album.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{album.title}</h3>
              <p className="text-gray-600 mb-2 line-clamp-2">
                {album.description}
              </p>
              <div className="flex flex-col gap-1 mb-3">
                {album.category && (
                  <span className="text-sm text-gray-600">
                    <strong>Loại:</strong> {album.category}
                  </span>
                )}
                {album.location && (
                  <span className="text-sm text-gray-600">
                    <strong>Địa điểm:</strong> {album.location}
                  </span>
                )}
                {album.shoot_date && (
                  <span className="text-sm text-gray-600">
                    <strong>Ngày chụp:</strong>{" "}
                    {new Date(album.shoot_date).toLocaleDateString("vi-VN")}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-500">
                  Thứ tự: {album.order}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(album)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(album.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editingAlbum ? "Chỉnh sửa Album" : "Thêm Album Mới"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Tên album *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Mô tả</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Loại</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                      placeholder="wedding, prewedding..."
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Địa điểm</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                      placeholder="Đà Nẵng, Hội An..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Ngày chụp
                    </label>
                    <input
                      type="date"
                      value={formData.shoot_date}
                      onChange={(e) =>
                        setFormData({ ...formData, shoot_date: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Thứ tự hiển thị
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) =>
                        setFormData({ ...formData, order: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    Hình ảnh {!editingAlbum && "*"}
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    required={!editingAlbum}
                  />
                  {imagePreview && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
                  >
                    {editingAlbum ? "Cập nhật" : "Thêm mới"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="flex-1 bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumManagement;
