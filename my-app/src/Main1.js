import React from "react";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col, Button } from "react-bootstrap";

import SignedInNavBar from "./SignedInNavBar";

import DatePicker from "./DatePicker";

import NavBar from "./NavBar";
import DropDownMain from "./DropDownMain";
import graph from "./graph.png"; // with import

export default function Main1() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <SignedInNavBar></SignedInNavBar>
        </Col>
      </Row>

      <Row style={{ minHeight: "90vh" }}>
        <Col xs={4} style={{ backgroundColor: "gray" }}>
          <DatePicker></DatePicker>

          <DropDownMain></DropDownMain>
        </Col>

        <Col>
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
        </Col>
      </Row>
    </Container>
  );
}
