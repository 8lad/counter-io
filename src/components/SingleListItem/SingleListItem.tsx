import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchUpdateSingleTask, fetchDeleteSingleTask, fetchPinTask } from "../../redux/tasksSlice";
import { addingHashTag } from "../../helpers/helpers";
import { AppDispatch, RootState } from "../../redux/store";

interface SingleListItemProps {
  text: string;
  tags: string;
  id: string;
  isPinned: boolean;
}

export function SingleListItem({ text, tags, id, isPinned }: SingleListItemProps) {
  const [isDisabledText, setIsDisabledText] = useState<boolean>(true);
  const [isPinnedTask, setIsPinnedTask] = useState<boolean>(isPinned);
  const [editedText, setEditedText] = useState<string>("");
  const [editedTags, setEditedTags] = useState<string>("");
  const [isEditedTextError, setIsEditedTextError] = useState<boolean>(false);
  const [isEditedTagsError, setIsEditedTagsError] = useState<boolean>(false);
  const { tasks } = useSelector((state: RootState) => state.tasksReducer);
  const dispatch = useDispatch<AppDispatch>();

  const setPin = (): void => {
    setIsPinnedTask((state) => !state);
    dispatch(
      fetchPinTask({
        option: {
          id,
          text: editedText,
          tags: editedTags,
          isPinned: !isPinnedTask,
        },
        payload: tasks,
      }),
    );
  };

  const saveTask = (): void => {
    if (!editedText.length) {
      setIsEditedTextError(true);
      return;
    }
    if (!editedTags.length) {
      setIsEditedTagsError(true);
      return;
    }
    setIsDisabledText(true);
    dispatch(
      fetchUpdateSingleTask({
        option: {
          id,
          text: editedText,
          tags: editedTags,
          isPinned: isPinnedTask,
        },
        payload: tasks,
      }),
    );
    setIsEditedTextError(false);
    setIsEditedTagsError(false);
  };

  const editTask = (): void => {
    setIsDisabledText(false);
    setIsEditedTagsError(false);
    setIsEditedTextError(false);
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
          <IconButton aria-label="pin" color={isPinnedTask ? "primary" : "default"} onClick={setPin}>
            <PushPinIcon />
          </IconButton>
          <IconButton aria-label="edit" onClick={editTask}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="save" onClick={saveTask}>
            <SaveIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(fetchDeleteSingleTask({ option: id, payload: tasks }))}
            disabled={isPinnedTask}>
            <DeleteIcon />
          </IconButton>
        </>
      }>
      <ListItemAvatar>
        <Avatar variant="rounded">
          <AssignmentIcon color={isPinnedTask ? "primary" : undefined} />
        </Avatar>
      </ListItemAvatar>
      <Box className="list__item-inputs">
        <Input
          className="list__item-input"
          multiline
          disabled={isDisabledText}
          defaultValue={editedText}
          error={isEditedTextError}
          fullWidth
          onBlur={(e) => {
            setEditedText(e.target.value);
          }}
        />
        <Input
          className="list__item-input"
          multiline
          disabled={isDisabledText}
          defaultValue={addingHashTag(editedTags)}
          error={isEditedTagsError}
          fullWidth
          onBlur={(e) => {
            setEditedTags(e.target.value);
          }}
        />
        {(isEditedTextError || isEditedTagsError) && (
          <Typography className="list__item-error">Both field must be filled</Typography>
        )}
      </Box>
    </ListItem>
  );
}
