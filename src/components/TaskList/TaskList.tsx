import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { useSelector } from "react-redux";
import { SingleListItem } from "../SingleListItem";
import "./TaskList.scss";

export function TaskList() {
  const allTasks = useSelector((state: any) => state.tasksReducer.tasks);
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    setTaskList(allTasks);
  }, [allTasks]);

  return (
    <Box className="container">
      <Box>
        <List>
          {taskList &&
            taskList.map((item: any) => (
              <SingleListItem key={item.id} text={item.text} tags={item.tags} id={item.id} />
            ))}
        </List>
      </Box>
    </Box>
  );
}
