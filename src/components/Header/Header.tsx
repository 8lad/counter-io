import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { setSearchRule, setIsFiltered } from "../../redux/actions";
import "./Header.scss";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export function Header(): JSX.Element {
  const [searchText, setSearchText] = useState<string>("");
  const [searchTextError, setSearchTextError] = useState<boolean>(false);
  const dispatch = useDispatch();

  const sendSarchText = (): void => {
    if (!searchText || searchText.length < 2) {
      setSearchTextError(true);
    } else {
      dispatch(setSearchRule(searchText));
      setSearchText("");
      setSearchTextError(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="header"
        position="static"
        style={{
          backgroundColor: "rgb(204 204 204 / 23%)",
          marginBottom: "30px",
          paddingTop: "5px",
          paddingBottom: "5px",
        }}>
        <Toolbar>
          <Typography
            className="especial__font"
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}>
            Your personal ToDo list
          </Typography>
          <FormControlLabel
            control={<Checkbox onChange={(e) => dispatch(setIsFiltered(e.target.checked))} />}
            label="Tag filter"
          />
          <Search className="header__search">
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              error
              placeholder={searchTextError ? "Field is empty" : "Search…"}
              inputProps={{ "aria-label": "search" }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Search>
          <Button className="header__button" variant="contained" onClick={sendSarchText}>
            Go
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
