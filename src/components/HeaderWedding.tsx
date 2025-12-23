import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { apiClient } from "../services/api";
import { useUser } from "../context/UserContext";

export default function HeaderWedding() {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { userData, isLoggedIn, isLoading, logout: contextLogout } = useUser();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);

      // Close user menu when clicking outside
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target as Node))
        setUserMenuOpen(false);
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const handleLogout = async () => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error("Logout error:", error);
    }

    // Gọi context logout để clear data
    contextLogout();
    toast.success("Đăng xuất thành công");
    navigate("/");
  };

  return (
    <header className="w-full bg-white/60 backdrop-blur sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose-200 flex items-center justify-center font-bold text-rose-700">
            W
          </div>
          <span className="font-semibold text-lg text-rose-700">
            Hiếu toàn Studio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((s) => !s)}
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-rose-50"
              aria-expanded={open}
            >
              <span className="font-medium">Trang phục cưới</span>
              <svg
                className={`w-3 h-3 transition-transform ${
                  open ? "-rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black/5">
                <Link
                  to="/dresses"
                  className="block px-4 py-2 hover:bg-rose-50"
                >
                  Váy cưới
                </Link>
                <Link to="/suits" className="block px-4 py-2 hover:bg-rose-50">
                  Vest
                </Link>
              </div>
            )}
          </div>

          <Link to="/studio" className="px-3 py-2 rounded hover:bg-rose-50">
            Studio
          </Link>
          <Link to="/album" className="px-3 py-2 rounded hover:bg-rose-50">
            Album
          </Link>
          <Link to="/contact" className="px-3 py-2 rounded hover:bg-rose-50">
            Liên hệ
          </Link>
        </nav>

        {/* User Menu - Desktop */}
        {isLoading ? (
          // Hiển thị skeleton hoặc spinner khi đang loading
          <div className="hidden md:block">
            <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        ) : isLoggedIn ? (
          <div className="hidden md:block relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-50 transition"
            >
              <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-semibold text-sm">
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="font-medium text-gray-700">
                {userData?.name || "User"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  userMenuOpen ? "rotate-180" : ""
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black/5 py-1 z-50">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 transition"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-gray-700">Hồ sơ cá nhân</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 transition"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span className="text-gray-700">Dashboard</span>
                </Link>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition w-full text-left"
                >
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span className="text-red-600 font-medium">Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/signin"
              className="bg-rose-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-rose-700"
            >
              Đăng nhập
            </Link>
          </div>
        )}

        <div className="md:hidden">
          {/* simple mobile menu: toggle dropdown */}
          <button
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded hover:bg-rose-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* mobile panel */}
      {open && (
        <div className="md:hidden bg-white/95 border-t">
          <div className="px-4 py-3 flex flex-col gap-1">
            <Link to="/dresses" className="px-2 py-2">
              Váy cưới
            </Link>
            <Link to="/suits" className="px-2 py-2">
              Vest
            </Link>
            <Link to="/studio" className="px-2 py-2">
              Studio
            </Link>
            <Link to="/album" className="px-2 py-2">
              Album
            </Link>
            <Link to="/contact" className="px-2 py-2">
              Liên hệ
            </Link>

            {isLoading ? (
              // Loading skeleton cho mobile
              <div className="mt-3 px-2 py-2 border-t border-gray-200">
                <div className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ) : isLoggedIn ? (
              <>
                <div className="mt-3 mb-2 px-2 py-2 border-t border-gray-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white font-semibold">
                      {userData?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="font-medium text-gray-800">
                      {userData?.name || "User"}
                    </span>
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-rose-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Hồ sơ cá nhân</span>
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-rose-50 transition"
                    onClick={() => setOpen(false)}
                  >
                    <svg
                      className="w-5 h-5 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-50 transition w-full text-left text-red-600"
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
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="font-medium">Đăng xuất</span>
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/signin"
                className="mt-2 px-4 py-2 bg-rose-600 text-white rounded text-center"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
