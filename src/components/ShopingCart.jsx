export default function ShopingCart({
  cart,
  handleRemoveFromCart,
  handleAddToCart,
  handleDeleteFromCart,
  isMobile = false,
  onClose = () => {},
}) {
  const CartIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4m7.9 13.7a2 2 0 11-4 0 2 2 0 014 0zm-4-4h.01M20.5 20.5a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );

  const handleIncreaseQuantity = (itemId) => {
    const itemToAdd = cart.find((item) => item.id === itemId);
    if (itemToAdd) {
      handleAddToCart(itemToAdd);
    }
  };

  const handleDecreaseQuantity = (itemId) => {
    const item = cart.find((item) => item.id === itemId);
    if (item && item.quantity > 1) {
      handleRemoveFromCart(itemId);
    } else {
      handleDeleteFromCart(itemId);
    }
  };

  const total = cart.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, "")) * item.quantity;
    return sum + price;
  }, 0);

  return (
    <div className="w-full h-full lg:h-screen bg-[#212529] flex flex-col z-51">
      <div className="flex items-center justify-between p-4 lg:p-6 border-b border-gray-600">
        <div className="flex items-center">
          <CartIcon />
          <h2 className="text-xl font-bold mr-2">سفارش</h2>
          {cart.length > 0 && (
            <span className="bg-[#1e88e5] text-white rounded-full px-2 py-1 text-xs">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} قلم
            </span>
          )}
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 min-h-[200px]">
        {cart.length === 0 ? (
          <div className="text-center text-gray-400 mt-20">
            سبد خرید خالی است.
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="bg-[#282d32] p-3 lg:p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <p className="text-sm text-gray-300 font-semibold flex-1 text-right">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-300 font-semibold whitespace-nowrap mr-2">
                    {item.price}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleDeleteFromCart(item.id)}
                      className="text-red-500 hover:text-red-400 transition-colors duration-200 p-1"
                      title="حذف از سبد خرید"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.035 21H7.965a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>

                    <div className="flex items-center bg-[#1b1e22] rounded-lg">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="p-2 text-gray-300 hover:text-white hover:bg-[#1e88e5] rounded-r-lg transition-colors duration-200"
                        title="کاهش تعداد"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 12H4"
                          />
                        </svg>
                      </button>

                      <span className="px-3 py-2 text-gray-100 font-bold min-w-[40px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="p-2 text-gray-300 hover:text-white hover:bg-[#1e88e5] rounded-l-lg transition-colors duration-200"
                        title="افزایش تعداد"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="text-left">
                    <p className="text-xs text-gray-400">جمع:</p>
                    <p className="text-sm font-bold text-gray-200">
                      {(
                        parseInt(item.price.replace(/[^0-9]/g, "")) *
                        item.quantity
                      ).toLocaleString()}{" "}
                      تومان
                    </p>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-gray-400">
                  هر عدد:{" "}
                  {parseInt(item.price.replace(/[^0-9]/g, "")).toLocaleString()}{" "}
                  تومان
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-gray-600 p-4 lg:p-6">
        {cart.length > 0 && (
          <>
            <div className="flex justify-between text-lg font-bold mb-2">
              <span>مجموع کل:</span>
              <span>{total.toLocaleString()} تومان</span>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mb-4">
              <span>
                تعداد اقلام:{" "}
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <span>تعداد محصولات: {cart.length}</span>
            </div>
          </>
        )}

        <button
          className={`w-full text-white py-3 px-6 rounded-md font-bold text-sm transition-colors duration-200 flex items-center justify-center ${
            cart.length === 0
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#35a448] hover:bg-[#2d8b3c]"
          }`}
          disabled={cart.length === 0}
        >
          <span className="text-lg ml-2">ثبت سفارش</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
    </div>
  );
}
