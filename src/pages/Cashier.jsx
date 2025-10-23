import { useEffect, useState } from "react";

export default function Cashier() {
  const [orders, setOrders] = useState([]);
  const [activeTable, setActiveTable] = useState(null);
  const [discount, setDiscount] = useState(0);
  const tableNum = 7;

  const handleTableChange = (e) => {
    setActiveTable(Number(e.target.value));
  };

  useEffect(() => {
    async function fetchTables() {
      try {
        const res = await fetch("http://localhost:8000/tables");
        if (!res.ok) throw new Error("Failed to fetch tables");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchTables();
  }, []);

  const currentTable = orders.find((t) => t.tableNumber === activeTable);

  // Calculate total every render
  const totalPrice = currentTable
    ? currentTable.orders.reduce(
        (sum, order) => sum + order.price * order.quantity,
        0
      )
    : 0;

  const finalPrice = totalPrice - discount;

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#1b1e22] text-gray-200 p-6">
      {/* Table selection */}
      <div className="bg-[#212529] p-8 rounded-2xl shadow-xl border border-[#2a2f35] w-96 mb-8">
        <h2 className="text-center text-xl font-bold mb-6 text-[#1e88e5]">
          انتخاب میز
        </h2>
        <select
          onChange={handleTableChange}
          className="w-full p-3 rounded-lg bg-[#2a2f35] border border-[#3a3f45] 
                     text-gray-100 text-lg focus:outline-none focus:ring-2 
                     focus:ring-[#1e88e5] hover:border-[#1e88e5] transition"
        >
          <option value="">میز را انتخاب کنید</option>
          {Array.from({ length: tableNum }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              میز {i + 1}
            </option>
          ))}
        </select>
      </div>

      {/* Orders */}
      {currentTable && (
        <div className="mt-4 bg-[#212529] p-6 rounded-2xl w-full max-w-2xl border border-[#2a2f35] shadow-lg">
          <h3 className="text-2xl font-bold text-center text-[#1e88e5] mb-4">
            سفارش‌های میز {activeTable}
          </h3>
          {currentTable.orders.map((order) => (
            <div
              key={order.itemId}
              className="bg-[#2a2f35] p-4 rounded-lg mb-4 hover:bg-[#2e333a] transition"
            >
              <p className="text-lg font-semibold">{order.name}</p>
              <p className="text-sm text-gray-400">
                {order.quantity} × {order.price.toLocaleString()} تومان
              </p>
              {order.note && (
                <p className="text-sm text-[#1e88e5] mt-1">{order.note}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Total, Discount, Final */}
      {activeTable && (
        <div className="bg-[#212529] p-8 rounded-2xl shadow-xl border border-[#2a2f35] w-96 mt-6">
          <p className="text-lg font-bold mt-2">
            مجموع: {totalPrice.toLocaleString()} تومان
          </p>

          <div className="mt-4">
            <label className="block text-gray-400 mb-1">تخفیف:</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value > totalPrice) {
                  setDiscount(totalPrice); // set max discount to total price
                } else if (value < 0) {
                  setDiscount(0); // prevent negative discount
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
