import React from "react";
import styled from "styled-components";
import { NotepadEdit } from "@styled-icons/fluentui-system-filled/NotepadEdit";
import { Delete } from "@styled-icons/fluentui-system-filled/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoTask({ data, fetchList, handleEdit }) {
  const handledelete = (id) => {
    const request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(
      `https://64d461f2b592423e469410ba.mockapi.io/api/v1/todo/${id}`,
      request
    )
      .then((res) => res.json())
      .then((json) => {
        fetchList();
        toast("Task Deleted");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="Todo">
      <p>
        {data.task} <span>{data.datetime}</span>
      </p>
      <div>
        <NotepadEdit size="25" onClick={() => handleEdit(data.id)} />
        <Delete size="25" onClick={() => handledelete(data.id)} />
        <ToastContainer />
      </div>
    </div>
  );
}

export default TodoTask;
