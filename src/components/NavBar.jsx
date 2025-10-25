import { useRef } from "react";

export default function NavBar({
  categories,
  activeCategory,
  scrollToCategory,
  theme,
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
    <div
      className="relative flex items-center shadow-md p-2 rounded-xl transition-all duration-300"
      style={{
        backgroundColor: theme.nav,
        boxShadow: `0 4px 10px ${theme.shadow}`,
      }}
    >
      {/* Left Button */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 rounded-full p-2 shadow-lg z-10 lg:hidden transition-colors duration-200"
        style={{
          backgroundColor: theme.button.bg,
          color: "white",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = theme.button.hover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = theme.button.bg)
        }
      >
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

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-responsive-hide lg:scrollbar-responsive-show px-10 pb-3"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => scrollToCategory(cat.id)}
            className={`px-4 py-2 text-sm lg:px-5 lg:py-2 lg:text-base font-semibold rounded-full transition-all duration-300`}
            style={{
              backgroundColor:
                activeCategory === cat.id ? theme.button.bg : theme.nav,
              color: activeCategory === cat.id ? "white" : "#2b2b2b",
              boxShadow:
                activeCategory === cat.id
                  ? `0 3px 6px ${theme.shadow}`
                  : "none",
            }}
            onMouseEnter={(e) => {
              if (activeCategory !== cat.id)
                e.currentTarget.style.backgroundColor = "#f0f0f0";
            }}
            onMouseLeave={(e) => {
              if (activeCategory !== cat.id)
                e.currentTarget.style.backgroundColor = theme.nav;
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Right Button */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 rounded-full p-2 shadow-lg z-10 lg:hidden transition-colors duration-200"
        style={{
          backgroundColor: theme.button.bg,
          color: "white",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = theme.button.hover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = theme.button.bg)
        }
      >
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
