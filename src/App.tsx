import { Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple, green } from "@mui/material/colors";
import FormPage from "./components/FormPage";
import NextPage from "./components/NextPage";

const theme = createTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/nextpage" element={<NextPage />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
