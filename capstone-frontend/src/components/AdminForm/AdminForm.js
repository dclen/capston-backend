import React, {useState} from "react";
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

function AdminForm() {
    const [driverId, setDriverId] = useState(null);
    const [driverDetails, setDriverDetails] = useState([]);
    const [isDriverShown, setIsDriverShown] = useState(false);
    const [isDriverIdFound, setIsDriverIdFound] = useState(false)

    function getDriverDetailsFromAPI(driverId) {
        const endpointURL = `http://localhost:8080/capstone/${driverId}`;
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
