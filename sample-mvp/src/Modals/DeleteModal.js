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
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material";

export const DeleteModal = ({
  open,
  data,
  setOpenDeleteModal,
  handleDelete,
  setSelectedEmployee,
}) => {
  const theme = useTheme();
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpenDeleteModal(false);
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
            setOpenDeleteModal(false);
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
          Delete User
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box paddingBottom="20px">
          <Typography data-testid="delete-modal-confirm-typography">
            Are you sure you want to delete this user {data.id} ?
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Box width="300px">
          <Button
            onClick={() => {
              handleDelete();
            }}
            variant="contained"
            fullWidth
            color="warning"
            data-testid="delete-modal-delete-btn"
          >
            Delete
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
