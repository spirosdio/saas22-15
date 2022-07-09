import React from "react";

import { Navbar, Container, Nav } from "react-bootstrap";

export default function SignedInNavBar() {
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">EnergyLive2022</Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="/profile">Mark Otto</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
