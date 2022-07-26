import { useState } from "react";
import { ListItemText } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "nanoid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import { fetchAddSingleTask } from "../../redux/tasksSlice";
import "./Form.scss";
import { addingHashTag } from "../../helpers/helpers";
import { StateType } from "../../redux/rootReducer";
import { AppDispatch } from "../../redux/store";

export function Form() {
  const [textValue, setTextValue] = useState<string>("");
  const [singleTaskText, setSingleTaskText] = useState<string>("");
  const [tagText, setTagText] = useState<string>("");
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const [inputErrorText, setInputErrorText] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { tasks } = useSelector((state: StateType) => state.tasksReducer);

  const saveSingleTask = (): void => {
    if (tagText && singleTaskText) {
      dispatch(
        fetchAddSingleTask({
          option: { id: nanoid(), tags: tagText, text: singleTaskText, isPinned: false },
          payload: tasks,
        }),
      );

      setSingleTaskText("");
      setTagText("");
      setTextValue("");
      setIsInputError(false);
    } else {
      setIsInputError(true);
      setInputErrorText("You must set task and tags");
    }
  };

  const deleteTask = (): void => {
    setSingleTaskText("");
    setTagText("");
    setTextValue("");
    setIsInputError(false);
  };

  const addTextInTask = (func: (prop: string) => void) => {
    if (textValue.length < 2) {
      setIsInputError(true);
      setInputErrorText("Text must containe at least 2 symbols");
    } else {
      func(textValue);
      setTextValue("");
      setIsInputError(false);
    }
  };

  return (
    <Box className="container">
      <Box className="form__inner">
        <Box className="form__input">
          <TextField
            id="outlined-basic"
            fullWidth
            margin="dense"
            size="small"
            label="Put your task or tag"
            variant="outlined"
            value={textValue}
            error={isInputError}
            helperText={isInputError && inputErrorText}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={() => setIsInputError(false)}
          />
        </Box>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => addTextInTask(setSingleTaskText)}>Add task</Button>
          <Button onClick={() => addTextInTask(setTagText)}>Add tag</Button>
          <Button onClick={saveSingleTask}>Save</Button>
          <Button onClick={deleteTask}>Delete</Button>
        </ButtonGroup>
        <Box className="form__example">
          <ListItemText primary={singleTaskText} secondary={addingHashTag(tagText)} />
        </Box>
      </Box>
    </Box>
  );
}
