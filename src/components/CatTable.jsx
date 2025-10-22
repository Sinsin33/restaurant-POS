export default function CatTable({ categories }) {
  return (
    <div className="p-4" dir="rtl">
      <div
        className="group flex items-center justify-between px-4 py-3 
                         bg-gray-600 rounded-lg border border-gray-300 shadow-sm 
                          hover:border-gray-300 
                         transition-all duration-300 cursor-pointer mb-6"
      >
        {/* Category Name */}
        <div className="text-white font-semibold text-sm sm:text-base truncate">
          نام دسته بندی
        </div>

        {/* Item Count */}
        <div
          className=" text-gray-300 text-xs sm:text-sm 
                           px-3 py-1 rounded-full font-medium 
                           transition-colors duration-300"
        >
          تعداد منو در این دسته بندی
        </div>
      </div>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="group flex items-center justify-between px-4 py-3 
                         bg-[#212529] rounded-lg border border-gray-700 shadow-sm 
                         hover:bg-[#282d32] hover:border-gray-600 
                         transition-all duration-300 cursor-pointer "
          >
            {/* Category Name */}
            <div className="text-white font-semibold text-sm sm:text-base truncate">
              {cat.name}
            </div>

            {/* Item Count */}
            <div
              className="bg-[#2f333a] text-gray-300 text-xs sm:text-sm 
                           px-3 py-1 rounded-full font-medium group-hover:bg-[#3a4047] 
                           transition-colors duration-300"
            >
              {cat.items.length}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
