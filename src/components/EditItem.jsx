import { useRef, useEffect } from "react";

export default function EditItem({ onClose, item }) {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-2 sm:p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        ref={modalRef}
        className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-[75vw] sm:max-w-xl relative z-10 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 text-gray-500 hover:text-gray-700 text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>

        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 text-center">
            {item ? `ویرایش ${item.name}` : "افزودن آیتم جدید"}
          </h2>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            {item ? `در حال ویرایش: ${item.name}` : "ایجاد آیتم جدید"}
          </h3>

          {/* Example form fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                نام آیتم
              </label>
              <input
                type="text"
                defaultValue={item?.name || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="نام آیتم را وارد کنید"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                قیمت
              </label>
              <input
                type="text"
                defaultValue={item?.price || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="قیمت را وارد کنید"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              انصراف
            </button>
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
