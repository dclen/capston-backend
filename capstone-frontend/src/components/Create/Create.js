import "./Create.css";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useHistory } from "react-router";
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
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import Typography from "@mui/material/Typography";

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
  const [firstRegistered, setFirstRegistered] = useState(new Date());
  const [finalQuoteAmount, setFinalQuoteAmount] = useState(0);

  const [validForm, setValidForm] = useState(false);
  const [invalidPrefix, setInvalidPrefix] = useState(true);
  const [invalidFirstName, setInvalidFirstName] = useState(true);

  const prefixSelections = [
    { value: "Mr" },
    { value: "Mrs" },
    { value: "Miss" },
    { value: "Ms" },
    { value: "Dr" },
  ];

  const vehicleTypeSelections = [
    { value: "Cabriolet" },
    { value: "Coupe" },
    { value: "Estate" },
    { value: "Hatchback" },
    { value: "Other" },
  ];

  const engineSizeSelections = [
    { value: "1000", displayName: "1000cc"},
    { value: "1600", displayName: "1600cc" },
    { value: "2000", displayName: "2000cc" },
    { value: "2500", displayName: "2500cc" },
    { value: "3000", displayName: "3000cc" },
    { value: "Other", displayName: "Other" },
  ];

  const additionalDriversSelections = [
    { value: "0" },
    { value: "1" },
    { value: "2" },
    { value: "3" },
    { value: "4" },
  ];

  const handleSubmit = () => {
    //handleSubmit here
  };

  let history = useHistory();

  const getQuoteFromAPI = () => {
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
      firstRegistered,
    };

    const endpointURL =
      "http://localhost:8080/capstone/calculatequote";
    axios
      .get(endpointURL, {params: formData})
      .then((response) => setFinalQuoteAmount(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="create">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          "& .MuiTextField-root": { m: 1 },
        }}
        onSubmit={handleSubmit}
      >
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
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
                onChange={(e) => setAddressLine1(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
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
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  select
                  value={vehicleType}
                  label="Vehicle Type"
                  name="vehicleType"
                  placeholder="Vehicle Type"
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  {vehicleTypeSelections.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  required
                  fullWidth
                  select
                  value={engineSize}
                  label="Engine Size"
                  name="engineSize"
                  placeholder="Engine Size"
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
            <Grid item xs={4}>
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
              <Grid item xs={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Will the vehicle be used for commercial purposes?*
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="commercial"
                    name="controlled-radio-buttons-group"
                    value={usedForCommercial}
                    onChange={(e) => setUsedForCommercial(e.target.value)}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Will the vehicle be used outside the registered state?*
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="commercial"
                    name="controlled-radio-buttons-group"
                    value={usedOutsideState}
                    onChange={(e) => setUsedOutsideState(e.target.value)}
                  >
                    <FormControlLabel
                      value={true}
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value={false}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

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
              onChange={(e) => setCurrentValue(e.target.value)}
            />

            <TextField
              required
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Date"
              type="date"
              onChange={(e) => setFirstRegistered(e.target.value)}
            />

            {/* <LocalizationProvider dateAdapter={DateAdapter}>
              <Stack spacing={3}>
                <DesktopDatePicker
                  label="When was vehicle first registered?"
                  type="date"
                  inputFormat="dd/MM/yyyy"
                  value={firstRegistered}
                  onChange={(e)=>setFirstRegistered(e.target.value)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Stack>
            </LocalizationProvider> */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                size="large"
                variant="contained"
                onClick={() => getQuoteFromAPI()}
              >
                Retrieve Quote
              </Button>
            </Box>
            {finalQuoteAmount}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default Create;
