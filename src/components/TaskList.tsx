import React from "react";
import { observer } from "mobx-react-lite";
import { Task, TaskStore } from "../store/TaskStore";
import TaskItem from "./TaskItem";
import styles from "../styles.module.scss";

interface TaskListProps {
  tasks: Task[];
  taskStore: TaskStore;
  onTaskClick: (task: Task) => void;  // Изменено на Task
}

const TaskList: React.FC<TaskListProps> = observer(({ tasks, taskStore, onTaskClick }) => {
  const handleSelect = (id: number) => {
    taskStore.toggleTaskSelection(id);
  };

  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <div key={task.id} className={styles.taskContainer}>
          <TaskItem
            task={task}
            onSelect={handleSelect}
            isSelected={taskStore.selectedTasks.has(task.id)}
            onClick={onTaskClick}  // Передаём обработчик клика
          />
          {task.subTasks.length > 0 && (
            <div className={styles.subTasks}>
              <TaskList tasks={task.subTasks} taskStore={taskStore} onTaskClick={onTaskClick} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default TaskList;
