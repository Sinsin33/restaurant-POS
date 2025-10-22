import { useState } from "react";
import EditItem from "./EditItem";

export default function CrudTable({ categories }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const numINPage = 10;

  // Flatten or filter items based on active category
  const items =
    activeCategory === "all"
      ? categories.flatMap((cat) => cat.items)
      : categories.find((cat) => cat.id === activeCategory)?.items || [];

  // Slice items for current page
  const paginatedItems = items.slice(page * numINPage, (page + 1) * numINPage);

  const totalPages = Math.ceil(items.length / numINPage);

  // Handle edit button click
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  // Handle delete button click
  const handleDeleteClick = (item) => {
    if (window.confirm(`آیا از حذف "${item.name}" مطمئن هستید؟`)) {
      // Add your delete logic here
      console.log("Deleting item:", item);
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl md:text-2xl text-gray-800 border-b py-3">
        منو
      </h2>

      {/* Category nav menu */}
      <nav className="bg-[#212529] shadow-md p-4 flex gap-2 overflow-x-auto whitespace-nowrap text-right justify-end">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setPage(0); // reset page when changing category
            }}
            className={`px-4 py-2 text-sm lg:px-5 lg:py-2 lg:text-base font-semibold rounded-full transition-all duration-300 text-right ${
              activeCategory === cat.id
                ? "bg-[#1e88e5] text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {cat.name}
          </button>
        ))}
        <button
          onClick={() => {
            setActiveCategory("all");
            setPage(0);
          }}
          className={`px-4 py-2 text-sm lg:px-5 lg:py-2 lg:text-base font-semibold rounded-full transition-all duration-300 text-right ${
            activeCategory === "all"
              ? "bg-[#1e88e5] text-white shadow-md"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          همه
        </button>
      </nav>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 [direction:rtl]">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 border border-gray-100"
            >
              {/* Item Image */}
              <div className="h-40 bg-gradient-to-br from-blue-50 to-gray-100 rounded-t-xl flex items-center justify-center overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <svg
                      className="w-12 h-12 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">بدون تصویر</span>
                  </div>
                )}
              </div>

              {/* Item Content */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-2 text-right">
                  {item.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    {item.price}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-3xl text-center">
                    {
                      categories.find((cat) =>
                        cat.items.some((i) => i.id === item.id)
                      )?.name
                    }
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDeleteClick(item)}
                    className="flex-1 bg-red-200 text-black py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-700 transition duration-200"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              آیتمی یافت نشد
            </h3>
            <p className="text-gray-500 text-sm">
              هیچ آیتمی در این دسته‌بندی وجود ندارد
            </p>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {items.length > numINPage && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            disabled={page === 0}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            قبلی
          </button>
          <span className="px-4 py-2">
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            بعدی
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditItem item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}
