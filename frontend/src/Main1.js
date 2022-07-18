import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Row, Col, Button } from "react-bootstrap";
import CreateURL from "./CreateURL";
import TheHighs from "./TheHighs";
const myGlobalClockURL = "http://localhost:3020/";
const status = "Active";

export default function Main1() {
  let status = "Not Live";
  const [changingUrl, setChangingUrl] = useState(
    "http://localhost:3001/2022-01-01&GRCTY"
  );
  const [parentQuantity, setParentQuantity] = useState("");
  const [parentCountry, setParentCountry] = useState("");
  const [parentCountry2, setParentCountry2] = useState("");
  const [parentType, setParentType] = useState("");

  const handleRefreshparent = (newUrl, quantity, country, type, country2) => {
    const newUrl2 = newUrl;
    setChangingUrl(newUrl2);
    setParentQuantity(quantity);
    setParentCountry(country);
    setParentCountry2(type);
    setParentType(country2);
    forceUpdate();
  };
  const [helper, setHelper] = useState(false);
  function forceUpdate() {
    setHelper(!helper);
  }
  return (
    <Container style={{}}>
      <Row>
        <Col>
          <SignedInNavBar></SignedInNavBar>
        </Col>
      </Row>

      <Row>
        <Col className="leftColumn" xs={4} style={{ backgroundColor: "gray" }}>
          <CreateURL
            changingUrl={changingUrl}
            handleRefreshparent={handleRefreshparent}
          />
        </Col>

        <Col className="maincolumn" style={{}}>
          <>
            <div>
              <TheHighs
                changingUrl={changingUrl}
                parentQuantity={parentQuantity}
                parentCountry={parentCountry}
                parentCountry2={parentCountry2}
                parentType={parentType}
              />
            </div>
          </>
          <div
            style={{
              minWidth: "70%",
              borderTop: "2px solid #000",
              marginLeft: 20,
              marginRight: 20,
              marginTop: 60,
            }}
          ></div>
          <Bottomrow></Bottomrow>
        </Col>
      </Row>
    </Container>
  );
}
function Bottomrow() {
  return (
    <Row className="bottomrow" style={{ margin: "1%", margin: "1px" }}>
      <Col>
        <div style={{ color: "black" }} href="/Legal">
          Service Status: {status}
        </div>
      </Col>
      <Col>
        <DaysLeft></DaysLeft>
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
  );
}
function SignedInNavBar() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [daysleftt, setDaysLeft] = useState("");
  const getName = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user/get-user",
    }).then((res) => {
      setName(res.data.displayName);
      setId(res.data._id);
      setDaysLeft(res.data.daysleft);
    });
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <>
      <Navbar>
        <Container className="navbar">
          <Navbar.Brand href="/main1" style={{ fontSize: "23px" }}>
            EnergyLive2022
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <GlobalClock />
          </Navbar.Collapse>
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
function GlobalClock() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(myGlobalClockURL)
        .then((res) => {
          setCounter(res.data.date);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <Navbar.Text>Datetime Is: {counter}:00 </Navbar.Text>
    </div>
  );
}
function DaysLeft() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [daysleftt, setDaysLeft] = useState("");
  const [myTime, setmyTime] = useState([]);

  const getName = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user/get-user",
    }).then((res) => {
      setName(res.data.displayName);
      setId(res.data._id);
      setDaysLeft(res.data.daysleft);
    });
  };
  const getTime = () => {
    axios
      .get(myGlobalClockURL)
      .then((res) => {
        setmyTime(res.data.date);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  };

  useEffect(() => {
    const interval2 = setInterval(() => {
      getName();
    }, 1000);

    return () => clearInterval(interval2);
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const manipulateTime = myTime.slice(11, 13);
  if (manipulateTime == "00") {
    let daysLeftNew = parseInt(daysleftt) - 1;
    if (daysLeftNew < 1) {
      alert("Please extend your plan");
      daysLeftNew = 0;
    }
    const data1 = { daysleft: daysLeftNew };
    const update = () => {
      axios.patch(`http://localhost:5000/user/extend/${id}`, data1);
    };
    update();
  }

  return (
    <div className="App">
      <Navbar.Text>DaysLeft: {daysleftt} </Navbar.Text>
    </div>
  );
}
