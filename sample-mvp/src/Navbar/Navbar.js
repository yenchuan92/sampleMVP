import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
// import { useTheme } from "@emotion/react";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

// styled components from MUI 5
const NavbarWrapper = styled("Box")({
  background: "#909090",
  color: "#fff",
  width: "25%",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "fixed",
  left: 0,
  top: 0,
});

const Navbar = ({ data }) => {
  return (
    <NavbarWrapper>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
          alt=""
          src=""
          sx={{ margin: "20px", width: "60px", height: "60px" }}
        />
        <Typography sx={{ marginBottom: "100px" }}>Long user name</Typography>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="250px"
      >
        {data &&
          data.map((item) => {
            return (
              <IconButton sx={{ color: "#fff" }} data-testid={item.name}>
                <ImageOutlinedIcon />
                <Typography sx={{ paddingLeft: "10px" }}>
                  {item.name}
                </Typography>
              </IconButton>
            );
          })}
      </Box>
    </NavbarWrapper>
  );
};

export default Navbar;
