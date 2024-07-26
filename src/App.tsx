import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Task, taskStore } from "./store/TaskStore";
import TaskList from "./components/TaskList";
import styles from "./styles.module.scss";

const App: React.FC = observer(() => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState("");
  const [subTaskInput, setSubTaskInput] = useState("");
  const [parentTaskId, setParentTaskId] = useState<number | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task.text);
    setParentTaskId(task.id);
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      taskStore.addTask(taskInput);
      setTaskInput("");
    }
  };

  const handleAddSubTask = () => {
    if (subTaskInput.trim() !== "" && parentTaskId !== null) {
      taskStore.addSubTask(parentTaskId, subTaskInput);
      setSubTaskInput("");
    }
  };

  return (
    <div className={styles.app}>
      <div className={styles.taskArea}>
        <div>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Новая задача"
          />
          <button onClick={handleAddTask}>Добавить задачу</button>
        </div>
        {parentTaskId !== null && (
          <div>
            <input
              type="text"
              value={subTaskInput}
              onChange={(e) => setSubTaskInput(e.target.value)}
              placeholder="Подзадача для выбранной задачи"
            />
            <button onClick={handleAddSubTask}>Добавить подзадачу</button>
          </div>
        )}
        <button onClick={() => taskStore.removeSelectedTasks()}>Удалить выделенные задачи</button>
        <TaskList
          tasks={taskStore.tasks}
          taskStore={taskStore}
          onTaskClick={handleTaskClick}
        />
      </div>
      <div className={styles.detailsArea}>
        {selectedTask && <p>{selectedTask}</p>}
      </div>
    </div>
  );
});

export default App;
