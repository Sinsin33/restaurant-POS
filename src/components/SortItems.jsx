import { useState, useRef, useEffect } from "react";

export default function SortItems({ onSortChange, theme }) {
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
      {/* Dropdown trigger */}
      <div
        className={`px-4 py-1 text-sm lg:px-5 lg:py-2 lg:text-base font-semibold rounded-full 
      flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all duration-200
      text-white`}
        style={{
          backgroundColor: isOpen ? theme.button.hover : theme.button.bg,
          boxShadow: `0 2px 6px ${theme.shadow}`,
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = theme.button.hover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = isOpen
            ? theme.button.hover
            : theme.button.bg)
        }
        onMouseDown={(e) =>
          (e.currentTarget.style.backgroundColor = theme.button.hover)
        }
        onMouseUp={(e) =>
          (e.currentTarget.style.backgroundColor = isOpen
            ? theme.button.hover
            : theme.button.bg)
        }
      >
        <span>{selectedSort}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
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

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute top-12 left-0 w-48 rounded-lg shadow-lg border z-50 overflow-hidden"
          style={{
            backgroundColor: theme.bg,
            borderColor: theme.shadow,
            boxShadow: `0 4px 12px ${theme.shadow}`,
          }}
        >
          {sortOptions.map((option) => (
            <div
              key={option.id}
              className="px-4 py-3 cursor-pointer transition-all text-sm lg:text-base border-b last:border-b-0"
              style={{
                color: "#2b2b2b",
                borderColor: "rgba(0,0,0,0.05)",
              }}
              onClick={() => handleSort(option)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = theme.button.bg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = theme.bg)
              }
              onMouseDown={(e) =>
                (e.currentTarget.style.backgroundColor = theme.button.hover)
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.backgroundColor = theme.bg)
              }
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
