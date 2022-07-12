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
import {
  deleteSingleTaskWithDB,
  updateSingleTaskWithDB,
  setPinTaskWithDB,
  disablePinTaskWithDB,
} from "../../redux/actions";
import { addingHashTag } from "../../helpers/helpers";
import { StateType } from "../../redux/rootReducer";

interface SingleListItemProps {
  text: string;
  tags: string;
  id: string;
  isPinned: boolean;
}

export function SingleListItem({ text, tags, id, isPinned }: SingleListItemProps): JSX.Element {
  const [disabledText, setDisabledText] = useState<boolean>(true);
  const [pinnedTask, setPinnedTask] = useState<boolean>(isPinned);
  const [editedText, setEditedText] = useState<string>("");
  const [editedTags, setEditedTags] = useState<string>("");
  const [editedTextError, setEditedTextError] = useState<boolean>(false);
  const [editedTagsError, setEditedTagsError] = useState<boolean>(false);
  const { tasks } = useSelector((state: StateType) => state.tasksReducer);
  const dispatch = useDispatch<any>();

  // const lostFocuseSaving = (e: FocusEvent): void => {
  //   const target = e.target as HTMLInputElement;
  //   if (target.value.length) {
  //     setEditedText(target.value);
  //     setDisabledText(true);
  //   }
  // };

  const setPin = (): void => {
    setPinnedTask((state) => !state);
    !pinnedTask ? dispatch(setPinTaskWithDB(id, tasks)) : dispatch(disablePinTaskWithDB(id, tasks));
  };

  const saveTask = (): void => {
    if (!editedText.length) {
      setEditedTextError(true);
      return;
    }
    if (!editedTags.length) {
      setEditedTagsError(true);
      return;
    }
    setDisabledText(true);
    dispatch(
      updateSingleTaskWithDB(
        {
          id,
          text: editedText,
          tags: editedTags,
          isPinned: pinnedTask,
        },
        tasks,
      ),
    );
    setEditedTextError(false);
    setEditedTagsError(false);
  };

  const editTask = (): void => {
    setDisabledText(false);
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
          <IconButton
            aria-label="delete"
            onClick={() => dispatch(deleteSingleTaskWithDB(id, tasks))}
            disabled={pinnedTask}>
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
          disabled={disabledText}
          defaultValue={editedText}
          error={editedTextError}
          fullWidth
          onBlur={(e) => {
            setEditedText(e.target.value);
          }}
        />
        <Input
          className="list__item-input"
          multiline
          disabled={disabledText}
          defaultValue={addingHashTag(editedTags)}
          error={editedTagsError}
          fullWidth
          onBlur={(e) => {
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
