import { useState, useEffect } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SaveIcon from "@mui/icons-material/Save";
import Input from "@mui/material/Input";
import "./SingleListItem.scss";
import Box from "@mui/material/Box";

interface SingleListItemProps {
  text: string;
  tags: string;
}

export function SingleListItem({ text, tags }: SingleListItemProps) {
  const [editableText, setEditableText] = useState(true);
  const [pinnedTask, setPinnedTask] = useState(false);

  return (
    <ListItem
      className="list__item"
      secondaryAction={
        <>
          <IconButton
            aria-label="pin"
            color={pinnedTask ? "primary" : "default"}
            onClick={() => setPinnedTask((state) => !state)}>
            <PushPinIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={() => setEditableText(false)}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="save" onClick={() => setEditableText(true)}>
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </>
      }>
      <ListItemAvatar>
        <Avatar variant="rounded">
          <AssignmentIcon color={pinnedTask ? "primary" : undefined} />
        </Avatar>
      </ListItemAvatar>
      <Box className="list__item-inputs">
        <Input className="list__item-input" multiline disabled={editableText} defaultValue={text} fullWidth />
        <Input className="list__item-input" multiline disabled={editableText} defaultValue={tags} fullWidth />
      </Box>
    </ListItem>
  );
}
