import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);
  // console.log();
  function handleAdd(item) {
    setItems((items) => [...items, item]);
  }
  function onHandleItems(id) {
    console.log(id);
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function onHandleChange(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddHandle={handleAdd} />
      <PackingList
        items={items}
        onDeleteItems={onHandleItems}
        onToggleChange={onHandleChange}
      />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1> 🏖️ Far Away 🧳</h1>;
}

function Form({ onAddHandle }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(5);
  const newID = new Date();
  // if (!description) return;
  function handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      description,
      quantity,
      packed: false,
      id: newID,
    };
    console.log(newItem);
    onAddHandle(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItems, onToggleChange }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            key={item.id}
            onDeleteItems={onDeleteItems}
            onToggleChange={onToggleChange}
            item={item}
          />
        ))}
      </ul>
    </div>
  );
}
function Item({ item, onDeleteItems, onToggleChange }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleChange(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.description} {item.quantity}
      </span>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
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
