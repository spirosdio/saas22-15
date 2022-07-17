import React from "react";

import logo from "./logo.png";

import "./App.css";

import { Navbar, Container, Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  const coursesPage = () => {
    history.push("/main1");
  };

  return (
    <>
      <header className="App-header">
        <img
          style={{ marginTop: "1%" }}
          src={logo}
          className="App-logo"
          alt="logo"
        />

        <h1 style={{ marginTop: "1%" }}>Energy Live 2022</h1>
        
        <Button
          href="http://localhost:5000/auth/google"
          style={{ backgroundColor:"#507099", margin: "10vh" }}
          variant="primary"
          size="lg"
          active
        >
          Sign in with Google
        </Button>

        <div
          style={{
            minWidth: "70%",
            borderTop: "2px solid #000",
            marginTop: "10px",
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>
        <>
          <Navbar style={{ color: "black", margin: "0vh" }}>
            <Container className="navigationBar">
              <Nav className="me-auto">
                <Nav.Link
                  style={{ color: "black", margin: "5vh" ,fontSize: '22px' }}
                  href="/About"
                >
                  About
                </Nav.Link>

                <Nav.Link
                  style={{ color: "black", margin: "5vh" ,fontSize: '22px' }}
                  href="/Plans"
                >
                  Plans
                </Nav.Link>

                <Nav.Link
                  style={{ color: "black", margin: "5vh", fontSize: '22px' }}
                  href="/Legal"
                >
                  Legal
                </Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      </header>
    </>
  );
}
