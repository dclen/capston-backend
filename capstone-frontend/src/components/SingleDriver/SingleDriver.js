import React, { useEffect, useState } from "react";
import "./SingleDriver.css";
import { Table, Button, Form } from "semantic-ui-react";
import axios from "axios";
import { Link } from "react-router-dom";

function SingleDriver() {
  const [tableData, setTableData] = useState([]);
  const [id, setId] = useState(null);
  const [showTable, setShowTable] = useState(false);

  function callMockAPIWithAxiosGET(id) {
    const endpointURL = `https://6151d1834a5f22001701d461.mockapi.io/api/v1/people/${id}`;
    axios
      .get(endpointURL)
      .then((response) => setTableData(response.data))
      .catch((err) => {
        console.log(err);
      });
  }

  function handleFindDriver(id) {
    callMockAPIWithAxiosGET(id);
    setShowTable(true)
  }

  return (
    <div className="SingleDriver">
      <Form size="big">
        <Form.Group>
          <Form.Field inline>
            <label>Find Driver</label>
            <input
              placeholder="Driver ID"
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Field>

          <Button
            color="blue"
            type="submit"
            onClick={() => handleFindDriver(id)}
          >
            Get Details
          </Button>
        </Form.Group>
      </Form>
      {showTable && (
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
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>{tableData.id}</Table.Cell>
              <Table.Cell>{tableData.prefix}</Table.Cell>
              <Table.Cell>{tableData.firstName}</Table.Cell>
              <Table.Cell>{tableData.lastName}</Table.Cell>
              <Table.Cell>{tableData.telephoneNumber}</Table.Cell>
              <Table.Cell>{tableData.addressLine1}</Table.Cell>
              <Table.Cell>{tableData.addressLine2}</Table.Cell>
              <Table.Cell>{tableData.city}</Table.Cell>
              <Table.Cell>{tableData.postcode}</Table.Cell>
              <Table.Cell>{tableData.vehicleType}</Table.Cell>
              <Table.Cell>{tableData.engineSize}</Table.Cell>
              <Table.Cell>{tableData.additionalDrivers}</Table.Cell>
              <Table.Cell>{tableData.usedForCommercial}</Table.Cell>
              <Table.Cell>{tableData.usedOutsideState}</Table.Cell>
              <Table.Cell>{tableData.currentValue}</Table.Cell>
              <Table.Cell>{tableData.firstRegistered}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      )}
    </div>
  );
}

export default SingleDriver;
