import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import AdminForm from "../AdminForm/AdminForm";

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "blue" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AllState Insurance
          </Typography>
          <Link to={"/admin"}>
          <Button sx={{color:"white"}} color="inherit">Admin</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
