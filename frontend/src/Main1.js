import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";
import graph from "./graph.png"; // with import
import Form from "react-bootstrap/Form";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import DropDownCountries from "./DropDownCountries";

function Main1() {
  let status = "Not Live";
  let daysLeft = 32;
  let data = undefined;
  let Quantity = "Quantity";
  let Country = "Country";
  let Param2 = "Param2";

  return (
    <Container style={{}}>
      <Row>
        <Col>
          <Navbar>
            <Container>
              <Navbar.Brand href="#home">EnergyLive2022</Navbar.Brand>

              <Navbar.Toggle />

              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  Signed in as: <a href="/profile">Mark Otto</a>
                </Navbar.Text>
                <p></p>
                <Navbar.Text>
                  <SignOut style={{ marginLeft: "20px" }}></SignOut>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>{" "}
        </Col>
      </Row>

      <Row>
        <Col xs={3} style={{ backgroundColor: "gray" }}>
          <Form.Label>Select Date</Form.Label>

          <Form.Control type="date" placeholder="Date" />
          <DropDownMain></DropDownMain>

          <Button
            className="refresh"
            onClick={() => {
              const jsonFile = require("./sample.json");
              Country = jsonFile[[0]].Country;
              Quantity = jsonFile[[0]].Quantity;
              Param2 = jsonFile[[0]].Param2;
              console.log("got from string those ", Country, Quantity, Param2);
            }}
          >
            Refresh
          </Button>
        </Col>

        <Col className="maincolumn" style={{ backgroundColor: "" }}>
          these come from the json file
          <Row>
            <Col>
              <div style={{ color: "black" }}>{Quantity} </div>
            </Col>
            <Col>
              <div style={{ color: "black" }}>{Country}</div>
            </Col>
            <Col>
              <div style={{ color: "black" }}>{Param2}</div>
            </Col>
          </Row>
          <img src={graph} width="100%" height="50%" />
          <p style={{ textAlign: "left" }}>Latest Update dd.mm.hh.mm</p>
          <Row>
            <Col>
              <Button>Download Image</Button>
            </Col>
            <Col>
              <Button>Download Data</Button>
            </Col>
          </Row>
          <div
            style={{
              minWidth: "70%",
              borderTop: "2px solid #000",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
            }}
          ></div>
          <Row className="bottomrow" style={{ margin: "1%", margin: "1px" }}>
            <Col>
              <div style={{ color: "black" }} href="/Legal">
                Service Status: {status}
              </div>
            </Col>
            <Col>
              <div style={{ color: "black" }} href="/Legal">
                Days Left: {daysLeft}
              </div>
            </Col>
            <Col>
              <Nav.Link style={{ color: "black" }} href="/profile">
                Extend Plan
              </Nav.Link>
            </Col>
            <Col>
              <Nav.Link style={{ color: "black" }} href="/About">
                About
              </Nav.Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

function DropDownMain() {
  const [value, setValue] = useState("");

  const handleSelect = (e) => {
    setValue(e);
  };

  return (
    <>
      <label> Quantity </label>

      <DropdownButton
        className="d-grid gap-2"
        variant="light"
        title={value}
        id="dropdown-menu-align-right"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey="Actual Total Food">
          Actual Total Food
        </Dropdown.Item>

        <Dropdown.Item eventKey="Cross Border Flows">
          Cross Border Flows
        </Dropdown.Item>

        <Dropdown.Item eventKey="Generation Per Type">
          Generation Per Type
        </Dropdown.Item>
      </DropdownButton>

      <DropDownCountries></DropDownCountries>
      {value == "Cross Border Flows" ? (
        <DropDownCountries></DropDownCountries>
      ) : (
        " "
      )}

      {value == "Generation Per Type" ? <DropDownGT></DropDownGT> : " "}
    </>
  );
}

function SignOut() {
  return <button className="sign-out">Sign Out</button>;
}

function DropDownGT() {
  return (
    <>
      <label> Generation Type </label>

      <Form.Select aria-label="Default select example">
        <option value="" selected></option>

        <option value="1">Natural Gas 1</option>

        <option value="2">Natural Gas 2</option>

        <option value="3">Natural Gas 3</option>
      </Form.Select>
    </>
  );
}

export default Main1;
