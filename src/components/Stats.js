export default function Stats({ items }) {
  if (!items.length)
    return <p className="stats">Start adding some items to your list 🗂️</p>;
  const numItems = items.length;
  const packedItems = items.filter((items) => items.packed).length;
  const totalPercent = Math.round((packedItems / numItems) * 100);
  return (
    <footer className="stats">
      {totalPercent < 100 ? (
        <em>
          You have {numItems} items on your list, and you already packed{" "}
          {packedItems} ({totalPercent || 0}%)
        </em>
      ) : (
        <em>You got everything ({totalPercent}%)! You're ready to ✈️</em>
      )}
    </footer>
  );
}
