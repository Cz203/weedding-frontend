import { useState, useEffect } from "react";
import { getApiUrl, API_CONFIG } from "../config/api";

export default function SocialFloatingButtons() {
  const [isOpen, setIsOpen] = useState(true); // Mở sẵn khi load trang
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/can.ti.3532",
    zalo: "0774118045",
    gmail: "caoduongvietquoc@gmail.com",
  });

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const fetchSocialLinks = async () => {
    try {
      const response = await fetch(
        getApiUrl(API_CONFIG.ENDPOINTS.SOCIAL_LINKS)
      );
      const data = await response.json();
      if (data.success) {
        setSocialLinks({
          facebook: data.data.facebook || "https://facebook.com/can.ti.3532",
          zalo: data.data.zalo || "0774118045",
          gmail: data.data.gmail || "caoduongvietquoc@gmail.com",
        });
      }
    } catch (error) {
      console.error("Failed to fetch social links:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Social Media Buttons - Show when open */}
      {isOpen && (
        <div className="flex flex-col gap-3 animate-fadeIn">
          {socialLinks.facebook && (
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
              title="Facebook"
            >
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47062 14 5.5 16 5.5H17.5V2.1401C17.1743 2.09685 15.943 2 14.6429 2C11.9284 2 10 3.65686 10 6.69971V9.5H7V13.5H10V22H14V13.5Z"
                  fill=""
                />
              </svg>
            </a>
          )}

          {socialLinks.zalo && (
            <a
              href={`https://zalo.me/${socialLinks.zalo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
              title="Zalo"
            >
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44C35.04 44 44 35.04 44 24C44 12.96 35.04 4 24 4ZM31.28 28.48C31.28 28.48 29.52 30.8 24 30.8C18.48 30.8 16.72 28.48 16.72 28.48V18.56C16.72 16.48 18.48 14.8 20.64 14.8H27.36C29.52 14.8 31.28 16.48 31.28 18.56V28.48ZM20.8 20.8V26.4H22.4V20.8H20.8ZM25.6 20.8V26.4H27.2V20.8H25.6Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          )}

          {socialLinks.gmail && (
            <a
              href={`mailto:${socialLinks.gmail}`}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
              title="Gmail"
            >
              <svg
                className="fill-current"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </a>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-600 text-white shadow-lg transition-all hover:scale-110 hover:bg-rose-700 hover:shadow-xl"
        title={isOpen ? "Đóng" : "Liên hệ"}
      >
        {isOpen ? (
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
