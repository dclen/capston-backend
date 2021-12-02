import * as React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import {useState, useEffect, useRef} from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import SERVER_URL from "../../utils/constants";

function UpdateDriver(props) {

    const [telephoneNumber, setTelephoneNumber] = useState(props.driverDetails.telephoneNumber);

    const [telephoneNumberError, setTelephoneNumberError] = useState("");

    const firstRender = useRef(true)

    function displayTelephoneNumberErrors() {
        const telephoneNumberRegex = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/
        if (!telephoneNumber) {
            setTelephoneNumberError("Telephone Number Required")
            return true;
        } else if (!telephoneNumberRegex.test(telephoneNumber)) {
            setTelephoneNumberError("Enter Valid Phone Number")
            return true;
        } else{
            setTelephoneNumberError("")
            return false
        }
    }

    useEffect(
        () => {
            if (firstRender.current) {
                firstRender.current = false
                return
            }
            displayTelephoneNumberErrors();
        }, [telephoneNumber])

    const onUpdate = async (driverId) => {

        let telephoneNumberError = await displayTelephoneNumberErrors();

        if (!telephoneNumberError) {

        const endpointURL = `${SERVER_URL}/capstone/updatephone/${driverId}`;
        axios
            .put(endpointURL, {telephoneNumber: telephoneNumber})
            .then(() => props.getDriverDetailsFromAPI(props.driverId))
            .catch((err) => {
                console.log(err);
            });
        }
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
                    error={telephoneNumberError}
                    helperText={telephoneNumberError}
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
