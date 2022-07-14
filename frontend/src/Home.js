import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import logo from "./logo.png";

import "./App.css";

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
          style={{ marginTop: "2%" }}
          src={logo}
          className="App-logo"
          alt="logo"
        />

        <h1>Energy Live 2022</h1>

        <Button
          onClick={coursesPage}
          style={{ margin: "10vh" }}
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
            marginLeft: 20,
            marginRight: 20,
          }}
        ></div>

        <NavBar></NavBar>
      </header>
    </>
  );
}

function NavBar() {
  return (
    <>
      <Navbar style={{ color: "black", margin: "5vh" }}>
        <Container className="navigationBar">
          <Nav className="me-auto">
            <Nav.Link style={{ color: "black", margin: "5vh" }} href="/About">
              About
            </Nav.Link>

            <Nav.Link style={{ color: "black", margin: "5vh" }} href="/Plans">
              Plans
            </Nav.Link>

            <Nav.Link style={{ color: "black", margin: "5vh" }} href="/Legal">
              Legal
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
