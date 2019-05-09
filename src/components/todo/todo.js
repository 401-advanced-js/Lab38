import React, { useContext, useState } from "react";

import Auth from "../auth/auth.js";

import styles from "./todo.module.scss";

const Todo = props => {
  const [item, setItem] = useState("");
  const [toDoItems, setToDoItems] = useState([]);

  const handleForm = e => {
    e.preventDefault();
    e.target.reset();
    let Item = { title: item, status: false };
    setToDoItems([...toDoItems, Item]);
  };

  const handleChange = e => {
    setItem(e.target.value);
  };

  const toggle = (e, id) => {
    e.preventDefault();
    let toDoItems = toDoItems.map((item, idx) =>
      idx === id ? { title: item.title, status: !item.status } : item
    );
    setToDoItems(toDoItems);
  };

  return (
    <section className={styles.todo}>
      <Auth capability="read">
        {toDoItems.map((item, idx) => (
          <div key={idx} onClick={e => toggle(e, idx)}>
            <span className={styles[`complete-${item.status}`]}>
              {" "}
              {item.title}{" "}
            </span>
          </div>
        ))}
      </Auth>

      <Auth capability="create">
        <form onSubmit={handleForm}>
          <input
            onChange={handleChange}
            name="item"
            placeholder="Add To Do List Item Here"
          />
        </form>
      </Auth>
    </section>
  );
};

export default Todo;
