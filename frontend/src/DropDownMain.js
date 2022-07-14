import React from "react";

import DropdownButton from "react-bootstrap/DropdownButton";

import Dropdown from "react-bootstrap/Dropdown";

import { useState } from "react";

import DropDownGT from "./DropDownGT";

import DropDownCountries from "./DropDownCountries";

export default function DropDownMain() {
  const [value, setValue] = useState("");

  const handleSelect = (e) => {
    setValue(e);
  };

  return (
    <>
      <label> Quantity </label>

      <DropdownButton
        className="d-grid gap-2"
        variant="light"
        title={value}
        id="dropdown-menu-align-right"
        onSelect={handleSelect}
      >
        <Dropdown.Item eventKey="Actual Total Food">
          Actual Total Food
        </Dropdown.Item>

        <Dropdown.Item eventKey="Cross Border Flows">
          Cross Border Flows
        </Dropdown.Item>

        <Dropdown.Item eventKey="Generation Per Type">
          Generation Per Type
        </Dropdown.Item>
      </DropdownButton>

      <DropDownCountries></DropDownCountries>
      {value == "Cross Border Flows" ? (
        <DropDownCountries></DropDownCountries>
      ) : (
        " "
      )}

      {value == "Generation Per Type" ? <DropDownGT></DropDownGT> : " "}
    </>
  );
}
