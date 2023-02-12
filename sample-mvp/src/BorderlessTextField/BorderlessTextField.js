import { TextField } from "@mui/material";

export const BorderlessTextField = ({ children, onChange, onKeyDown }) => {
  return (
    <TextField
      variant="standard"
      sx={{
        "& .MuiInputBase-root::before": { borderBottom: "none" },
        // "& .MuiInputBase-root:hover": {
        //     "& > fieldset": {
        //       borderColor: "white"
        //     }
        // },
        "& .MuiInputBase-root::after": { borderBottom: "none" },
      }}
      onChange={onChange}
      defaultValue={children}
      onKeyDown={onKeyDown}
    />
  );
};
