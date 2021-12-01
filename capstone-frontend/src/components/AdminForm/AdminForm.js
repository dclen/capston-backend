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

function AdminForm() {
    const [driverId, setDriverId] = useState(null);
    const [driverDetails, setDriverDetails] = useState([]);
    const [isDriverShown, setIsDriverShown] = useState(false);
    const [isDriverIdFound, setIsDriverIdFound]= useState(false)
    const [driverIdDelete, setDriverIdDelete] = useState("");
    const [driverIdUpdate, setDriverIdUpdate] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");

    function getDriverDetailsFromAPI(driverId) {
        const endpointURL = `http://localhost:8080/capstone/${driverId}`;
        axios
            .get(endpointURL)
            .then((response) => {
                    if (response.data != null) {
                        setDriverDetails(response.data)
                        setIsDriverIdFound(true)
                    }else{
                        setIsDriverShown(true)
                        setIsDriverIdFound(false);
                    }
                }
            )
            .catch(() => {
            }
            );
    }


    function onDelete(id) {
        const endpointURL = `https://6151d1834a5f22001701d461.mockapi.io/api/v1/people/${id}`;
        axios
            .delete(endpointURL)
            .then(alert(`Driver ${id} Deleted`))
            .then(setDriverIdDelete(""))
            .catch((err) => {
                console.log(err);
            });
    }

    function onUpdate(id, phone) {
        const endpointURL = `https://6151d1834a5f22001701d461.mockapi.io/api/v1/people/${id}`;
        axios
            .put(endpointURL, {telephoneNumber: phone})
            .then(alert(`Driver ${id} Phone Updated to ${telephoneNumber}`))
            .then(setDriverIdUpdate(""))
            .then(setTelephoneNumber(""))
            .catch((err) => {
                console.log(err);
            });
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
                            <Grid container justifyContent="center" >
                        <Typography variant="h4" component="h1" >
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
                            <Grid item xs={4} container direction="column" justifyContent="center" >
                                <Button
                                    size="large"
                                    variant="contained"
                                    onClick={() => getDriverDetailsFromAPI(driverId)}
                                >
                                    Find Driver
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                {isDriverIdFound && (<Card sx={{minWidth: 275}}>
                    <CardContent>
                            <DisplayDriver driverDetails={driverDetails}/>
                    </CardContent>
                </Card>)}
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
