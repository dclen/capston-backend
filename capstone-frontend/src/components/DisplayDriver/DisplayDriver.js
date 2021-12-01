import React from "react";
import "./DisplayDriver.css";
import axios from "axios";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";

function convertDate(date) {
    let convertedDate = new Date(date);
    let newDate = (convertedDate.toISOString().split('T')[0])
    return newDate;
}


function DisplayDriver(props) {

    return (
        <div className="DisplayDriver">
            <Box
                sx={{
                    "& .MuiTableContainer-root": {m: 2, border: 1},
                    "& .MuiTableHead-root": {t: "red"},
                    "& .MuiButton-root": {m: 1},
                    "& .MuiTypography": {m: 1, justifyContent: "center"}
                }}
            >

                <Grid container justifyContent="center">

                    <Typography variant="h4" component="h1">
                        {props.driverDetails.prefix} {props.driverDetails.firstName} {props.driverDetails.lastName}
                    </Typography>
                </Grid>
                <Grid container spacing={2}>
                    <TableContainer component={Paper}>
                        <Table aria-label="driver table">
                            <TableHead>
                                <TableRow className="tableTitle">
                                    <TableCell align="center">ID</TableCell>
                                    <TableCell align="center">Address</TableCell>
                                    <TableCell align="center">Phone</TableCell>
                                    <TableCell align="center">Vehicle</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={props.driverDetails.id}>
                                    <TableCell align="center">{props.driverDetails.id}</TableCell>
                                    <TableCell
                                        align="center">{props.driverDetails.addressLine1}, {props.driverDetails.addressLine2}, {props.driverDetails.city}, {props.driverDetails.postcode}  </TableCell>
                                    <TableCell align="center">{props.driverDetails.telephoneNumber}</TableCell>
                                    <TableCell
                                        align="center">{props.driverDetails.vehicleType}, {props.driverDetails.engineSize}cc,
                                        £{props.driverDetails.currentValue}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Grid container justifyContent="center">
                        <Typography variant="h6" component="h2">
                            Policy Details
                        </Typography>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table aria-label="policy table">
                            <TableHead>
                                <TableRow className="tableTitle">
                                    <TableCell align="center">Additional Drivers</TableCell>
                                    <TableCell align="center">Commercial Use</TableCell>
                                    <TableCell align="center">Used Outside State</TableCell>
                                    <TableCell align="center">First Registered</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={props.driverDetails.id}>
                                    <TableCell
                                        align="center">{props.driverDetails.additionalDrivers} </TableCell>
                                    <TableCell
                                        align="center">{props.driverDetails.usedForCommercial ? "Yes" : "No"}</TableCell>
                                    <TableCell
                                        align="center">{props.driverDetails.usedOutsideState ? "Yes" : "No"}</TableCell>
                                    <TableCell
                                        align="center">{convertDate(props.driverDetails.dateRegistered)}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Box>
        </div>


    );
}

export default DisplayDriver;
