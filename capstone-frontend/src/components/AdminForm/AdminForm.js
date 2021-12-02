import React, {useState, useEffect, useRef} from "react";
import "./AdminForm.css";
import Button from "@mui/material/Button";
import DisplayDriver from "../DisplayDriver/DisplayDriver";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Typography} from "@mui/material";
import UpdateDriver from "../Update/UpdateDriver";
import DeleteDriver from "../Delete/DeleteDriver";
import SERVER_URL from "../../utils/constants";

function AdminForm() {
    const [driverId, setDriverId] = useState("");
    const [driverDetails, setDriverDetails] = useState([]);
    const [isDriverShown, setIsDriverShown] = useState(false);
    const [isDriverIdFound, setIsDriverIdFound] = useState(false)

    const [driverIdError, setDriverIdError] = useState("")

    const firstRender = useRef(true)

    function displayDriverErrors() {
        const driverIdRegex = /([1-9]|[1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])/
        if (!driverId) {
            setDriverIdError("Driver ID Required")
            return true;
        } else if (!driverIdRegex.test(driverId)) {
            setDriverIdError("Must be number 1-9999")
            return true;
        } else{
            setDriverIdError("")
            return false
        }
    }


    useEffect(
        () => {
            if (firstRender.current) {
                firstRender.current = false
                return
            }
            displayDriverErrors();
        }, [driverId])


    const getDriverDetailsFromAPI = async (driverId) => {

        let driverIdError = await displayDriverErrors();

        if (!driverIdError) {
            const endpointURL = `${SERVER_URL}/capstone/${driverId}`;
            axios
                .get(endpointURL)
                .then((response) => {
                        if (response.status === 200) {
                            setDriverDetails(response.data)
                            setIsDriverIdFound(true)
                        }
                    }
                )
                .catch(() => {
                        console.log("here")
                        setIsDriverShown(true)
                        setIsDriverIdFound(false);
                    }
                );
        }
    }

    return (
        <div className="admin">
            <Box
                component="form"
                noValidate
                autoComplete="off"
                sx={{
                    justifyContent: "center",
                    "& .MuiTextField-root": {m: 1},
                    "& .MuiButton-root": {m: 1},
                    "& .MuiCard-root": {mb: 2},
                    "& .MuiTypography-root": {m: 1, justifyContent: "center"}
                }}
            >
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Grid container justifyContent="center">
                            <Typography variant="h4" component="h1">
                                Please Enter Driver ID
                            </Typography>
                        </Grid>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={3}>
                                <TextField
                                    required
                                    fullWidth
                                    id="driverId"
                                    label="Driver ID"
                                    placeholder="Driver ID"
                                    error={driverIdError}
                                    helperText={driverIdError}
                                    onBlur={()=>setIsDriverIdFound(false)}
                                    onChange={(e) => setDriverId(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={2} container >
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={() => getDriverDetailsFromAPI(driverId)}
                                >
                                    Find
                                </Button>

                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                {isDriverIdFound && (
                    <Card sx={{minWidth: 275}}>
                        <CardContent>
                            <DisplayDriver driverDetails={driverDetails}/>
                            <UpdateDriver driverDetails={driverDetails}
                                          driverId={driverId}
                                          getDriverDetailsFromAPI={()=>getDriverDetailsFromAPI(driverId)}
                            />
                            <DeleteDriver
                                          driverId={driverId}
                                          getDriverDetailsFromAPI={()=>getDriverDetailsFromAPI(driverId)}
                            />

                        </CardContent>
                    </Card>
                )}
                {!isDriverIdFound && isDriverShown && (<Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Typography variant="h4" component="h1" color="red">
                            Driver Not Found
                        </Typography>

                    </CardContent>
                </Card>)}
            </Box>
        </div>
    );
}

export default AdminForm;
