import Navbar from "./Navbar/Navbar";
import DataTable from "./DataTable/DataTable";
import { Box } from "@mui/material";
// import { ThemeProvider } from "@mui/material";
// import theme from "./theme";

const mockNavbarData = [
  { name: "Function 1" },
  { name: "Function 2" },
  { name: "Function 3" },
  { name: "Function 4" },
  { name: "Function 5" },
];

function App() {
  return (
    // <ThemeProvider theme={theme}>
    <Box display="flex">
      <Navbar data={mockNavbarData} />
      <DataTable />
    </Box>
    // </ThemeProvider>
  );
}

export default App;
