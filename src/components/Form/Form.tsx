import { useState } from "react";
import { ListItemText } from "@mui/material";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import { addSingleTask } from "../../redux/actions";
import "./Form.scss";
import { addingHashTag } from "../../helpers/helpers";

export function Form() {
  const [textValue, setTextValue] = useState("");
  const [singleTaskText, setSingleTaskText] = useState("");
  const [tagText, setTagText] = useState("");
  const [inputError, setInputError] = useState(false);
  const [inputErrorText, setInputErrorText] = useState("");
  const dispatch = useDispatch();

  const saveSingleTask = () => {
    if (tagText && singleTaskText) {
      dispatch(addSingleTask({ id: nanoid(), tags: tagText, text: singleTaskText }));
      setSingleTaskText("");
      setTagText("");
      setTextValue("");
      setInputError(false);
    } else {
      setInputError(true);
      setInputErrorText("You must set task and tags");
    }
  };

  const deleteTask = () => {
    setSingleTaskText("");
    setTagText("");
    setTextValue("");
    setInputError(false);
  };

  const addTextInTask = (func: (prop: string) => void) => {
    if (textValue.length < 2) {
      setInputError(true);
      setInputErrorText("Text must containe at least 2 symbols");
    } else {
      func(textValue);
      setTextValue("");
      setInputError(false);
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
            error={inputError}
            helperText={inputError && inputErrorText}
            onChange={(e) => setTextValue(e.target.value)}
            onBlur={() => setInputError(false)}
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
