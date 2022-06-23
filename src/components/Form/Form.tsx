import { ListItemText } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TextField from "@mui/material/TextField";
import "./Form.scss";

export function Form() {
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
          />
        </Box>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button>Add task</Button>
          <Button>Add tag</Button>
          <Button>Save</Button>
          <Button>Delete</Button>
        </ButtonGroup>
        {/* <Box className="form__example">
          <ListItemText primary="Single-line item" secondary="#main #test #view" />
        </Box> */}
      </Box>
    </Box>
  );
}
