import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { SingleListItem } from "../SingleListItem/SingleListItem";
import { setSearchRule } from "../../redux/actions";
import { filterTasks } from "../../helpers/helpers";
import "./TaskList.scss";
import { SingleTask } from "../../redux/tasksReducer";

export function TaskList(): JSX.Element {
  const { tasks, searchField, isTagFiltered } = useSelector((state: any) => state.tasksReducer);
  const [taskList, setTaskList] = useState<[] | SingleTask[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    searchField ? setTaskList(filterTasks(searchField, tasks, isTagFiltered)) : setTaskList(tasks);
  }, [tasks, searchField, isTagFiltered]);

  return (
    <Box className="container">
      <Box>
        <List>
          {taskList &&
            taskList.map((item: any) => (
              <SingleListItem key={item.id} text={item.text} tags={item.tags} id={item.id} />
            ))}
        </List>
        {!taskList.length && searchField && (
          <Box className="task-list__message">
            <Typography className="task-list__text">Ooops! We didn`t find anything </Typography>
            <Button className="task-list__button" variant="contained" onClick={() => dispatch(setSearchRule(""))}>
              Go back
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
