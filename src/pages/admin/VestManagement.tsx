import React, { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router";
import { getApiUrl, API_CONFIG, getStorageUrl } from "../../config/api";

interface Vest {
  id: number;
  title: string;
  description: string | null;
  image: string;
  price: number | null;
  size: string | null;
  status: "available" | "rented" | "unavailable";
  order: number;
  created_at: string;
  updated_at: string;
}

const VestManagement: React.FC = () => {
  const { isLoggedIn, isLoading } = useUser();
  const navigate = useNavigate();
  const [vests, setVests] = useState<Vest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVest, setEditingVest] = useState<Vest | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "available" as "available" | "rented" | "unavailable",
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
    fetchVests();
  }, []);

  const fetchVests = async () => {
    try {
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.VESTS));
      const data = await response.json();
      if (data.success) {
        setVests(data.data);
      }
    } catch {
      toast.error("Không thể tải danh sách vest");
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
    form.append("description", formData.description);
    form.append("status", formData.status);
    form.append("order", formData.order);

    if (imageFile) {
      form.append("image", imageFile);
    }

    try {
      const url = editingVest
        ? `${getApiUrl(API_CONFIG.ENDPOINTS.VESTS)}/${editingVest.id}`
        : getApiUrl(API_CONFIG.ENDPOINTS.VESTS);

      if (editingVest) {
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
        fetchVests();
      } else {
        toast.error(data.message || "Có lỗi xảy ra");
      }
    } catch {
      toast.error("Không thể kết nối đến server");
    }
  };

  const handleEdit = (vest: Vest) => {
    setEditingVest(vest);
    setFormData({
      title: vest.title,
      description: vest.description || "",
      status: vest.status,
      order: vest.order.toString(),
    });
    setImagePreview(getStorageUrl(vest.image));
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa vest này?")) {
      return;
    }

    const token = localStorage.getItem("auth_token");
    if (!token) {
      toast.error("Vui lòng đăng nhập");
      return;
    }

    try {
      const response = await fetch(
        `${getApiUrl(API_CONFIG.ENDPOINTS.VESTS)}/${id}`,
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
        fetchVests();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Không thể xóa vest");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      status: "available",
      order: "0",
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingVest(null);
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
        position="top-right"
        toastOptions={{
          style: {
            marginTop: "60px",
          },
        }}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Vest</h1>
        <button
          onClick={openAddModal}
          className="bg-rose-600 text-white px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
        >
          + Thêm Vest
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vests.map((vest) => (
          <div
            key={vest.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={getStorageUrl(vest.image)}
              alt={vest.title}
              className="w-full h-96 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{vest.title}</h3>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {vest.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    vest.status === "available"
                      ? "bg-green-100 text-green-800"
                      : vest.status === "rented"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {vest.status === "available"
                    ? "Có sẵn"
                    : vest.status === "rented"
                    ? "Đã thuê"
                    : "Không khả dụng"}
                </span>
                <span className="text-sm text-gray-500">
                  Thứ tự: {vest.order}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(vest)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(vest.id)}
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
                {editingVest ? "Chỉnh sửa Vest" : "Thêm Vest Mới"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Tên vest *</label>
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
                    <label className="block text-gray-700 mb-2">
                      Trạng thái
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value as
                            | "available"
                            | "rented"
                            | "unavailable",
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    >
                      <option value="available">Có sẵn</option>
                      <option value="rented">Đã thuê</option>
                      <option value="unavailable">Không khả dụng</option>
                    </select>
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
                    Hình ảnh {!editingVest && "*"}
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-600"
                    required={!editingVest}
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
                    {editingVest ? "Cập nhật" : "Thêm mới"}
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

export default VestManagement;
