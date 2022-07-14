import "./App.css";
import graph from "./graph.png"; // with import
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Form, Row, Col, Button } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

export default function Main1() {
  let status = "Not Live";
  let daysLeft = 32;
  let Quantity = "Quantity";
  let Country = "Country";
  let Param2 = "Param2";

  //const [data, setData] = useState("");
  const [value, setValue] = useState("");
  /*

    axios
     .get("http://localhost:5000/auth/user",  { withCredentials: true })
     .then((response) => {
        console.log(response);
        const user=response.data;
     });
     */

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/auth/user",
    }).then((res) => {
      console.log(res);
      //setData(res.user);
      setValue(res.data.daysleft);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Container style={{}}>
      <Row>
        <Col>
          <SignedInNavBar></SignedInNavBar>
        </Col>
      </Row>

      <Row>
        <Col xs={3} style={{ backgroundColor: "gray" }}>
          <Form.Group>
            <Form.Label>Select Date</Form.Label>

            <Form.Control type="date" placeholder="Date" />
          </Form.Group>

          <DropDownMain></DropDownMain>

          <Button
            className="refresh"
            onClick={() => {
              console.log("love and peace");
            }}
          >
            Refresh
          </Button>
        </Col>

        <Col className="maincolumn" style={{ backgroundColor: "red" }}>
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
                Days Left: {value}
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

function SignedInNavBar() {
  const [name, setName] = useState("");

  const getName = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/auth/user",
    }).then((res) => {
      setName(res.data.displayName);
    });
  };
  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">EnergyLive2022</Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="/profile">{name}</a>
            </Navbar.Text>
          </Navbar.Collapse>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <a href="http://localhost:5000/auth/logout">Sign Out</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
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

function DropDownCountries() {
  const [data, setData] = useState([]);

  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )

      .then((res) => setData(res.data))

      .catch((err) => console.log(err));
  }, []);

  const countries = [...new Set(data.map((item) => item.country))];

  return (
    <div>
      <label> Country </label>

      <Form.Select>
        <option value="" selected></option>

        {countries.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
