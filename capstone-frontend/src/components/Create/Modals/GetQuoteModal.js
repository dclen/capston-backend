import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SERVER_URL from "../../../utils/constants";
import axios from "axios";
import {Grid} from "@mui/material";

const style = {
    buttonPadding: {
        padding: '30px',
    },
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function GetQuoteModal(props) {

    let prefix = props.prefix
    let firstName = props.firstName
    let lastName = props.lastName
    let telephoneNumber = props.telephoneNumber
    let addressLine1 = props.addressLine1
    let addressLine2 = props.addressLine2
    let city = props.city
    let postcode = props.postcode
    let vehicleType = props.vehicleType
    let engineSize = props.engineSize
    let additionalDrivers = props.additionalDrivers
    let usedForCommercial = props.usedForCommercial
    let usedOutsideState = props.usedOutsideState
    let currentValue = props.currentValue
    let dateRegistered = props.dateRegistered
    let finalQuoteAmount = props.finalQuoteAmount

    const saveUser = () => {

        const formData = {
            prefix,
            firstName,
            lastName,
            telephoneNumber,
            addressLine1,
            addressLine2,
            city,
            postcode,
            vehicleType,
            engineSize,
            additionalDrivers,
            usedForCommercial,
            usedOutsideState,
            currentValue,
            dateRegistered,
            finalQuoteAmount
        };
        const endpointURL =
            `${SERVER_URL}/capstone`;
        axios
            .post(endpointURL, formData)
            .then(() => props.setShowGetQuoteModal(false))
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <Modal
                open={props.showGetQuoteModal}
                onClose={() => props.setShowGetQuoteModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={8}>
                            <Typography id="modal-modal-title" variant="h4" component="h2">
                                Your Quote: £{props.finalQuoteAmount.toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent="center">

                            <Grid item >
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="success"
                                    sx={{ m: 1 }}
                                    onClick={() => saveUser()}
                                >
                                    Accept Quote
                                </Button></Grid>
                            <Grid item>
                                <Button
                                    size="large"
                                    variant="contained"
                                    color="error"
                                    sx={{ m: 1 }}
                                    onClick={() => props.setShowGetQuoteModal(false)}
                                >
                                    No Thanks
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default GetQuoteModal;