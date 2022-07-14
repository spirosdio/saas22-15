import React from "react";

import logo from "./logo.png";

import { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function Profile() {
  const history = useHistory();
  let daysLeft = "32";
  const coursesPage = () => {
    history.push("/main1");
  };
  const [value, setValue] = useState("");

  const handleSelect = (e) => {
    setValue(e);
  };

  return (
    <>
      <header className="App-header">
        <h1>Energy Live 2022</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label style={{ marginTop: "20px" }}>First Name</Form.Label>
            <Form.Control type="email" placeholder="First Name" />
            <Form.Label style={{ marginTop: "20px" }}>Last Name</Form.Label>
            <Form.Control type="email" placeholder="Last Name" />
            <Form.Label style={{ marginTop: "20px" }}>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Label style={{ marginTop: "20px" }}>Last Login</Form.Label>
            <Form.Control type="email" placeholder="Last Login" />
            <Row>
              <Col>
                <p>Days left: {daysLeft}</p>
              </Col>
              <Col>
                <DropdownButton
                  className="d-grid gap-2"
                  variant="light"
                  title={value}
                  id="dropdown-menu-align-right"
                  onSelect={handleSelect}
                  style={{ marginTop: "20px" }}
                >
                  <Dropdown.Item eventKey="1">1 </Dropdown.Item>
                  <Dropdown.Item eventKey="5">5 </Dropdown.Item>
                  <Dropdown.Item eventKey="10">10 </Dropdown.Item>
                  <Dropdown.Item eventKey="20">20 </Dropdown.Item>
                  <Dropdown.Item eventKey="50">50 </Dropdown.Item>
                </DropdownButton>
              </Col>
            </Row>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{ marginRight: "40px" }}
          >
            Extend
          </Button>

          <Button variant="primary" type="cancel">
            Cancel
          </Button>
        </Form>
        <a href="/main1" style={{ marginTop: "30px" }}>
          Back
        </a>
      </header>
    </>
  );
}