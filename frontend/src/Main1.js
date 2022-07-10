import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Button } from "react-bootstrap";
import SignedInNavBar from "./SignedInNavBar";
import DatePicker from "./DatePicker";
import DropDownMain from "./DropDownMain";
import graph from "./graph.png"; // with import

export default function Main1() {
  let status = "Not Live";
  let daysLeft = 32;
  let Quantity = "Quantity";
  let Country = "Country";
  let Param2 = "Param2";
  return (
    <Container style={{}}>
      <Row>
        <Col>
          <SignedInNavBar></SignedInNavBar>
        </Col>
      </Row>

      <Row>
        <Col xs={3} style={{ backgroundColor: "gray" }}>
          <DatePicker></DatePicker>

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
