import React from "react";

import "./App.css";

import { Form } from "react-bootstrap";

export default function DatePicker() {
  return (
    <div className="App">
      <div>
        <div className="row">
          <div className="col-md-12">
            <Form.Group>
              <Form.Label>Select Date</Form.Label>

              <Form.Control type="date" placeholder="Date" />
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );
}
