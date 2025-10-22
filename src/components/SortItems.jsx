import { useState, useRef, useEffect } from "react";

export default function SortItems({ onSortChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("مرتب سازی بر اساس:");
  const dropdownRef = useRef(null);

  const sortOptions = [
    { id: "priceHighest", label: "بر اساس گرانترین" },
    { id: "priceLowest", label: "بر اساس ارزانترین" },
    { id: "rating", label: "امتیاز" },
    { id: "sold", label: "تعداد فروش" },
    { id: "discount", label: "تخفیف" },
    { id: "vegan", label: "فقط گیاهی" },
  ];

  const handleSort = (sortType) => {
    setSelectedSort(sortType.label);
    setIsOpen(false);

    if (onSortChange) {
      onSortChange(sortType.id);
    }
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="px-4 py-1 text-sm lg:px-5 lg:py-2 lg:text-base font-semibold rounded-full bg-gray-600 text-white hover:bg-gray-500 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{selectedSort}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute top-12 left-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
          {sortOptions.map((option) => (
            <div
              key={option.id}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all text-gray-800 text-sm lg:text-base border-b border-gray-100 last:border-b-0"
              onClick={() => handleSort(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
