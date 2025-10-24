import { useEffect, useState } from "react";

export default function Cashier() {
  const [invoices, setInvoices] = useState([]);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    async function fetchInvoices() {
      try {
        const res = await fetch("http://localhost:8000/invoices");
        if (!res.ok) throw new Error("Failed to fetch invoices");

        const data = await res.json();

        const invoicesWithSelection = data.map((invoice) => ({
          ...invoice,
          orders: invoice.orders.map((order) => ({
            ...order,
            selectedForPayment: false,
          })),
        }));

        setInvoices(invoicesWithSelection);
      } catch (err) {
        console.error("Error fetching invoices:", err);
      }
    }

    fetchInvoices();
  }, []);

  const currentInvoice = invoices.find((inv) => inv.id === activeInvoice);

  const totalPrice = currentInvoice
    ? currentInvoice.orders.reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
      )
    : 0;

  function handleSelectItem(itemId) {
    setInvoices((prevInvoices) =>
      prevInvoices.map((invoice) => {
        if (invoice.id !== activeInvoice) return invoice;

        return {
          ...invoice,
          orders: invoice.orders.map((order) =>
            order.itemId === itemId
              ? { ...order, selectedForPayment: !order.selectedForPayment }
              : order
          ),
        };
      })
    );
  }

  const selectedItemsTotalPrice = currentInvoice
    ? currentInvoice.orders
        .filter((order) => order.selectedForPayment)
        .reduce((sum, order) => sum + order.price * order.quantity, 0)
    : 0;
  const finalPrice = selectedItemsTotalPrice - discount;
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1b1e22] text-gray-200 p-6">
      {/* لیست انتخاب لیست که باید به انتخاب فاکتور تبدیل شود. */}
      <div className="bg-[#212529] p-8 rounded-2xl shadow-xl border border-[#2a2f35] w-96 mb-8">
        <h2 className="text-center text-xl font-bold mb-6 text-[#1e88e5]">
          انتخاب فاکتور
        </h2>

        <select
          onChange={(e) => setActiveInvoice(Number(e.target.value))}
          className="w-full p-3 rounded-lg bg-[#2a2f35] border border-[#3a3f45]
               text-gray-100 text-lg focus:outline-none focus:ring-2
               focus:ring-[#1e88e5] hover:border-[#1e88e5] transition"
        >
          <option value="">فاکتور را انتخاب کنید</option>

          {invoices.map((invoice) => (
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

      {/* لیست سفارش ها */}
      {activeInvoice && currentInvoice && (
        <div className="mt-4 bg-[#212529] p-6 rounded-2xl w-full max-w-2xl border border-[#2a2f35] shadow-lg">
          <h3 className="text-2xl font-bold text-center text-[#1e88e5] mb-4">
            سفارش‌های میز {currentInvoice.tableId} — فاکتور #{currentInvoice.id}
          </h3>
          <p className="text-lg font-bold mt-2 text-center">
            مجموع کل میز: {totalPrice.toLocaleString()} تومان
          </p>

          {currentInvoice.orders && currentInvoice.orders.length > 0 ? (
            currentInvoice.orders.map((order) => (
              <div
                key={order.itemId}
                className="flex items-start gap-3 bg-[#2a2f35] p-4 rounded-lg mb-4 hover:bg-[#2e333a] transition"
              >
                {/* انتخابی */}
                <input
                  type="checkbox"
                  className="mt-1 accent-[#1e88e5] w-5 h-5 cursor-pointer"
                  checked={order.selectedForPayment || false}
                  onChange={() => handleSelectItem(order.itemId)}
                />

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

      {/* قابل پرداختی و ... */}
      {activeInvoice && (
        <div className="bg-[#212529] p-8 rounded-2xl shadow-xl border border-[#2a2f35] w-96 mt-6">
          <p className="text-lg font-bold mt-2">
            مجموع موارد انتخاب شده:: {selectedItemsTotalPrice.toLocaleString()}{" "}
            تومان
          </p>

          <div className="mt-4">
            <label className="block text-gray-400 mb-1">تخفیف:</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > totalPrice) {
                  setDiscount(totalPrice);
                } else if (value < 0) {
                  setDiscount(0);
                } else {
                  setDiscount(value);
                }
              }}
              className="w-full p-2 rounded-lg bg-[#2a2f35] border border-[#3a3f45] text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1e88e5]"
            />
          </div>

          <p className="text-lg font-bold mt-4">
            قابل پرداخت: {finalPrice.toLocaleString()} تومان
          </p>
        </div>
      )}
    </div>
  );
}
