function MenuItem({ item, onAddToCart, onItemClick, theme }) {
  const calculateOriginalPrice = (discountedPrice, discount) => {
    const numericPrice = parseInt(discountedPrice.replace(/[^0-9]/g, ""));
    const originalPrice = numericPrice / (1 - discount / 100);
    return Math.round(originalPrice).toLocaleString() + " تومان";
  };
  return (
    <div
      className="group rounded-xl overflow-hidden p-4 shadow-lg flex flex-col hover:shadow-xl transition-all duration-300 cursor-pointer border"
      onClick={onItemClick}
      style={{
        backgroundColor: theme.nav,
        color: theme.text,
        borderColor: theme.shadow,
        boxShadow: `0 4px 10px ${theme.shadow}`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] w-full">
        <img
          src="https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?ga=GA1.1.1966670954.1752227267&semt=ais_hybrid&w=740&q=80"
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {item.discount > 0 && (
          <div
            className="absolute top-3 left-3 text-white px-2 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: theme.red || "#e53935" }}
          >
            {item.discount}% تخفیف
          </div>
        )}

        {item.isVegan && (
          <div
            className="absolute top-3 right-3 text-white px-2 py-1 rounded-full text-xs font-bold"
            style={{ backgroundColor: theme.green || "#4caf50" }}
          >
            🌱 گیاهی
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold flex-1 leading-tight">
            {item.name}
          </h3>
          <div
            className="flex items-center gap-1 ml-2"
            style={{ color: theme.accent }}
          >
            <span>⭐</span>
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
        </div>

        <p
          className="text-sm mb-4 line-clamp-2 leading-relaxed"
          style={{ color: "#666" }}
        >
          {item.ingredients.join("، ")}
        </p>

        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="text-left">
            <p className="text-lg font-bold" style={{ color: theme.accent }}>
              {item.price}
            </p>
            {item.discount > 0 && (
              <p className="text-sm line-through" style={{ color: "#999" }}>
                {calculateOriginalPrice(item.price, item.discount)}
              </p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className="text-black py-2 px-4 rounded-lg font-bold text-sm active:scale-95 transition-all duration-200 whitespace-nowrap flex items-center gap-2"
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
            <span>+</span>
            افزودن
          </button>
        </div>
      </div>
    </div>
  );
}
export default MenuItem;
