import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor: "blue" }}>
          <Grid
              container
              direction="column"
              alignItems="flex-start"
          >
          <Link  to={"/"}>
          <Typography variant="h6" component="div" sx={{ color: "white"}}>
            AllState Insurance
          </Typography>
      </Link>
          </Grid>
          <Grid
              container
              direction="column-reverse"
              alignItems="flex-end"
          >
          <Link to={"/admin"}>
          <Button sx={{ flexGrow: 1, color:"white", alignContent:"right"}} color="inherit">Admin</Button>
          </Link>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
