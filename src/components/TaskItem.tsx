import React from "react";
import { observer } from "mobx-react-lite";
import { Task } from "../store/TaskStore";
import styles from "../styles.module.scss";

interface TaskItemProps {
  task: Task;
  onSelect: (id: number) => void;
  isSelected: boolean;
  onClick: (task: Task) => void;  // Добавим обработчик клика
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task, onSelect, isSelected, onClick }) => {
  const handleSelect = () => {
    onSelect(task.id);
  };

  const handleClick = () => {
    onClick(task);
  };

  return (
    <div className={styles.taskItem} onClick={handleClick}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleSelect}
      />
      <span>{task.text}</span>
    </div>
  );
});

export default TaskItem;
