import "./Create.css";
import React, {useState, useEffect, useRef} from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import SERVER_URL from "../../utils/constants";
import {Typography} from "@mui/material";
import GetQuoteModal from "./Modals/GetQuoteModal";

function Create() {
    const [prefix, setPrefix] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [telephoneNumber, setTelephoneNumber] = useState("");
    const [addressLine1, setAddressLine1] = useState("");
    const [addressLine2, setAddressLine2] = useState("");
    const [city, setCity] = useState("");
    const [postcode, setPostcode] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [engineSize, setEngineSize] = useState("");
    const [additionalDrivers, setAdditionalDrivers] = useState(0);
    const [usedForCommercial, setUsedForCommercial] = useState(null);
    const [usedOutsideState, setUsedOutsideState] = useState(null);
    const [currentValue, setCurrentValue] = useState(0);
    const [dateRegistered, setDateRegistered] = useState(new Date());
    const [finalQuoteAmount, setFinalQuoteAmount] = useState(0);

    const [enableButton, setEnableButton] = useState(false);
    const [showGetQuoteModal, setShowGetQuoteModal] = useState(false);

    const [errors, setErrors] = useState({
        prefixError: "",
        firstNameError: "",
        lastNameError: "",
        telephoneNumberError: "",
        addressLine1Error: "",
        cityError: "",
        postcodeError: "",
        vehicleTypeError: "",
        engineSizeError: "",
        usedForCommercialError: "",
        usedOutsideStateError: "",
        currentValueError: "",
        dateRegisteredError: ""

    });

    const firstRender = useRef({
        enableButton: true,
        prefix: true,
        firstName: true,
        lastName: true,
        telephoneNumber: true,
        addressLine1: true,
        city: true,
        postcode: true,
        vehicleType: true,
        engineSize: true,
        usedForCommercial: true,
        usedOutsideState: true,
        currentValue: true,
        dateRegistered: true
    });

    function displayPrefixErrors() {
        if (!prefix) {
            setErrors(prevState => ({...prevState, prefixError: "Prefix Required"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, prefixError: ""}))
            return false;
        }
    }

    function displayFirstNameErrors() {
        if (!firstName) {
            setErrors(prevState => ({...prevState, firstNameError: "Name Required"}))
            return true;
        } else if (firstName.length > 20) {
            setErrors(prevState => ({...prevState, firstNameError: "Name Too Long"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, firstNameError: ""}))
            return false;
        }
    }

    function displayLastNameErrors() {
        if (!lastName) {
            setErrors(prevState => ({...prevState, lastNameError: "Last Name Required"}))
            return true;
        } else if (lastName.length > 20) {
            setErrors(prevState => ({...prevState, lastNameError: "Last Name Too Long"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, lastNameError: ""}))
            return false;
        }
    }

    function displayTelephoneNumberErrors() {
        const telephoneNumberRegex = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/
        if (!telephoneNumber) {
            setErrors(prevState => ({...prevState, telephoneNumberError: "Telephone Number Required"}))
            return true;
        } else if (!telephoneNumberRegex.test(telephoneNumber)) {
            setErrors(prevState => ({...prevState, telephoneNumberError: "Enter Valid Phone Number"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, telephoneNumberError: ""}))
            return false;
        }
    }

    function displayAddressLine1Errors() {
        if (!addressLine1) {
            setErrors(prevState => ({...prevState, addressLine1Error: "Address Required"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, addressLine1Error: ""}))
            return false;
        }
    }

    function displayCityErrors() {
        if (!addressLine1) {
            setErrors(prevState => ({...prevState, cityError: "City Required"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, cityError: ""}))
            return false;
        }
    }

    function displayPostcodeErrors() {
        const postcodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
        if (!postcode) {
            setErrors(prevState => ({...prevState, postcodeError: "Postcode Required"}))
            return true;
        } else if (!postcodeRegex.test(postcode)) {
            setErrors(prevState => ({...prevState, postcodeError: "Enter Valid Postcode"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, postcodeError: ""}))
            return false;
        }
    }

    function displayVehicleTypeErrors() {
        if (!vehicleType) {
            setErrors(prevState => ({...prevState, vehicleTypeError: "Vehicle Type Required"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, vehicleTypeError: ""}))
            return false;
        }
    }

    function displayEngineSizeErrors() {
        if (!engineSize) {
            setErrors(prevState => ({...prevState, engineSizeError: "Engine Size Required"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, engineSizeError: ""}))
            return false;
        }
    }

    function displayUsedForCommercialErrors() {
        if (!usedForCommercial) {
            setErrors(prevState => ({...prevState, usedForCommercialError: "One Option Required"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, usedForCommercialError: ""}))
            return false;
        }
    }

    function displayUsedOutsideStateErrors() {
        if (!usedOutsideState) {
            setErrors(prevState => ({...prevState, usedOutsideStateError: "One Option Required"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, usedOutsideStateError: ""}))
            return false;
        }
    }

    function displayCurrentValueErrors() {
        if (!currentValue) {
            setErrors(prevState => ({...prevState, currentValueError: "Value Required"}))
            return true;
        } else if (currentValue > 50000 || currentValue <= 0) {
            setErrors(prevState => ({...prevState, currentValueError: "Must be between 0 - 50000"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, currentValueError: ""}))
            return false;
        }
    }

    function displayDateRegisteredErrors() {
        let today = new Date();
        today.setHours(0, 0, 0, 0)
        if (!dateRegistered) {
            setErrors(prevState => ({...prevState, dateRegisteredError: "Date Required"}))
            return true;
        } else if (dateRegistered >= today) {
            setErrors(prevState => ({...prevState, dateRegisteredError: "Date must be earlier than today"}))
            return true;
        } else {
            setErrors(prevState => ({...prevState, dateRegisteredError: ""}))
            return false;
        }
    }

    useEffect(
        () => {
            if (Object.keys(errors).some(indexOfError => errors[indexOfError])) {
                setEnableButton(false)
            } else {
                setEnableButton(true)
            }
        }, [errors])

    useEffect(
        () => {
            if (firstRender.current.prefix) {
                firstRender.current.prefix = false
                return
            }
            displayPrefixErrors();
        }, [prefix])

    useEffect(
        () => {
            if (firstRender.current.firstName) {
                firstRender.current.firstName = false
                return
            }
            displayFirstNameErrors();
        }, [firstName])

    useEffect(
        () => {
            if (firstRender.current.lastName) {
                firstRender.current.lastName = false
                return
            }
            displayLastNameErrors();
        }, [lastName])

    useEffect(
        () => {
            if (firstRender.current.telephoneNumber) {
                firstRender.current.telephoneNumber = false
                return
            }
            displayTelephoneNumberErrors();
        }, [telephoneNumber])

    useEffect(
        () => {
            if (firstRender.current.addressLine1) {
                firstRender.current.addressLine1 = false
                return
            }
            displayAddressLine1Errors();
        }, [addressLine1])

    useEffect(
        () => {
            if (firstRender.current.city) {
                firstRender.current.city = false
                return
            }
            displayCityErrors();
        }, [city])

    useEffect(
        () => {
            if (firstRender.current.postcode) {
                firstRender.current.postcode = false
                return
            }
            displayPostcodeErrors();
        }, [postcode])

    useEffect(
        () => {
            if (firstRender.current.vehicleType) {
                firstRender.current.vehicleType = false
                return
            }
            displayVehicleTypeErrors();
        }, [vehicleType])

    useEffect(
        () => {
            if (firstRender.current.engineSize) {
                firstRender.current.engineSize = false
                return
            }
            displayEngineSizeErrors();
        }, [engineSize])

    useEffect(
        () => {
            if (firstRender.current.usedForCommercial) {
                firstRender.current.usedForCommercial = false
                return
            }
            displayUsedForCommercialErrors();
        }, [usedForCommercial])

    useEffect(
        () => {
            if (firstRender.current.usedOutsideState) {
                firstRender.current.usedOutsideState = false
                return
            }
            displayUsedOutsideStateErrors();
        }, [usedOutsideState])

    useEffect(
        () => {
            if (firstRender.current.currentValue) {
                firstRender.current.currentValue = false
                return
            }
            displayCurrentValueErrors();
        }, [currentValue])

    useEffect(
        () => {
            if (firstRender.current.dateRegistered) {
                firstRender.current.dateRegistered = false
                return
            }
            displayDateRegisteredErrors();
        }, [dateRegistered])

    const prefixSelections = [
        {value: "Mr"},
        {value: "Mrs"},
        {value: "Miss"},
        {value: "Ms"},
        {value: "Dr"},
    ];

    const vehicleTypeSelections = [
        {value: "Cabriolet"},
        {value: "Coupe"},
        {value: "Estate"},
        {value: "Hatchback"},
        {value: "Other"},
    ];

    const engineSizeSelections = [
        {value: "1000", displayName: "1000cc"},
        {value: "1600", displayName: "1600cc"},
        {value: "2000", displayName: "2000cc"},
        {value: "2500", displayName: "2500cc"},
        {value: "3000", displayName: "3000cc"},
        {value: "Other", displayName: "Other"},
    ];

    const additionalDriversSelections = [
        {value: "0"},
        {value: "1"},
        {value: "2"},
        {value: "3"},
        {value: "4"},
    ];

    const getQuoteFromAPI = async () => {
        let prefixError = await displayPrefixErrors();
        let firstNameError = await displayFirstNameErrors();
        let lastNameError = await displayLastNameErrors();
        let telephoneNumberError = await displayTelephoneNumberErrors();
        let addressLine1Error = await displayAddressLine1Errors();
        let cityError = await displayCityErrors();
        let postcodeError = await displayPostcodeErrors();
        let vehicleTypeError = await displayVehicleTypeErrors();
        let engineSizeError = await displayEngineSizeErrors();
        let usedForCommercialError = await displayUsedForCommercialErrors();
        let usedOutsideStateError = await displayUsedOutsideStateErrors();
        let currentValueError = await displayCurrentValueErrors();
        let dateRegisteredError = await displayDateRegisteredErrors();

        if (!prefixError && !firstNameError && !lastNameError && !telephoneNumberError && !addressLine1Error && !cityError && !postcodeError && !vehicleTypeError && !engineSizeError && !usedForCommercialError && !usedOutsideStateError && !currentValueError && !dateRegisteredError) {
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
                dateRegistered
            };
            const endpointURL =
                `${SERVER_URL}/capstone/calculatequote`;
            axios
                .get(endpointURL, {params: formData})
                .then((response) => setFinalQuoteAmount(response.data))
                .then(()=>setShowGetQuoteModal(true))
                .catch((err) => console.log(err));
        }
    }


    return (
        <div className="create">
            <Box
                component="form"
                noValidate
                autoComplete="on"
                sx={{
                    "& .MuiTextField-root": {m: 1},
                    "& .MuiCard-root": {mb: 2},
                    "& .MuiTypography-root": {m: 1},
                    "& .MuiFormControl-root": {m: 1}
                }}
            >
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Grid container>
                            <Typography variant="h4" component="h1">
                                Please Enter Personal Details
                            </Typography>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={2}>
                                <TextField
                                    required
                                    fullWidth
                                    select
                                    id="prefix"
                                    value={prefix}
                                    label="Prefix"
                                    placeholder="Prefix"
                                    error={errors.prefixError}
                                    helperText={errors.prefixError}
                                    onChange={(e) => setPrefix(e.target.value)}
                                >
                                    {prefixSelections.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid item xs={5}>
                                <TextField
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    placeholder="First Name"
                                    error={errors.firstNameError}
                                    helperText={errors.firstNameError}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    placeholder="Last Name"
                                    error={errors.lastNameError}
                                    helperText={errors.lastNameError}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="telephoneNumber"
                                label="Telephone Number"
                                name="telephoneNumber"
                                placeholder="Telephone Number"
                                error={errors.telephoneNumberError}
                                helperText={errors.telephoneNumberError}
                                onChange={(e) => setTelephoneNumber(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                required
                                fullWidth
                                id="addressLine1"
                                label="Address Line 1"
                                name="addressLine1"
                                placeholder="Address Line 1"
                                error={errors.addressLine1Error}
                                helperText={errors.addressLine1Error}
                                onChange={(e) => setAddressLine1(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="addressLine2"
                                label="Address Line 2"
                                name="addressLine2"
                                placeholder="Address Line 2"
                                onChange={(e) => setAddressLine2(e.target.value)}
                            />
                        </Grid>
                        <Grid container spacing={1}>
                            <Grid item xs={4}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    name="city"
                                    label="City"
                                    placeholder="City"
                                    error={errors.cityError}
                                    helperText={errors.cityError}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    required
                                    fullWidth
                                    id="city"
                                    label="Postcode"
                                    name="postcode"
                                    placeholder="Postcode"
                                    error={errors.postcodeError}
                                    helperText={errors.postcodeError}
                                    onChange={(e) => setPostcode(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                <Card sx={{minWidth: 275}}>
                    <CardContent>
                        <Grid container>
                            <Typography variant="h4" component="h1">
                                Please Enter Car Details
                            </Typography>
                        </Grid>

                        <Grid container spacing={1}>
                            <Grid item xs={5}>
                                <TextField
                                    required
                                    fullWidth
                                    select
                                    value={vehicleType}
                                    label="Vehicle Type"
                                    name="vehicleType"
                                    placeholder="Vehicle Type"
                                    error={errors.vehicleTypeError}
                                    helperText={errors.vehicleTypeError}
                                    onChange={(e) => setVehicleType(e.target.value)}
                                >
                                    {vehicleTypeSelections.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={5}>
                                <TextField
                                    required
                                    fullWidth
                                    select
                                    value={engineSize}
                                    label="Engine Size"
                                    name="engineSize"
                                    placeholder="Engine Size"
                                    error={errors.engineSizeError}
                                    helperText={errors.engineSizeError}
                                    onChange={(e) => setEngineSize(e.target.value)}
                                >
                                    {engineSizeSelections.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.displayName}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <TextField
                                required
                                fullWidth
                                select
                                value={additionalDrivers}
                                label="Additional Drivers"
                                name="additionalDrivers"
                                placeholder="Additional Drivers"
                                onChange={(e) => setAdditionalDrivers(e.target.value)}
                            >
                                {additionalDriversSelections.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <FormControl component="fieldset" error={errors.usedForCommercialError}>
                                    <FormLabel component="legend">
                                        Will the vehicle be used for commercial purposes?*
                                    </FormLabel>
                                    <FormHelperText>{errors.usedForCommercialError}</FormHelperText>

                                    <RadioGroup
                                        row
                                        aria-label="used for commercial"
                                        name="controlled-radio-buttons-group"
                                        value={usedForCommercial}
                                        onChange={(e) => setUsedForCommercial(e.target.value)}
                                    >
                                        <FormControlLabel
                                            value={true}
                                            control={<Radio/>}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio/>}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={5}>
                                <FormControl component="fieldset" error={errors.usedOutsideStateError}>
                                    <FormLabel component="legend">
                                        Will the vehicle be used outside the registered state?*
                                    </FormLabel>
                                    <FormHelperText>{errors.usedOutsideStateError}</FormHelperText>

                                    <RadioGroup
                                        row
                                        aria-label="used outside state"
                                        name="controlled-radio-buttons-group"
                                        value={usedOutsideState}
                                        onChange={(e) => setUsedOutsideState(e.target.value)}
                                    >
                                        <FormControlLabel
                                            value={true}
                                            control={<Radio/>}
                                            label="Yes"
                                        />
                                        <FormControlLabel
                                            value={false}
                                            control={<Radio/>}
                                            label="No"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>

                                <TextField
                                    required
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">£</InputAdornment>
                                        ),
                                    }}
                                    label="Vehicle Value"
                                    type="number"
                                    placeholder="Vehicle Value"
                                    error={errors.currentValueError}
                                    helperText={errors.currentValueError}
                                    onChange={(e) => setCurrentValue(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={4}>

                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <DatePicker
                                            required
                                            label="Date First Registered"
                                            inputFormat="dd/MM/yyyy"
                                            value={dateRegistered}
                                            onChange={(e) => setDateRegistered(e)}
                                            renderInput={(params) => <TextField
                                                {...params}
                                                error={errors.dateRegisteredError}
                                                helperText={errors.dateRegisteredError}
                                            />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>

                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                size="large"
                                variant="contained"
                                disabled={!enableButton}
                                onClick={() => getQuoteFromAPI()}
                            >
                                {enableButton ? "Get Quote" : "Check Fields"}
                            </Button>
                        </Box>
                        <GetQuoteModal
                            prefix={prefix}
                            firstName={firstName}
                            lastName={lastName}
                            telephoneNumber={telephoneNumber}
                            addressLine1={addressLine1}
                            addressLine2={addressLine2}
                            city={city}
                            postcode={postcode}
                            vehicleType={vehicleType}
                            engineSize={engineSize}
                            additionalDrivers={additionalDrivers}
                            usedForCommercial={usedForCommercial}
                            usedOutsideState={usedOutsideState}
                            currentValue={currentValue}
                            dateRegistered={dateRegistered}
                            finalQuoteAmount={finalQuoteAmount}
                            showGetQuoteModal={showGetQuoteModal}
                            setShowGetQuoteModal={setShowGetQuoteModal}/>
                    </CardContent>
                </Card>
            </Box>
        </div>
    );
}

export default Create;
