import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SpinnerDotted } from "spinners-react";
import { useSelector, useDispatch } from "react-redux";
import { SingleListItem } from "../SingleListItem/SingleListItem";
import { setSearchRule, loadAllTasks } from "../../redux/actions";
import { filterTasks } from "../../helpers/helpers";
import "./TaskList.scss";
import { SingleTask } from "../../redux/tasksReducer";
import { StateType } from "../../redux/rootReducer";

export function TaskList(): JSX.Element {
  const { tasks, searchField, isTagFiltered, errorMessage, isLoading } = useSelector(
    (state: StateType) => state.tasksReducer,
  );
  const [taskList, setTaskList] = useState<[] | SingleTask[]>([]);
  const dispatch = useDispatch<any>();
  const isHasTasks = !taskList.length && !errorMessage && !searchField && !isLoading;
  const isEmptySearch = !taskList.length && searchField;

  useEffect(() => {
    dispatch(loadAllTasks());
  }, [dispatch]);

  useEffect(() => {
    searchField ? setTaskList(filterTasks(searchField, tasks, isTagFiltered)) : setTaskList(tasks);
  }, [tasks, searchField, isTagFiltered]);
  return (
    <Box className="container">
      <Box>
        {isHasTasks && (
          <Typography variant="h5" className="task__title">
            You don`t have any task yet. Let`s create new one! 😃
          </Typography>
        )}
        {isLoading && !errorMessage && <SpinnerDotted color="#1976d2" className="task__spinner" />}
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
            taskList.map((item: SingleTask) => (
              <SingleListItem key={item.id} text={item.text} tags={item.tags} id={item.id} isPinned={item.isPinned} />
            ))}
        </List>
        {isEmptySearch && (
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
