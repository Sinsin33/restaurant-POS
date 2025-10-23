export default function Cashier() {
  const tableNum = 7;
  return (
    <div>
      <div>
        <select>
          {Array.from({ length: tableNum }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Table {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
