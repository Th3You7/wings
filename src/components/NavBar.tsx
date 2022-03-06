import { Toolbar, Box, Typography, AppBar, Button } from "@mui/material";
import { useContext } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { MainContext } from "../providers/MainProvider";
import { USER_ACTION } from "../utils/constants";

function NavBar(): JSX.Element {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const {
    state: { user },
    dispatch,
  } = useContext(MainContext);

  const handleLogOut = () => {
    dispatch({ type: USER_ACTION.LOG_OUT, payload: null });
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {pathname === "/"
              ? "Home"
              : pathname.replace(/^\W\w/, pathname[1].toUpperCase())}
          </Typography>

          <Button color="inherit" component={RouterLink} to="/">
            Home
          </Button>
          {!!user?.token && (
            <Button color="inherit" component={RouterLink} to="profile">
              Profile
            </Button>
          )}
          {!!user?.token ? (
            <Button color="error" variant="outlined" onClick={handleLogOut}>
              Log Out
            </Button>
          ) : (
            <Button color="inherit" component={RouterLink} to="login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
