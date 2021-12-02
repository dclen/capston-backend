import * as React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function UpdateDriver(props) {

    const [telephoneNumber, setTelephoneNumber] = useState(props.driverDetails.telephoneNumber);

    function onUpdate(driverId) {
        const endpointURL = `http://localhost:8080/capstone/updatephone/${driverId}`;
        axios
            .put(endpointURL, {telephoneNumber: telephoneNumber})
            .then(() => props.getDriverDetailsFromAPI(props.driverId))
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <Grid container spacing={2} justifyContent="center">
            <Grid item xs={4}>
                <TextField
                    required
                    fullWidth
                    id="telephoneNumber"
                    label="Telephone Number"
                    name="telephoneNumber"
                    placeholder="Telephone Number"
                    value={telephoneNumber}
                    // error={errors.telephoneNumberError}
                    // helperText={errors.telephoneNumberError}
                    onChange={(e) => setTelephoneNumber(e.target.value)}
                />
            </Grid>
            <Grid item container xs={3}>
                <Button
                    color="success"
                    size="large"
                    variant="contained"
                    onClick={() => onUpdate(props.driverId)}
                >
                    Update Phone
                </Button>
            </Grid>
        </Grid>

    )

}

export default UpdateDriver;
