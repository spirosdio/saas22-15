import React from "react";

import { FormSelect, Form } from "react-bootstrap";
import DropDownCountries from "./DropDownCountries";

export default function DropDownGT() {
  return (
    <>
      <label> Generation Type </label>

      <Form.Select aria-label="Default select example">
        <option value="" selected></option>

        <option value="1">Natural Gas 1</option>

        <option value="2">Natural Gas 2</option>

        <option value="3">Natural Gas 3</option>
      </Form.Select>
    </>
  );
}
