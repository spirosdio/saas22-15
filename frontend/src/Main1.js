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
const ATL = "Actual Total Load";
const AGPT = "Agregate generation per type";
const PF = "Physical Flows";

export default function Main1() {
  let status = "Not Live";
  let daysLeft = 32;
  let Quantity = "Quantity";
  let Country = "Country";
  let Param2 = "Param2";

  const [value, setValue] = useState("");

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
  const [dateFrom, setDateFrom] = useState("2022-01-01T00:08");
  const [country, setCountry] = useState("");
  const [quantity, setQuantity] = useState("");
  const [param2, setParam2] = useState("");
  const displayInfo = () => {
    console.log(country);
    console.log(quantity);
    console.log(param2);
    console.log(dateFrom);
  };

  const [data, setData] = useState([]);

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
    <Container style={{}}>
      <Row>
        <Col>
          <SignedInNavBar></SignedInNavBar>
        </Col>
      </Row>

      <Row>
        <Col className="leftRow" xs={4} style={{ backgroundColor: "gray" }}>
          <label>Date From</label>
          <input
            type={"datetime-local"}
            onChange={(event) => {
              setDateFrom(event.target.value);
            }}
          ></input>
          <label>Country</label>

          <select
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          >
            <option value="" selected></option>
            {countries.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <p></p>
          <label>Quantity</label>
          <select
            onChange={(event) => {
              setQuantity(event.target.value);

              setParam2("");

              console.log(
                event.target.value,
                param2,
                "quantity has changes and now "
              );
              if (event.target.value === AGPT) {
              }
              if (event.target.value === PF) {
              }
            }}
          >
            <option key="" selected></option>
            <option key={ATL}>{ATL}</option>
            <option key={AGPT}>{AGPT}</option>
            <option key={PF}>{PF}</option>
          </select>

          <p></p>
          {quantity === AGPT ? (
            <>
              <label>Generation Type</label>
              <input
                type="text"
                onChange={(event) => {
                  setParam2(event.target.value);
                }}
              ></input>
            </>
          ) : (
            ""
          )}
          {quantity === PF ? (
            <>
              <label>Second Country</label>

              <select
                onChange={(event) => {
                  setParam2(event.target.value);
                }}
              >
                <option value="" selected></option>
                {countries.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </>
          ) : (
            " "
          )}
          <p></p>
          <button onClick={displayInfo}>Refresh</button>
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
  const myUrl = "http://localhost:3020/";

  const [myTime, setmyTime] = useState([]);

  const getmyTime = () => {
    axios
      .get(myUrl)
      .then((res) => {
        setmyTime(res.data.date);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finally");
      });
  };

  useEffect(() => {
    getmyTime();
  }, []);
  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href="/main1">EnergyLive2022</Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>Datetime Is: {myTime}:00 </Navbar.Text>
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
