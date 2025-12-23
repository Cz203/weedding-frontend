import React from "react";

interface LightboxProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
  title?: string;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  imageUrl,
  onClose,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-50"
      >
        &times;
      </button>

      <div className="relative max-w-7xl max-h-[90vh] p-4">
        <img
          src={imageUrl}
          alt={title || "Image"}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 rounded-b-lg">
            <h3 className="text-white text-xl font-semibold text-center">
              {title}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lightbox;
