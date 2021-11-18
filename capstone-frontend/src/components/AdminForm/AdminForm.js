import React, { useState } from "react";
import "./AdminForm.css";
import { Button, Form, Input } from "semantic-ui-react";
import SingleDriver from "../SingleDriver/SingleDriver";
import axios from "axios";

function AdminForm() {
  const [driverIdDelete, setDriverIdDelete] = useState("");
  const [driverIdUpdate, setDriverIdUpdate] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");

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
      .put(endpointURL, { telephoneNumber: phone })
      .then(alert(`Driver ${id} Phone Updated to ${telephoneNumber}`))
      .then(setDriverIdUpdate(""))
      .then(setTelephoneNumber(""))
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="admin">
      <SingleDriver />
      <Form size="big">
        <Form.Group>
          <Form.Field inline>
            <label>Delete Driver</label>
            <input
              placeholder="Driver ID"
              onChange={(e) => setDriverIdDelete(e.target.value)}
              value={driverIdDelete}
            />
          </Form.Field>
          <Button
            color="red"
            type="submit"
            onClick={() => onDelete(driverIdDelete)}
          >
            Delete Driver
          </Button>
        </Form.Group>
      </Form>
      <Form size="big">
        <Form.Group>
          <Form.Field inline>
            <label>Update Phone</label>
            <input
              placeholder="Driver ID"
              onChange={(e) => setDriverIdUpdate(e.target.value)}
              value={driverIdUpdate}

            />
            <input
              placeholder="Phone no."
              onChange={(e) => setTelephoneNumber(e.target.value)}
              value={telephoneNumber}

            />
          </Form.Field>
          <Button
            color="green"
            type="submit"
            onClick={() => onUpdate(driverIdUpdate, telephoneNumber)}
          >
            Update
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AdminForm;
