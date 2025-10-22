import { useState } from "react";

export default function CatForm() {
  const [formData, setFormData] = useState({
    title: "",
    svgItem: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const resetForm = () => {
    setFormData({
      title: "",
      svgItem: null,
    });
  };

  return (
    <form className="bg-white rounded-lg shadow-md p-4 md:p-6 space-y-6 text-right">
      {/* Form Title */}
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 border-b pb-3">
        مدیریت منو
      </h2>

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
