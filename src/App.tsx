import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Route, Routes, useLocation } from "react-router-dom";
import { NavBar } from "./components";
import { Login, Profile, Home } from "./screens";

function App() {
  const theme = useTheme();

  const { pathname } = useLocation();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box component="div">
      <NavBar />
      <Container
        maxWidth={pathname === "/login" ? "sm" : lg ? "lg" : md ? "md" : "sm"}
        sx={{ marginTop: 4, marginBottom: 4 }}
      >
        <Routes>
          <Route element={<Home />} path="/" />

          <Route element={<Profile />} path="profile" />

          <Route element={<Login />} path="login" />

          {/* //* no match route */}
          <Route path="*" element={<h1>There's nothing here!</h1>} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
