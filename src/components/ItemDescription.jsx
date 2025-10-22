import { useRef, useEffect } from "react";

export default function ItemDescription({ item, onClose, onAddToCart }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  if (!item) return null;

  const calculateOriginalPrice = (discountedPrice, discount) => {
    const numericPrice = parseInt(discountedPrice.replace(/[^0-9]/g, ""));
    const originalPrice = numericPrice / (1 - discount / 100);
    return Math.round(originalPrice).toLocaleString() + " تومان";
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2 sm:p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={modalRef}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[75vw] sm:max-w-xl relative z-10 max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-4 sm:left-4 text-white hover:text-gray-200 text-lg sm:text-xl w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full hover:bg-black/30 transition-colors z-20 backdrop-blur-sm"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 relative">
            <div className="relative h-48 sm:h-64 md:h-full overflow-hidden rounded-t-xl sm:rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none">
              <img
                src={`https://placehold.co/800x600/4a5568/ffffff?text=${encodeURIComponent(
                  item.name
                )}`}
                alt={item.name}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r md:from-black/50 md:to-transparent"></div>

              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex flex-col gap-1 sm:gap-2">
                {item.discount > 0 && (
                  <div className="bg-red-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
                    🔥 {item.discount}%
                  </div>
                )}
              </div>

              {/* گیاهخواری */}
              {item.isVegan && (
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-green-500 text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  🌱 گیاهی
                </div>
              )}

              {/* امتیازدهی موبایل */}
              <div className="absolute bottom-2 left-2 sm:hidden bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                ⭐ {item.rating}
              </div>
            </div>
          </div>

          {/* قسمت اصلی */}
          <div className="md:w-1/2 p-4 sm:p-6">
            {/* هدر */}
            <div className="mb-3 sm:mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 leading-tight">
                {item.name}
              </h2>

              {/* امتیاز */}
              <div className="hidden sm:flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm">
                  <span>⭐</span>
                  <span className="font-bold">{item.rating}</span>
                  <span className="text-gray-600">از 5</span>
                </div>
                <span className="text-gray-500 hidden md:inline">•</span>
                <span className="text-gray-600 text-sm">
                  {item.sold.toLocaleString()} فروش
                </span>
              </div>

              {/* فروش */}
              <div className="sm:hidden flex items-center gap-2 mb-2">
                <span className="text-gray-600 text-sm">
                  🛒 {item.sold.toLocaleString()} فروش
                </span>
              </div>
            </div>

            {/* قیمت */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-600">
                  {item.price}
                </span>
                {item.discount > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm sm:text-lg text-gray-500 line-through">
                      {calculateOriginalPrice(item.price, item.discount)}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs sm:text-sm font-bold">
                      ذخیره {item.discount}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* توضیحات */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
                توضیحات:
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify text-sm sm:text-base">
                {item.description}
              </p>
            </div>

            {/* ترکیبات */}
            <div className="mb-4 sm:mb-6">
              <h3 className="font-semibold text-gray-800 mb-2 text-base sm:text-lg">
                🍽️ مواد تشکیل دهنده:
              </h3>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {item.ingredients.map((ingredient, index) => (
                  <span
                    key={index}
                    className="bg-white border border-gray-200 text-gray-700 px-2 py-1 sm:px-3 sm:py-2 rounded text-xs sm:text-sm hover:bg-gray-50 hover:border-gray-300 transition-all cursor-default shadow-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* دکمه */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart(item);
                  onClose();
                }}
                className="flex-1 bg-[#1e88e5] text-white py-3 sm:py-3 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg hover:bg-[#1565c0] 
                       active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                افزودن به سبد
              </button>

              <button
                onClick={onClose}
                className="px-4 sm:px-6 border border-gray-300 text-gray-700 py-3 rounded-lg sm:rounded-xl font-bold text-base hover:bg-gray-50 
                       active:scale-95 transition-all duration-200 order-first sm:order-last"
              >
                بازگشت
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
