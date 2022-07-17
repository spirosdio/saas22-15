import React from "react";

import logo from "./logo.png";
import axios from "axios";
import { useState, useEffect } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";
import "./App.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { ListGroup } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { Col } from "react-bootstrap";

export default function Profile() {
  const history = useHistory();
  let daysLeft = "32";
  const coursesPage = () => {
    history.push("/main1");
  };
  const [value, setValue] = useState(0);
  const [plan, setPlan] = useState("");
  const [data, setData] = useState(null);

  const [id, setId] =useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [daysleftt, setDaysLeft] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  const handleSelect = (e) => {
    setValue(e);
  };
  
  
  //console.log(updatedPlan);

  /*
  const plann = (id) => {
    axios({
      method: "PUT",
      data: {
        "daysleft" : updatedPlan,
      },
      withCredentials: true,
      url: "http://localhost:5000/auth/extend/:id",
    }).then((res) => console.log(res));
  };
  useEffect(() => {
    plann(id);
  }, []);
  */
  /*
  const plann = () => {
    axios({
      method: "POST",
      data: {
        daysLeft: value,
      },
      withCredentials: true,
      url: "http://localhost:5000/auth/extend",
    }).then((res) => console.log(res));
  };
  */
  
  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:5000/user/get-user",
    }).then((res) => {
      setId(res.data._id);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setEmail(res.data.email);
      setDaysLeft(res.data.daysleft);
      setLastLogin(res.data.createdAt);
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  
  
  let updatedPlan = parseInt(value) + parseInt(daysleftt);
  const data1 = { daysleft : updatedPlan};
  const update = () =>{
    console.log(data1);
      axios.patch(`http://localhost:5000/auth/extend/${id}`,data1)
  };
  

  const date = lastLogin.slice(0, 10); //set last login date
  const time = lastLogin.slice(11, 19); //set last login time
  const dateTime = date + " , " + time;
  return (
    <>
      <header className="App-header">
        <h1>Energy Live 2022</h1>

        <Row>
          <Col style={{ backgroundColor: "grey" }}>First Name</Col>
          <Col>{firstName}</Col>
        </Row>
        <Row>
          <Col style={{ backgroundColor: "grey" }}>Last Name</Col>
          <Col>{lastName}</Col>
        </Row>
        <Row>
          <Col style={{ backgroundColor: "grey" }}>Email address</Col>
          <Col>{email}</Col>
        </Row>
        <Row>
          <Col style={{ backgroundColor: "grey" }}>Last Login</Col>
          <Col>{date}</Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Row>
              <Col>
                <p>Days left: {daysleftt}</p>
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
            onClick={update}
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