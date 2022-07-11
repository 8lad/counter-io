import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SpinnerDotted } from "spinners-react";
import { useSelector, useDispatch } from "react-redux";
import { SingleListItem } from "../SingleListItem/SingleListItem";
import { setSearchRule, loadAllTasks } from "../../redux/actions";
import { filterTasks, setData } from "../../helpers/helpers";
import "./TaskList.scss";
import { SingleTask } from "../../redux/tasksReducer";

export function TaskList(): JSX.Element {
  const { tasks, searchField, isTagFiltered, errorMessage, isLoading } = useSelector(
    (state: any) => state.tasksReducer,
  );
  const [taskList, setTaskList] = useState<[] | SingleTask[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    loadAllTasks(dispatch);
  }, [dispatch]);

  useEffect(() => {
    setData("baseData", tasks);
  }, [tasks]);

  useEffect(() => {
    searchField ? setTaskList(filterTasks(searchField, tasks, isTagFiltered)) : setTaskList(tasks);
  }, [tasks, searchField, isTagFiltered]);
  return (
    <Box className="container">
      <Box>
        {!taskList.length && !errorMessage && (
          <Typography variant="h5" className="task__title">
            You don`t have any task yet. Let`s create new one! 😃
          </Typography>
        )}
        {isLoading && !errorMessage && <SpinnerDotted color="#1976d2" />}
        {errorMessage && (
          <Box>
            <Typography variant="h5" className="task__title">
              Unfortunately we have some problem 😱 {errorMessage}. Please, try again later or just refresh the page
            </Typography>
            <Button className="task-list__button" variant="contained" onClick={() => window.location.reload()}>
              Refresh page
            </Button>
          </Box>
        )}
        <List>
          {taskList &&
            taskList.map((item: any) => (
              <SingleListItem key={item.id} text={item.text} tags={item.tags} id={item.id} isPinned={item.isPinned} />
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
