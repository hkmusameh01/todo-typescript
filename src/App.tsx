import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import { ITask } from "./interfaces";
import TodoTask from "./Components/TodoTask";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const element = e.target;
    if (element.name === "task") {
      setTask(element.value);
    } else {
      setDeadline(+element.value);
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline };
    setTodoList([...todoList, newTask]);

    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(todoList.filter((task) => task.taskName !== taskNameToDelete));
  };

  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="DeadLine (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map(
          (task: ITask, key: number) =>
            task.taskName && (
              <TodoTask key={key + 1} task={task} completeTask={completeTask} />
            )
        )}
      </div>
    </div>
  );
};

export default App;
