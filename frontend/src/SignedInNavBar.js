import React , {useEffect,useState} from "react";
import axios from "axios";
import { Navbar, Container, Nav } from "react-bootstrap";

export default function SignedInNavBar() {
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
  useEffect(() => {getName()},[]); 

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
