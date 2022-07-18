import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

function CreateURL({ changingUrlparent, handleRefreshparent }) {
  const ATL = "Actual Total Load";
  const AGPT = "Actual Generation Per Unit";
  const PF = "Physical Flows";
  const QuantitiesObject = {
    "Actual Total Load": "ATL",
    "Actual Generation Per Unit": "AGPT",
    "Physical Flows": "PF",
  };
  const TypesObject = {
    Biomass: "Biomass",
    "Fossil Brown coal/Lignite": "FossilBrowncoalLignite",
    "Fossil Coal-derived gas": "FossilCoalderivedgas",
    "Fossil Gas": "FossilGas",
    "Fossil Hard coal": "FossilHardcoal",
    "Fossil Oil": "FossilOil",
    "Fossil Oil shale": "FossilOilshale",
    "Fossil Peat": "FossilPeat",
    Geothermal: "Geothermal",
    "Hydro Pumped Storage": "HydroPumpedStorage",
    "Hydro Run-of-river and poundage": "HydroRunofriverandpoundage",
    "Hydro Water Reservoir": "HydroWaterReservoir",
    Marine: "Marine",
    Nuclear: "Nuclear",
    Other: "Other",
    "Other renewable": "Otherrenewable",
    ProductionType: "ProductionType",
    Solar: "Solar",
    Waste: "Waste",
    "Wind Offshore": "WindOffshore",
    "Wind Onshore": "WindOnshore",
  };
  const CountriesObject = {
    Bulgaria: "BGCTY",
    Greece: "GRCTY",
    Italy: "ITCTY",
    "North Macedonia": "MKCTY",
    Turkey: "TRCTY",
  };
  // date from start
  const [dateFrom, setDateFrom] = useState("2022-01-01");
  // date from end

  //my changingUrl start
  const [changingUrl, setChangingUrl] = useState(
    "http://localhost:3001/2022-01-01&ALCTY"
  );
  //my changingUrl end

  //my quantity start
  const [quantity, setQuantity] = useState(ATL);
  //my quantity end

  //my type start
  const [type, setType] = useState("Biomass");
  const types = [
    "Biomass",
    "Fossil Brown coal/Lignite",
    "Fossil Coal-derived gas",
    "Fossil Gas",
    "Fossil Hard coal",
    "Fossil Oil",
    "Fossil Oil shale",
    "Fossil Peat",
    "Geothermal",
    "Hydro Pumped Storage",
    "Hydro Run-of-river and poundage",
    "Hydro Water Reservoir",
    "Marine",
    "Nuclear",
    "Other",
    "Other renewable",
    "ProductionType",
    "Solar",
    "Waste",
    "Wind Offshore",
    "Wind Onshore",
  ];
  //my type end

  //my countrys start

  const [country, setCountry] = useState("Albania");
  const [country2, setCountry2] = useState("Austria");

  const countries = [
    "Bulgaria",
    "Greece",
    "Italy",
    "North Macedonia",
    "Turkey",
  ];
  //my countrys end

  return (
    <div className="App">
      <>
        <label>Date From</label>
        <p></p>
        <input
          type={"datetime-local"}
          onChange={(event) => {
            setDateFrom(event.target.value.slice(0, 10));
          }}
        ></input>
      </>
      <>
        <p>country: </p>
        <select
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        >
          <option value=" " selected></option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </>
      <>
        <p>quantity </p>
        <select
          onChange={(event) => {
            setQuantity(event.target.value);

            if (event.target.value === AGPT) {
            }
            if (event.target.value === PF) {
            }
          }}
        >
          <option key={ATL} selected>
            {ATL}
          </option>
          <option key={AGPT}>{AGPT}</option>
          <option key={PF}>{PF}</option>
        </select>
      </>

      <p></p>
      {quantity === AGPT ? (
        <>
          <label>Generation Type</label>
          <p></p>
          <select
            onChange={(event) => {
              setType(event.target.value);
            }}
          >
            <option value=" " selected></option>
            {types.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </>
      ) : (
        ""
      )}
      {quantity === PF ? (
        <>
          <label>Second Country</label>
          <p></p>
          <select
            onChange={(event) => {
              setCountry2(event.target.value);
            }}
          >
            <option value=" " selected></option>
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
      <button
        onClick={() => {
          if (quantity === ATL) {
            setChangingUrl(
              `http://localhost:3001/${dateFrom}&${CountriesObject[country]}`
            );
          } else {
            if (quantity == "Physical Flows") {
              setChangingUrl(
                `http://localhost:3003/${dateFrom}&${CountriesObject[country]}&${CountriesObject[country2]}`
              );
            }
            if (quantity == "Actual Generation Per Unit") {
              setChangingUrl(
                `http://localhost:3002/${dateFrom}&${CountriesObject[country]}&${TypesObject[type]}`
              );
            }
          }

          handleRefreshparent(changingUrl, quantity, country, type, country2);
        }}
      >
        Refresh
      </button>
    </div>
  );
}

export default CreateURL;
