export default function ShopingCart({
  cart,
  handleRemoveFromCart,
  handleAddToCart,
  handleDeleteFromCart,
  isMobile = false,
  onClose = () => {},
  theme,
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
    <div
      className="w-full h-full lg:h-screen flex flex-col z-51 transition-all duration-300"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 lg:p-6 border-b transition-all duration-300"
        style={{ borderColor: theme.shadow }}
      >
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-2" style={{ color: theme.text }}>
            سفارش
          </h2>
          {cart.length > 0 && (
            <span
              className="text-white rounded-full px-2 py-1 text-xs"
              style={{ backgroundColor: theme.button.bg }}
            >
              {cart.reduce((sum, item) => sum + item.quantity, 0)} قلم
            </span>
          )}
        </div>

        {isMobile && (
          <button
            onClick={onClose}
            className="lg:hidden transition-colors duration-200"
            style={{ color: theme.accent }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = theme.accentHover)
            }
            onMouseLeave={(e) => (e.currentTarget.style.color = theme.accent)}
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

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 min-h-[200px]">
        {cart.length === 0 ? (
          <div className="text-center mt-20" style={{ color: theme.accent }}>
            سبد خرید خالی است.
          </div>
        ) : (
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-3 lg:p-4 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: theme.nav,
                  boxShadow: `0 3px 6px ${theme.shadow}`,
                }}
              >
                <div className="flex justify-between items-start mb-3">
                  <p
                    className="text-sm font-semibold flex-1 text-right"
                    style={{ color: theme.text }}
                  >
                    {item.name}
                  </p>
                  <p
                    className="text-sm font-semibold whitespace-nowrap mr-2"
                    style={{ color: theme.text }}
                  >
                    {item.price}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <button
                      onClick={() => handleDeleteFromCart(item.id)}
                      className="transition-colors duration-200 p-1"
                      title="حذف از سبد خرید"
                      style={{ color: "#e53935" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#c62828")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#e53935")
                      }
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

                    <div
                      className="flex items-center rounded-lg transition-all duration-200"
                      style={{ backgroundColor: theme.bg }}
                    >
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className="p-2 rounded-r-lg transition-colors duration-200"
                        style={{ color: theme.text }}
                        onMouseEnter={(e) => (
                          (e.currentTarget.style.backgroundColor =
                            theme.button.hover),
                          (e.currentTarget.style.color = "black")
                        )}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = theme.text;
                        }}
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

                      <span
                        className="px-3 py-2 font-bold min-w-[40px] text-center"
                        style={{ color: theme.text }}
                      >
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className="p-2 rounded-l-lg transition-colors duration-200"
                        style={{ color: theme.text }}
                        onMouseEnter={(e) => (
                          (e.currentTarget.style.backgroundColor =
                            theme.button.hover),
                          (e.currentTarget.style.color = "black")
                        )}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.color = theme.text;
                        }}
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
                    <p
                      className="text-sm font-bold"
                      style={{ color: theme.text }}
                    >
                      {(
                        parseInt(item.price.replace(/[^0-9]/g, "")) *
                        item.quantity
                      ).toLocaleString()}{" "}
                      تومان
                    </p>
                  </div>
                </div>

                <div
                  className="mt-2 pt-2 border-t text-xs"
                  style={{
                    borderColor: theme.shadow,
                    color: theme.text,
                  }}
                >
                  هر عدد:{" "}
                  {parseInt(item.price.replace(/[^0-9]/g, "")).toLocaleString()}{" "}
                  تومان
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        className="border-t p-4 lg:p-6 transition-all duration-300"
        style={{ borderColor: theme.shadow }}
      >
        {cart.length > 0 && (
          <>
            <div className="flex justify-between text-lg font-bold mb-2">
              <span style={{ color: theme.text }}>مجموع کل:</span>
              <span style={{ color: theme.text }}>
                {total.toLocaleString()} تومان
              </span>
            </div>
            <div
              className="flex justify-between text-sm mb-4"
              style={{ color: theme.text }}
            >
              <span>
                تعداد اقلام:{" "}
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <span>تعداد محصولات: {cart.length}</span>
            </div>
          </>
        )}

        <button
          className="w-full text-white py-3 px-6 rounded-md font-bold text-sm transition-colors duration-200 flex items-center justify-center"
          style={{
            backgroundColor: cart.length === 0 ? "#777" : theme.button.bg,
            cursor: cart.length === 0 ? "not-allowed" : "pointer",
          }}
          onMouseEnter={(e) => {
            if (cart.length > 0)
              e.currentTarget.style.backgroundColor = theme.button.hover;
          }}
          onMouseLeave={(e) => {
            if (cart.length > 0)
              e.currentTarget.style.backgroundColor = theme.button.bg;
          }}
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
