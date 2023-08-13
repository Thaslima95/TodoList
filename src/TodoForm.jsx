import React from "react";
import { useState, useEffect } from "react";
import TodoTask from "./TodoTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditTodoForm from "./EditTodoForm";
const TodoForm = () => {
  const [todotext, setText] = useState({
    task: "",
    status: true,
    editing: false,
    datetime: new Date(),
  });
  const [data, setData] = useState([]);
  const [localdata, setLocalData] = useState([]);
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setLocalData(savedTodos);
  }, [data]);
  useEffect(() => {
    fetchList();
  }, []);
  const fetchList = () => {
    fetch("https://64d461f2b592423e469410ba.mockapi.io/api/v1/todo")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setData(json);
        localStorage.setItem("todos", JSON.stringify(json));
      })
      .catch((error) => console.error(error));
  };
  const handleEdit = (id) => {
    setLocalData(
      localdata.map((e) => (e.id == id ? { ...e, editing: !e.editing } : e))
    );
  };
  const editTask = (value, id) => {
    // console.log(value + "value");
    // console.log(todotext);
    // setText({ ...todotext, task: value });
    // console.log(todotext);
    // console.log(todotext);

    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...todotext, task: value }),
    };
    fetch(
      `https://64d461f2b592423e469410ba.mockapi.io/api/v1/todo/${id}`,
      request
    )
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const newdata = [...data, json];
        console.log(newdata);
        setData(newdata);
        localStorage.setItem("todos", JSON.stringify(newdata));
        fetchList();
      })
      .catch((error) => console.error(error));
    toast("Task Updated");
  };
  const handleText = () => {
    console.log(todotext);

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todotext),
    };
    fetch(`https://64d461f2b592423e469410ba.mockapi.io/api/v1/todo/`, request)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        const newdata = [...data, json];
        console.log(newdata);
        setData(newdata);
        localStorage.setItem("todos", JSON.stringify(newdata));
      })
      .catch((error) => console.error(error));
    toast("Task Added");
  };
  return (
    <div className="TodoWrapper">
      <div>
        <input
          className="inputAdd"
          onChange={(e) => setText({ ...todotext, task: e.target.value })}
        />
        <button onClick={handleText}>AddTask</button>
      </div>
      <br />
      <br />
      <div>
        {localdata.map((e, idx) =>
          e.editing ? (
            <EditTodoForm task={e} editTask={editTask} />
          ) : (
            <TodoTask
              data={e}
              fetchList={fetchList}
              handleEdit={handleEdit}
              key={idx}
            />
          )
        )}
        {/* {data.map((e, id) =>
          e.editing ? (
            <EditTodoForm />
          ) : (
            <TodoTask data={e} fetchList={fetchList} edit={isEditing} />
          )
        )} */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TodoForm;
