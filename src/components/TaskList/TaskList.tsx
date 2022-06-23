import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import "./TaskList.scss";

export function TaskList() {
  return (
    <Box className="container">
      <Box>
        <List>
          <ListItem
            className="list__item"
            secondaryAction={
              <>
                <IconButton aria-label="pin">
                  <PushPinIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }>
            <ListItemAvatar>
              <Avatar>
                <AssignmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Single-line item" secondary="#main #test #view" />
          </ListItem>
          <ListItem
            className="list__item"
            secondaryAction={
              <>
                <IconButton aria-label="pin">
                  <PushPinIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }>
            <ListItemAvatar>
              <Avatar>
                <AssignmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Single-line item" secondary="#main #test #view" />
          </ListItem>
          <ListItem
            className="list__item"
            secondaryAction={
              <>
                <IconButton aria-label="pin">
                  <PushPinIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }>
            <ListItemAvatar>
              <Avatar>
                <AssignmentIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Single-line item" secondary="#main #test #view" />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
}
