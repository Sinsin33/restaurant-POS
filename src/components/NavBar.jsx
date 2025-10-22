import { useRef } from "react";

export default function NavBar({
  categories,
  activeCategory,
  scrollToCategory,
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative flex items-center bg-[#212529] shadow-md p-2">
      {/* Left button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 bg-[#1e88e5] text-white rounded-full p-2 shadow-lg hover:bg-[#1565c0] z-10 lg:hidden"
      >
        {/* Left arrow SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-responsive-hide lg:scrollbar-responsive-show px-10 pb-3"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollToCategory(cat.id)}
            className={`px-4 py-2 text-sm lg:px-5 lg:py-2 lg:text-base font-semibold rounded-full transition-all duration-300 ${
              activeCategory === cat.id
                ? "bg-[#1e88e5] text-white shadow-md"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Right button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 bg-[#1e88e5] text-white rounded-full p-2 shadow-lg hover:bg-[#1565c0] z-10 lg:hidden"
      >
        {/* Right arrow SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
