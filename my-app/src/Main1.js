import React from "react";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Container, Row, Col } from "react-bootstrap";

import SignedInNavBar from "./SignedInNavBar";

import DatePicker from "./DatePicker";

import DropDownMain from "./DropDownMain";

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
          <img
            src="C:\Users\zj39lb\Desktop\energy\src\home.jpg"
            width="100%"
            height="80%"
          />
        </Col>
      </Row>
    </Container>
  );
}
