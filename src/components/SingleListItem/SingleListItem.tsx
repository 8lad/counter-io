import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { deleteSingleTask, setPinTask, updateSingleTask, disablePinTask } from "../../redux/actions";
import { addingHashTag } from "../../helpers/helpers";

interface SingleListItemProps {
  text: string;
  tags: string;
  id: string;
}

export function SingleListItem({ text, tags, id }: SingleListItemProps) {
  const [editableText, setEditableText] = useState<boolean>(true);
  const [pinnedTask, setPinnedTask] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>("");
  const [editedTags, setEditedTags] = useState<string>("");
  const [editedTextError, setEditedTextError] = useState<boolean>(false);
  const [editedTagsError, setEditedTagsError] = useState<boolean>(false);

  const dispatch = useDispatch();

  const setPin = () => {
    setPinnedTask((state) => !state);
    !pinnedTask ? dispatch(setPinTask(id)) : dispatch(disablePinTask(id));
  };

  const saveTask = () => {
    if (!editedText) {
      setEditedTextError(true);
      return;
    }
    if (!editedTags) {
      setEditedTagsError(true);
    } else {
      setEditableText(true);
      dispatch(
        updateSingleTask({
          id,
          text: editedText,
          tags: editedTags,
        }),
      );
      setEditedTagsError(false);
      setEditedTextError(false);
    }
  };

  const editTask = () => {
    setEditableText(false);
    setEditedTagsError(false);
    setEditedTextError(false);
  };

  useEffect(() => {
    setEditedText(text);
    setEditedTags(tags);
  }, [text, tags]);

  return (
    <ListItem
      className="list__item"
      secondaryAction={
        <>
          <IconButton aria-label="pin" color={pinnedTask ? "primary" : "default"} onClick={setPin}>
            <PushPinIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={editTask}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="save" onClick={saveTask}>
            <SaveIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={() => dispatch(deleteSingleTask(id))} disabled={pinnedTask}>
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
        <Input
          className="list__item-input"
          multiline
          disabled={editableText}
          defaultValue={editedText}
          error={editedTextError}
          fullWidth
          onChange={(e) => {
            setEditedText(e.target.value);
          }}
        />
        <Input
          className="list__item-input"
          multiline
          disabled={editableText}
          defaultValue={addingHashTag(editedTags)}
          error={editedTagsError}
          fullWidth
          onChange={(e) => {
            setEditedTags(e.target.value);
          }}
        />
        {(editedTextError || editedTagsError) && (
          <Typography className="list__item-error">Both field must be filled</Typography>
        )}
      </Box>
    </ListItem>
  );
}
