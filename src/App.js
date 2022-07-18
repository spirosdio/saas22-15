import "./App.css";
import MyChart from "./MyChart";
import React from "react";
import axios from "axios";
import { useState } from "react";

//////////////   my constants to be variables from avar////////////////////////////////////////////////////////////////
const ATL = "Actual Total Load";
const AGPT = "Aggregate Generation per Type";
const PF = "Physical Flows";
const quantities = [ATL, AGPT, PF];
const CountriesObject = {
  Bulgaria: "BGCTY",
  Greece: "GRCTY",
  Italy: "ITCTY",
  "North Macedonia": "MKCTY",
  Turkey: "TRCTY",
};
const countries = ["Bulgaria", "Greece", "Italy", "North Macedonia", "Turkey"];
const Ports = {
  "Actual Total Load": "3001",
  "Aggregate Generation per Type": "3002",
  "Physical Flows": "3003",
};
//////////////////////////////////////////////////////////////////////////////////////////////
function App() {
  const [configObj, setConfigObj] = useState({
    title: {
      text: "Solar Employment Growth by Sector, 2010-2016",
    },

    subtitle: {
      text: "Source: thesolarfoundation.com",
    },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2017",
      },
    },

    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "middle",
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: [
      {
        name: "Installation",
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },
  });
  const [mySeries, setMySeries] = useState([]);
  const [myUrl, setMyUrl] = useState("http://localhost:3001/2022-01-01&GRCTY");
  const [myDateString, setMyDateString] = useState("2022-01-01");
  const [myQuantity, setMyQuantity] = useState(ATL);
  const [myCountry, setMyCountry] = useState("GRCTY");
  const getmySeries = () => {
    axios
      .get(myUrl)
      .then((res) => {
        let temp = DateStringArrayToEpoch(res.data);
        temp = ArrayOfObjectsToArrayOfArrays(temp, ATL);

        setMySeries(temp);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        let tempConfig = { ...configObj };
        tempConfig.series = [{ name: ATL, data: mySeries }];
        setConfigObj(tempConfig);

        console.log(
          "You can see here that it seys undefined i don't know why banana",
          configObj.series.data
        );
      });
  };
  const handleClick = async () => {
    let newObj = { ...configObj };

    let myDataArray = getmySeries();

    newObj.series[0].data = myDataArray;
    setConfigObj(newObj);
  };

  const getMyUrl = () => {
    let tempUrl =
      "http://localhost:" +
      Ports[myQuantity] +
      "/" +
      myDateString +
      "&" +
      CountriesObject[myCountry];
    setMyUrl(tempUrl);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>hello</p>
        <MyChart configObj={configObj} />
        <label>date now is {myDateString}</label>
        insert MM-DD-YYYY or click little callendar
        <input
          type={"date"}
          defaultValue={"2022-01-01"}
          onChange={(event) => {
            setMyDateString(event.target.value.slice(0, 10));
          }}
        ></input>
        <label>quantity now is {Ports[myQuantity]}</label>
        <select
          onChange={(event) => {
            setMyQuantity(event.target.value);
          }}
        >
          <option value=" " selected></option>
          {quantities.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label>country code now is {CountriesObject[myCountry]}</label>
        <select
          onChange={(event) => {
            setMyCountry(event.target.value);
          }}
        >
          <option value=" " selected></option>
          {countries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label>url now is {myUrl}</label>
        <button onClick={getMyUrl}>update URL</button>
        <button onClick={handleClick}>
          click and wait a sec and click again to chage data
        </button>
      </header>
    </div>
  );
}

export default App;

function DateStringArrayToEpoch(myJson) {
  for (let i = 0; i < myJson.length; i++) {
    myJson[i].DateTime = new Date(myJson[i].DateTime).getTime();
  }
  return myJson;
}
function ArrayOfObjectsToArrayOfArrays(myJson, parentQuantity) {
  let myJsonArray = [];

  if (parentQuantity === ATL) {
    for (let i = 0; i < myJson.length; i++) {
      myJsonArray.push([myJson[i].DateTime, myJson[i].TotalLoadValue]);
    }
  }
  if (parentQuantity === AGPT) {
    for (let i = 0; i < myJson.length; i++) {
      myJsonArray.push([myJson[i].DateTime, myJson[i].ActualGenerationOutput]);
    }
  }
  if (parentQuantity === PF) {
    for (let i = 0; i < myJson.length; i++) {
      myJsonArray.push([myJson[i].DateTime, myJson[i].FlowValue]);
    }
  }

  return myJsonArray;
}
