import { useState, useRef } from "react";
export default function CrudForm({ categories }) {
  const [formData, setFormData] = useState({
    category: categories[0]?.id || "",
    title: "",
    price: "",
    image: null,
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // 2. HANDLERS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const resetForm = () => {
    setFormData({
      category: categories[0]?.id || "",
      title: "",
      price: "",
      image: null,
    });
    setIsDragging(false);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleImageChange(e);
  };

  // Mobile-specific click handler
  const handleLabelClick = (e) => {
    // Prevent double triggering on mobile
    if (window.innerWidth < 768) {
      e.preventDefault();
      fileInputRef.current?.click();
    }
  };
  // Check if mobile device
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  console.log(isMobile);
  return (
    <form className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-6 text-right">
      {/* Form Title */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 border-b pb-3">
        مدیریت منو
      </h2>

      {/* Category Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          دسته‌بندی
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Item Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          عنوان آیتم
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
          placeholder="مثال: سالاد سزار"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
      </div>

      {/* Price */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          قیمت (تومان)
        </label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-right"
          placeholder="مثال: 120000"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          step="1000"
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          تصویر آیتم
        </label>
        <div className="flex items-center justify-center w-full">
          <label
            className={`flex flex-col items-center justify-center w-full h-28 md:h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200 ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleLabelClick}
          >
            <div className="flex flex-col items-center justify-center pt-4 pb-4 md:pt-5 md:pb-5">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 mb-2 md:mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-1 md:mb-2 text-xs md:text-sm text-gray-500 text-center px-2">
                {isMobile
                  ? "برای آپلود کلیک کنید"
                  : "برای آپلود کلیک کنید یا فایل را اینجا بکشید"}
              </p>
              {formData.image && (
                <p className="text-xs text-green-600 mt-1">
                  ✓ {formData.image.name}
                </p>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
        >
          ذخیره آیتم
        </button>
        <button
          onClick={resetForm}
          type="button"
          className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-400 transition duration-200 font-medium mt-2 md:mt-0"
        >
          انصراف
        </button>
      </div>
    </form>
  );
}
