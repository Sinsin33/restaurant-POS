function MenuItem({ item, onAddToCart, onItemClick }) {
  const calculateOriginalPrice = (discountedPrice, discount) => {
    const numericPrice = parseInt(discountedPrice.replace(/[^0-9]/g, ""));
    const originalPrice = numericPrice / (1 - discount / 100);
    return Math.round(originalPrice).toLocaleString() + " تومان";
  };
  return (
    <div
      className="group bg-[#212529] rounded-xl overflow-hidden p-4 shadow-lg flex flex-col hover:bg-[#282d32] transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600"
      onClick={onItemClick}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] w-full">
        {/* <img
          src={`https://placehold.co/300x400/2f333a/b0b0b0?text=${encodeURIComponent(
            item.name
          )}`}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        /> */}
        <img
          src="https://img.freepik.com/free-photo/top-view-table-full-food_23-2149209253.jpg?ga=GA1.1.1966670954.1752227267&semt=ais_hybrid&w=740&q=80"
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Discount Badge */}
        {item.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {item.discount}% تخفیف
          </div>
        )}
        {/* Vegan Badge */}
        {item.isVegan && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            🌱 گیاهی
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1">
        {/* Header with name and rating */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-white flex-1 leading-tight">
            {item.name}
          </h3>
          <div className="flex items-center gap-1 text-amber-400 ml-2 flex-shrink-0">
            <span>⭐</span>
            <span className="text-sm font-medium">{item.rating}</span>
          </div>
        </div>

        {/* Ingredients */}
        <p className="text-sm text-gray-300 mb-4 line-clamp-2 leading-relaxed">
          {item.ingredients.join("، ")}
        </p>

        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between gap-3">
          <div className="text-left">
            <p className="text-lg font-bold text-green-400">{item.price}</p>
            {item.discount > 0 && (
              <p className="text-sm text-gray-400 line-through">
                {calculateOriginalPrice(item.price, item.discount)}
              </p>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
            className="bg-[#1e88e5] text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-[#1a76c7] 
                   active:scale-95 transition-all duration-200 whitespace-nowrap flex items-center gap-2"
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
