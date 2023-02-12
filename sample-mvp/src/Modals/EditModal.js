import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { BorderlessTextField } from "../BorderlessTextField/BorderlessTextField";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";

export const EditModal = ({
  open,
  data,
  handleChange,
  setOpenEditModal,
  handleSave,
  setSelectedEmployee,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpenEditModal(false);
        setSelectedEmployee({
          id: null,
          name: null,
          login: null,
          salary: null,
        });
      }}
    >
      <DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpenEditModal(false);
            setSelectedEmployee({
              id: null,
              name: null,
              login: null,
              salary: null,
            });
          }}
          sx={{
            position: "absolute",
            left: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Box display="flex" justifyContent="center" minWidth="300px">
          Edit Employee
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box paddingBottom="20px">
          <Typography data-testid="id-typography">
            Employee Id {data.id}
          </Typography>
        </Box>
        <Box
          border="1px solid"
          borderColor={theme.palette.grey[900]}
          borderRadius="5px 5px 0 0"
          paddingX="30px"
        >
          <Typography fontSize="10px">Name</Typography>
          <BorderlessTextField
            onChange={(e) => handleChange(e.target.value, "name")}
          >
            {data.name}
          </BorderlessTextField>
        </Box>
        <Box
          border="1px solid"
          borderColor={theme.palette.grey[900]}
          paddingX="30px"
        >
          <Typography fontSize="10px">Login</Typography>
          <BorderlessTextField
            onChange={(e) => handleChange(e.target.value, "login")}
          >
            {data.login}
          </BorderlessTextField>
        </Box>
        <Box
          border="1px solid"
          borderColor={theme.palette.grey[900]}
          borderRadius="0 0 5px 5px"
          paddingX="30px"
        >
          <Typography fontSize="10px">Salary</Typography>
          <BorderlessTextField
            onChange={(e) => handleChange(e.target.value, "salary")}
            onKeyDown={(e) => {
              if (
                !isNaN(parseInt(e.key, 10)) ||
                e.key === "Backspace" ||
                e.key === "Delete" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight"
              ) {
                return true;
              } else {
                e.preventDefault();
              }
            }}
          >
            {data.salary}
          </BorderlessTextField>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Box width="300px">
          <Button
            onClick={() => {
              handleSave();
            }}
            variant="contained"
            fullWidth
            data-testid="edit-modal-save-btn"
          >
            Save
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
