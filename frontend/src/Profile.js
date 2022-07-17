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
      axios.patch(`http://localhost:5000/user/extend/${id}`,data1)
  };
  

  const date = lastLogin.slice(0, 10); //set last login date
  const time = lastLogin.slice(11, 19); //set last login time
  const dateTime = date + " , " + time;
  return (
    <>
      <header className="App-header">
        <h1 style={{marginBottom: "10vh"}}>Energy Live 2022</h1>

        <Row>
          <Col className="button2" style={{ backgroundColor: "grey", width: '560px' , marginBottom: "2vh"}}>First Name:</Col>
          <Col className="button2" style={{marginBottom: "2vh"}} >{firstName}</Col>
        </Row>
        <Row>
          <Col className="button2" style={{ backgroundColor: "grey", width: '502px' , marginBottom: "2vh"}}>Last Name:</Col>
          <Col className="button2" style={{marginBottom: "2vh"}}>{lastName}</Col>
        </Row>
        <Row>
          <Col className="button2" style={{ backgroundColor: "grey", width: '380px' , marginBottom: "2vh"}}>Email address:</Col>
          <Col className="button2" style={{marginBottom: "2vh"}}>{email}</Col>
        </Row>
        <Row>
          <Col className="button2" style={{ backgroundColor: "grey", width: '334px', marginBottom: "2vh" }}>Last Login:</Col>
          <Col className="button2" style={{marginBottom: "2vh"}}>Date: {date} Time:{time}</Col>
        </Row>
        <Row>
          <Col></Col>
          <Col></Col>
        </Row>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Row>
              <Col className="button2" style={{ backgroundColor: "grey", width: '570px', marginBottom: "2vh" , marginRight: "30px"}}>
                <p>Days left: {daysleftt}</p>
              </Col>
              <Col>
                <DropdownButton
                  className="d-grid gap-2"
                  variant="light"
                  title={value}
                  id="dropdown-menu-align-right"
                  onSelect={handleSelect}
                  style={{ marginTop: "5px", marginLeft: "0px" }}
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

          <button
            className="button"
            variant="primary"
            type="submit"
            style={{ marginRight: "40px" }}
            onClick={update}
          >
            Extend
          </button>

          <button variant="primary" type="cancel" className="button">
            Cancel
          </button>
        </Form>

        <a className="button" href="/main1" style={{ marginTop: "30px" }}>
          Back
        </a>
      </header>
    </>
  );
}
