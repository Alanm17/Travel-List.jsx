import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItems,
  onToggleChange,
  ClearAll,
}) {
  const [sortBy, setSort] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items.slice().sort((a, b) => a.packed - b.packed);
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleChange={onToggleChange}
            item={item}
          />
        ))}
      </ul>
      <div>
        <select value={sortBy} onChange={(e) => setSort(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={ClearAll}>Clear List</button>
      </div>
    </div>
  );
}
