import * as React from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SERVER_URL from "../../utils/constants";

function DeleteDriver(props) {

    function onDelete(driverId) {
        const endpointURL = `${SERVER_URL}/capstone/${driverId}`;
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
