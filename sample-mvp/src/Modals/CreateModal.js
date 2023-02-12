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

export const CreateModal = ({
  open,
  data,
  handleChange,
  setOpenCreateModal,
  handleCreate,
  setSelectedEmployee,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpenCreateModal(false);
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
            setOpenCreateModal(false);
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
          Create User
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          border="1px solid"
          borderColor={theme.palette.grey[900]}
          borderRadius="5px 5px 0 0"
          paddingX="30px"
        >
          <Typography fontSize="10px">Id</Typography>
          <BorderlessTextField
            onChange={(e) => handleChange(e.target.value, "id")}
          >
            {data.id}
          </BorderlessTextField>
        </Box>
        <Box
          border="1px solid"
          borderColor={theme.palette.grey[900]}
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
              handleCreate();
            }}
            variant="contained"
            fullWidth
            disabled={
              !(
                data.id !== "" &&
                data.name !== "" &&
                data.login !== "" &&
                data.salary !== ""
              )
            }
            data-testid="create-modal-confirm-btn"
          >
            Create
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
