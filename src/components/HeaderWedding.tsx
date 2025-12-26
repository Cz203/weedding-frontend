import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { apiClient } from "../services/api";
import { useUser } from "../context/UserContext";

export default function HeaderWedding() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const { userData, isLoggedIn, isLoading, logout: contextLogout } = useUser();

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setDropdownOpen(false);

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
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-rose-200 flex items-center justify-center font-bold text-rose-700 text-sm sm:text-base">
            W
          </div>
          <span className="font-semibold text-base sm:text-lg text-rose-700 hidden xs:inline">
            Hiếu toàn Studio
          </span>
          <span className="font-semibold text-base sm:text-lg text-rose-700 xs:hidden">
            HT Studio
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6 text-gray-700 text-sm xl:text-base">
          <div className="relative z-50" ref={ref}>
            <button
              onClick={() => setDropdownOpen((s) => !s)}
              className="flex items-center gap-1.5 px-2.5 xl:px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors font-medium"
              aria-expanded={dropdownOpen}
            >
              <span>Trang phục cưới</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? "-rotate-180" : ""
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

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl ring-1 ring-black/10 py-1 overflow-hidden z-[60]">
                <Link
                  to="/dresses"
                  className="block px-4 py-2.5 hover:bg-rose-50 transition-colors font-medium"
                  onClick={() => setDropdownOpen(false)}
                >
                  👗 Váy cưới
                </Link>
                <Link
                  to="/suits"
                  className="block px-4 py-2.5 hover:bg-rose-50 transition-colors font-medium"
                  onClick={() => setDropdownOpen(false)}
                >
                  🤵 Vest
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/studio"
            className="px-2.5 xl:px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors font-medium"
          >
            Studio
          </Link>
          <Link
            to="/album"
            className="px-2.5 xl:px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors font-medium"
          >
            Album
          </Link>
          <Link
            to="/contact"
            className="px-2.5 xl:px-3 py-2 rounded-lg hover:bg-rose-50 transition-colors font-medium"
          >
            Liên hệ
          </Link>
        </nav>

        {/* User Menu - Desktop */}
        {isLoading ? (
          <div className="hidden lg:block">
            <div className="w-24 xl:w-32 h-9 xl:h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        ) : isLoggedIn ? (
          <div className="hidden lg:block relative z-50" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen((prev) => !prev)}
              className="flex items-center gap-2 px-2.5 xl:px-3 py-1.5 xl:py-2 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <div className="w-7 h-7 xl:w-8 xl:h-8 rounded-full bg-rose-600 flex items-center justify-center text-white font-semibold text-xs xl:text-sm flex-shrink-0">
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="font-medium text-gray-700 text-sm xl:text-base max-w-[100px] truncate">
                {userData?.name || "User"}
              </span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
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
              <div className="absolute right-0 mt-2 w-52 xl:w-56 bg-white rounded-lg shadow-xl ring-1 ring-black/10 py-1 z-[60] overflow-hidden">
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
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
                  <span className="text-gray-700 font-medium">
                    Hồ sơ cá nhân
                  </span>
                </Link>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
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
                  <span className="text-gray-700 font-medium">Dashboard</span>
                </Link>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors w-full text-left"
                >
                  <svg
                    className="w-5 h-5 text-red-600 flex-shrink-0"
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
                  <span className="text-red-600 font-semibold">Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/signin"
              className="bg-rose-600 text-white px-3 xl:px-4 py-1.5 xl:py-2 rounded-lg shadow-sm hover:bg-rose-700 transition-colors font-medium text-sm xl:text-base"
            >
              Đăng nhập
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen((s) => !s)}
          className="lg:hidden p-2 rounded-lg hover:bg-rose-50 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-700"
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
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-rose-100 shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
            <Link
              to="/dresses"
              className="px-3 py-3 rounded-lg hover:bg-rose-50 transition-colors font-medium text-gray-700 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-xl">👗</span>
              <span>Váy cưới</span>
            </Link>
            <Link
              to="/suits"
              className="px-3 py-3 rounded-lg hover:bg-rose-50 transition-colors font-medium text-gray-700 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="text-xl">🤵</span>
              <span>Vest</span>
            </Link>
            <Link
              to="/studio"
              className="px-3 py-3 rounded-lg hover:bg-rose-50 transition-colors font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Studio
            </Link>
            <Link
              to="/album"
              className="px-3 py-3 rounded-lg hover:bg-rose-50 transition-colors font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Album
            </Link>
            <Link
              to="/contact"
              className="px-3 py-3 rounded-lg hover:bg-rose-50 transition-colors font-medium text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              Liên hệ
            </Link>

            {isLoading ? (
              <div className="mt-3 px-3 py-3 border-t border-gray-200">
                <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            ) : isLoggedIn ? (
              <div className="mt-3 pt-3 border-t border-rose-100">
                <div className="flex items-center gap-3 px-3 py-2 mb-2 bg-rose-50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-rose-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                    {userData?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-gray-800 block truncate">
                      {userData?.name || "User"}
                    </span>
                    <span className="text-xs text-gray-500 truncate block">
                      {userData?.email}
                    </span>
                  </div>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-rose-50 transition-colors font-medium text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
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
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-rose-50 transition-colors font-medium text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg
                    className="w-5 h-5 text-gray-600 flex-shrink-0"
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
                  className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left text-red-600 font-semibold mt-1"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
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
                  <span>Đăng xuất</span>
                </button>
              </div>
            ) : (
              <Link
                to="/signin"
                className="mt-3 px-4 py-3 bg-rose-600 text-white rounded-lg text-center font-semibold hover:bg-rose-700 transition-colors shadow-sm"
                onClick={() => setMobileMenuOpen(false)}
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
