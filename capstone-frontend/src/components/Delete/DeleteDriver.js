import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";

function DeleteDriver(props) {

    function onDelete(driverId) {
        const endpointURL = `http://localhost:8080/capstone/${driverId}`;
        axios
            .delete(endpointURL)
            .then(() => props.getDriverDetailsFromAPI(props.driverId))
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Grid container spacing={3}>
            <Grid item container justifyContent="center">
                <Button
                    color="error"
                    size="large"
                    variant="contained"
                    onClick={() => onDelete(props.driverId)}
                >
                    Delete Driver
                </Button>
            </Grid>
        </Grid>

    )

}

export default DeleteDriver;
