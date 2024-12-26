import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
  function onHandleClear() {
    const confirmed = window.confirm(
      "are you sure you wanna delete all listed items ?"
    );
    confirmed && setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddHandle={handleAdd} />
      <PackingList
        items={items}
        onDeleteItems={onHandleItems}
        onToggleChange={onHandleChange}
        ClearAll={onHandleClear}
      />
      <Stats items={items} />
    </div>
  );
}
