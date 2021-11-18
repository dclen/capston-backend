import React, { useState, useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router";

function Update() {
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
  const [usedForCommercial, setUsedForCommercial] = useState("");
  const [usedOutsideState, setUsedOutsideState] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [firstRegistered, setFirstRegistered] = useState(new Date());

  
  const [id, setId] = useState(null);
  let history = useHistory();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setPrefix(localStorage.getItem("prefix"));
    setFirstName(localStorage.getItem("firstName"));
    setLastName(localStorage.getItem("lastName"));
    setTelephoneNumber(localStorage.getItem("telephoneNumber"));
    setAddressLine1(localStorage.getItem("addressLine1"));
    setAddressLine2(localStorage.getItem("addressLine2"));
    setCity(localStorage.getItem("city"));
    setPostcode(localStorage.getItem("postcode"));
    setVehicleType(localStorage.getItem("vehicleType"));
    setEngineSize(localStorage.getItem("engineSize"));
    setAdditionalDrivers(localStorage.getItem("additionalDrivers"));
    setUsedForCommercial(localStorage.getItem("usedForCommercial"));
    setUsedOutsideState(localStorage.getItem("usedOutsideState"));
    setCurrentValue(localStorage.getItem("currentValue"));
    setFirstRegistered(localStorage.getItem("firstRegistered"));
  }, []);

  const callMockAPI = () => {
    console.log(id + " " + firstName + " " + lastName);

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
    };

    const endpointURL =
      "https://6151d1834a5f22001701d461.mockapi.io/api/v1/people/" + id;
    axios
      .put(endpointURL, formData)
      .then((response) => history.push("/read"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Prefix</label>
          <select
            placeholder="Prefix"
            onChange={(e) => setPrefix(e.target.value)}
            value={prefix}
          >
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Ms">Ms</option>
            <option value="Dr">Dr</option>
          </select>
        </Form.Field>
        <Form.Field>
          <label>First Name</label>
          <input
            name="firstName"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            name="lastName"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </Form.Field>
        <Form.Field>
          <label>Telephone Number</label>
          <input
            name="telephoneNumber"
            placeholder="Telephone Number"
            onChange={(e) => setTelephoneNumber(e.target.value)}
            value={telephoneNumber}
          />
        </Form.Field>
        <Form.Field>
          <label>Address Line 1</label>
          <input
            name="addressLine1"
            placeholder="Address Line 1"
            onChange={(e) => setAddressLine1(e.target.value)}
            value={addressLine1}
          />
        </Form.Field>
        <Form.Field>
          <label>Address Line 2</label>
          <input
            name="addressLine2"
            placeholder="Address Line 2"
            onChange={(e) => setAddressLine2(e.target.value)}
            value={addressLine2}
          />
        </Form.Field>
        <Form.Field>
          <label>City</label>
          <input
            name="city"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
          />
        </Form.Field>
        <Form.Field>
          <label>Postcode</label>
          <input
            name="postcode"
            placeholder="Postcode"
            onChange={(e) => setPostcode(e.target.value)}
            value={postcode}
          />
        </Form.Field>
        <Form.Field>
          <label>Vehicle Type</label>
          <select
            placeholder="Vehicle Type"
            onChange={(e) => setVehicleType(e.target.value)}
            value={vehicleType}
          >
            <option value="Cabriolet">Cabriolet</option>
            <option value="Coupe">Coupe</option>
            <option value="Estate">Estate</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Other">Other</option>
          </select>
        </Form.Field>
        <Form.Field>
          <label>Engine Size</label>
          <select
            placeholder="Engine Size"
            onChange={(e) => setEngineSize(e.target.value)}
            value={engineSize}
          >
            <option value="1000cc">1000cc</option>
            <option value="1600cc">1600cc</option>
            <option value="2000cc">2000cc</option>
            <option value="2500cc">2500cc</option>
            <option value="3000cc">3000cc</option>
            <option value="Other">Other</option>
          </select>
        </Form.Field>

        <Button type="submit" onClick={callMockAPI}>
          Update
        </Button>
      </Form>
    </div>
  );
}

export default Update;
