import { useEffect, useReducer } from "react";

const initialState = {
  invoices: [],
  activeInvoice: null,
  discount: 0,
  payMentMethod: ["کارت بانکی", "نقدی"],
  selectedPayment: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "setInvoices":
      return { ...state, invoices: action.payload };

    case "changePayment":
      return { ...state, selectedPayment: action.payload };

    case "changeActiveInvoice":
      return { ...state, activeInvoice: action.payload };

    case "changeDiscount":
      return { ...state, discount: action.payload };

    case "increaseSelectedForCount":
    case "decreaseSelectedForCount": {
      const delta = action.type === "increaseSelectedForCount" ? 1 : -1;

      const updatedInvoices = state.invoices.map((invoice) => {
        if (invoice.id === state.activeInvoice) {
          return {
            ...invoice,
            orders: invoice.orders.map((order) => {
              if (order.itemId === action.payload) {
                const currentSelected = order.selectedQuantity || 0;

                const newQuantity = Math.max(
                  0,
                  Math.min(order.quantity, currentSelected + delta)
                );
                return { ...order, selectedQuantity: newQuantity };
              }
              return order;
            }),
          };
        }
        return invoice;
      });

      return { ...state, invoices: updatedInvoices };
    }

    default:
      return state;
  }
}

export default function Cashier() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const res = await fetch("http://localhost:8000/invoices");
        if (!res.ok) throw new Error("Failed to fetch invoices");
        const data = await res.json();
        dispatch({ type: "setInvoices", payload: data });
      } catch (err) {
        console.error("Error fetching invoices:", err);
      }
    }
    fetchInvoices();
  }, []);

  const currentInvoice = state.invoices.find(
    (inv) => inv.id === state.activeInvoice
  );

  const totalPrice = currentInvoice
    ? currentInvoice.orders.reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
      )
    : 0;

  const miniCalculator =
    currentInvoice?.orders?.reduce(
      (sum, acc) => sum + (acc.selectedQuantity || 0) * acc.price,
      0
    ) || 0;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1b1e22] text-gray-200 p-6">
      {/* انتخاب فاکتور */}
      <div className="bg-[#212529] p-8 rounded-2xl shadow-xl border border-[#2a2f35] w-96 mb-8">
        <h2 className="text-center text-xl font-bold mb-6 text-[#1e88e5]">
          انتخاب فاکتور
        </h2>

        <select
          onChange={(e) =>
            dispatch({
              type: "changeActiveInvoice",
              payload: Number(e.target.value),
            })
          }
          className="w-full p-3 rounded-lg bg-[#2a2f35] border border-[#3a3f45]
               text-gray-100 text-lg focus:outline-none focus:ring-2
               focus:ring-[#1e88e5] hover:border-[#1e88e5] transition"
        >
          <option value="">فاکتور را انتخاب کنید</option>

          {state.invoices.map((invoice) => (
            <option key={invoice.id} value={invoice.id}>
              میز {invoice.tableId} — فاکتور #{invoice.id} —{" "}
              {new Date(invoice.createdAt).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </option>
          ))}
        </select>
      </div>

      {/* لیست سفارش‌ها */}
      {state.activeInvoice && currentInvoice && (
        <div className="mt-4 bg-[#212529] p-6 rounded-2xl w-full max-w-2xl border border-[#2a2f35] shadow-lg">
          <h3 className="text-2xl font-bold text-center text-[#1e88e5] mb-4">
            سفارش‌های میز {currentInvoice.tableId} — فاکتور #{currentInvoice.id}
          </h3>

          <p className="text-lg font-bold mt-2 text-center">
            مجموع موارد انتخابی: {miniCalculator.toLocaleString()} تومان
          </p>

          {currentInvoice.orders && currentInvoice.orders.length > 0 ? (
            currentInvoice.orders.map((order) => (
              <div
                key={order.itemId}
                className="flex items-start gap-3 bg-[#2a2f35] p-4 rounded-lg mb-4 hover:bg-[#2e333a] transition"
              >
                <div className="flex items-center border rounded-lg overflow-hidden w-max">
                  <button
                    className="px-2 bg-gray-200 hover:bg-gray-300 text-black"
                    onClick={() =>
                      dispatch({
                        type: "decreaseSelectedForCount",
                        payload: order.itemId,
                      })
                    }
                  >
                    -
                  </button>

                  <span className="px-3 text-center w-8">
                    {order.selectedQuantity || 0}
                  </span>

                  <button
                    className="px-2 bg-gray-200 hover:bg-gray-300 text-black "
                    onClick={() =>
                      dispatch({
                        type: "increaseSelectedForCount",
                        payload: order.itemId,
                      })
                    }
                  >
                    +
                  </button>
                </div>

                <div className="flex-1">
                  <p className="text-lg font-semibold">{order.name}</p>
                  <p className="text-sm text-gray-400">
                    {order.quantity} × {order.price.toLocaleString()} تومان
                  </p>
                  {order.note && (
                    <p className="text-sm text-[#1e88e5] mt-1">{order.note}</p>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              هیچ سفارشی برای این فاکتور وجود ندارد.
            </p>
          )}
        </div>
      )}

      {/* تخفیف و مجموع */}
      {state.activeInvoice && (
        <div className="bg-[#212529] p-8 rounded-2xl shadow-xl border border-[#2a2f35] w-96 mt-6">
          <p className="text-lg font-bold mt-2">
            کل فاکتور: {totalPrice.toLocaleString()} تومان
          </p>

          <div className="mt-4">
            <label className="block text-gray-400 mb-1">تخفیف:</label>
            <input
              type="number"
              value={state.discount}
              onChange={(e) => {
                const value = Number(e.target.value);
                const validDiscount = Math.max(0, Math.min(value, totalPrice));
                dispatch({ type: "changeDiscount", payload: validDiscount });
              }}
              className="w-full p-2 rounded-lg bg-[#2a2f35] border border-[#3a3f45] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
            />
          </div>

          <p className="text-lg font-bold mt-4">
            قابل پرداخت: {(totalPrice - state.discount).toLocaleString()} تومان
          </p>
          <p className="text-lg font-bold mt-4">پرداخت شده: {0} تومان</p>
          <p className="text-lg font-bold mt-4">باقی مانده: {0} تومان</p>
          <select
            value={state.selectedPayment}
            onChange={(e) =>
              dispatch({ type: "changePayment", payload: e.target.value })
            }
            className="w-full p-2 rounded-lg bg-[#2a2f35] border border-[#3a3f45] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
          >
            <option value="">روش پرداخت را انتخاب کنید</option>
            {state.payMentMethod.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
