import React from "react";
import { useState } from "react";

function EditTodoForm({ task, editTask }) {
  const [value, setValue] = useState(task.task);

  const handleUpdate = (e) => {
    // console.log(editTask);

    e.preventDefault();
    editTask(value, task.id);
  };
  return (
    <div className="TodotextWrapper">
      <div>
        <input
          type="text"
          className="inputtext"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={(e) => handleUpdate(e)}>Update Task</button>
      </div>
    </div>
  );
}

export default EditTodoForm;
