import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
//hashrouter from github pages
import { HashRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Provider from "./providers/MainProvider";
import DataProvider from "./providers/DataProvider";

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider>
        <DataProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </StyledEngineProvider>
        </DataProvider>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.querySelector("#root")
);
