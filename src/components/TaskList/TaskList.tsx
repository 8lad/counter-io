/* eslint-disable no-irregular-whitespace */
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { SingleListItem } from "../SingleListItem";
import "./TaskList.scss";

export function TaskList() {
  return (
    <Box className="container">
      <Box>
        <List>
          <SingleListItem text="Single-line item" tags="#main #test #view" />
          <SingleListItem text="Single-line item" tags="#main #test #view" />
          <SingleListItem text="Single-line item" tags="#main #test #view" />
        </List>
      </Box>
    </Box>
  );
}

// "SingleListItem" невозможно использовать как компонент JSX.
// eslint-disable-next-line no-irregular-whitespace
//   Тип возвращаемого значения "ReactNode" не является допустимым элементом JSX.
//     Тип "undefined" не может быть назначен для типа "Element | null".
