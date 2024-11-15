import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

export default function MenuAppBar() {
  return (
    <Box sx={{ padding: 8 }}>
      <AppBar
        sx={{
          backgroundColor: "#89CFF0",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "flex-start" }}>
          <img
            src="https://erino.io/wp-content/uploads/2024/07/Final-Logo.svg"
            alt="Logo"
            width="110"
            height="110"
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
