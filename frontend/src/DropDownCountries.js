import axios from "axios";

import React from "react";

import { Form, FormSelect } from "react-bootstrap";

import { useEffect } from "react";

import { useState } from "react";

export default function DropDownCountries() {
  const [data, setData] = useState([]);

  const [country, setCountry] = useState([]);

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
    <div>
      <label> Country </label>

      <Form.Select>
        <option value="" selected></option>

        {countries.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}
