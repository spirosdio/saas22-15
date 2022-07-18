import "./App.css";
import MyChart from "./MyChart";
import React from "react";
import axios from "axios";
import { useState } from "react";

//////////////   my constants to be variables from avar////////////////////////////////////////////////////////////////
const ATL = "Actual Total Load";
const AGPT = "Aggregate Generation per Type";
const PF = "Physical Flows";

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
      myCountry;
    setMyUrl(tempUrl);
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>hello</p>
        <MyChart configObj={configObj} />
        <label>URL now is {myDateString}</label>
        <input
          type="text"
          placeholder="enter datefrom"
          onChange={(event) => {
            setMyDateString(event.target.value);
            console.log(event.target.value);
          }}
        ></input>

        <label>quantity now is {Ports[myQuantity]}</label>
        <input
          type="text"
          placeholder="enter quantity"
          onChange={(event) => {
            setMyQuantity(event.target.value);
            console.log(event.target.value);
          }}
        ></input>
        <label>country now is {myCountry}</label>
        <input
          type="text"
          placeholder="enter country"
          onChange={(event) => {
            setMyCountry(event.target.value);
            console.log(event.target.value);
          }}
        ></input>
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
