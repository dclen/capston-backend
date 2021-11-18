import React, { useEffect, useState } from "react";
import "./Read.css";
import { Table, Button } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

function Read() {
  const [tableData, setTableData] = useState([]);

  function callMockAPIWithAxiosGET() {
    const endpointURL =
      "http://localhost:8080/capstone";
    axios
      .get(endpointURL)
      .then((response) => setTableData(response.data))
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    callMockAPIWithAxiosGET();
  }, []);

  function setPersonData(data) {
    console.log(data.id);
    localStorage.setItem("id", data.id);
    localStorage.setItem("prefix", data.prefix);
    localStorage.setItem("firstName", data.firstName);
    localStorage.setItem("lastName", data.lastName);
    localStorage.setItem("telephoneNumber", data.telephoneNumber);
    localStorage.setItem("addressLine1", data.addressLine1);
    localStorage.setItem("addressLine2", data.addressLine2);
    localStorage.setItem("city", data.city);
    localStorage.setItem("postcode", data.postcode);
    localStorage.setItem("vehicleType", data.vehicleType);
    localStorage.setItem("engineSize", data.engineSize);
    localStorage.setItem("additionalDrivers", data.additionalDrivers);
    localStorage.setItem("usedForCommercial", data.usedForCommercial);
    localStorage.setItem("usedOutsideState", data.usedOutsideState);
    localStorage.setItem("currentValue", data.currentValue);
    localStorage.setItem("dateRegistered", data.dateRegistered);
  }

  function onDelete(id) {
    const endpointURL = `https://6151d1834a5f22001701d461.mockapi.io/api/v1/people/${id}`;
    axios
      .delete(endpointURL)
      .then(() => callMockAPIWithAxiosGET())
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="Read">
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Prefix</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>Telephone Number</Table.HeaderCell>
            <Table.HeaderCell>Address Line 1</Table.HeaderCell>
            <Table.HeaderCell>Address Line 2</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Postcode</Table.HeaderCell>
            <Table.HeaderCell>Vehicle Type</Table.HeaderCell>
            <Table.HeaderCell>Engine Size</Table.HeaderCell>
            <Table.HeaderCell>Additional Drivers</Table.HeaderCell>
            <Table.HeaderCell>Commercial Use?</Table.HeaderCell>
            <Table.HeaderCell>Used Outside State?</Table.HeaderCell>
            <Table.HeaderCell>Current Value(£)</Table.HeaderCell>
            <Table.HeaderCell>Date Registered</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {tableData.map((data) => {
            return (
              <Table.Row>
                <Table.Cell>{data.id}</Table.Cell>
                <Table.Cell>{data.prefix}</Table.Cell>
                <Table.Cell>{data.firstName}</Table.Cell>
                <Table.Cell>{data.lastName}</Table.Cell>
                <Table.Cell>{data.telephoneNumber}</Table.Cell>
                <Table.Cell>{data.addressLine1}</Table.Cell>
                <Table.Cell>{data.addressLine2}</Table.Cell>
                <Table.Cell>{data.city}</Table.Cell>
                <Table.Cell>{data.postcode}</Table.Cell>
                <Table.Cell>{data.vehicleType}</Table.Cell>
                <Table.Cell>{data.engineSize}</Table.Cell>
                <Table.Cell>{data.additionalDrivers}</Table.Cell>
                <Table.Cell>{data.usedForCommercial}</Table.Cell>
                <Table.Cell>{data.usedOutsideState}</Table.Cell>
                <Table.Cell>{data.currentValue}</Table.Cell>
                <Table.Cell>{data.dateRegistered}</Table.Cell>

                <Table.Cell>
                  <Link to="/update">
                    <Button color="green" onClick={() => setPersonData(data)}>
                      Update
                    </Button>
                  </Link>
                </Table.Cell>

                <Table.Cell>
                  <Link to="/read">
                    <Button color="red" onClick={() => onDelete(data.id)}>
                      Delete
                    </Button>
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Read;
