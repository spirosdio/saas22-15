import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
const myGlobalClockURL = "http://localhost:3020/";

function TheHighs({
  changingUrl,
  parentQuantity,
  parentCountry,
  parentType,
  parentCountry2,
}) {
  const [counter, setCounter] = useState([]);

  let myTemp = [];
  const [myOptins, setMyOptins] = useState({});
  const doTheDDOS = process.env.MAGIC_CLOCK_INTERVAL * 1000;

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get(CreateAgainUrl(changingUrl))
        .then((res) => {
          myTemp = DateStringArrayToEpoch(res.data);
          myTemp = ArrayOfObjectsToArrayOfArrays(myTemp, parentQuantity);

          setMyOptins({
            //Highcharts.stockChart('container', {
            rangeSelector: {
              selected: 1,
            },

            title: {
              text: changingUrl,
            },

            series: [
              {
                name: changingUrl,
                data: myTemp,
                tooltip: {
                  valueDecimals: 2,
                },
              },
            ],
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});

      axios
        .get(myGlobalClockURL)
        .then((res) => {
          setCounter(res.data.date);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {});
    }, doTheDDOS);

    return () => clearInterval(interval);
  }, []);

  const download2 = (e) => {
    download("data.json", myTemp.toString());
  };
  const download3 = (e) => {
    download("data.png", myTemp.toString());
  };
  return (
    <div className="App">
      <Row>
        <Col>
          <div style={{ color: "white" }}>{parentCountry} </div>
        </Col>
        <Col>
          <div style={{ color: "white" }}>{parentQuantity}</div>
        </Col>
        <Col>
          {parentQuantity === "Actual Total Load" ? (
            <></>
          ) : (
            <>
              {parentQuantity === "Physical Flows" ? (
                <>
                  <div style={{ color: "white" }}>{parentType}</div>
                </>
              ) : (
                <>
                  <div style={{ color: "white" }}>{parentCountry2}</div>
                </>
              )}
            </>
          )}
        </Col>
        <Col>Here We Can See The Params</Col>
      </Row>
      <div>
        <HighchartsReact highcharts={Highcharts} options={myOptins} />
      </div>

      <p style={{ textAlign: "left" }}>Latest Update: {counter}:00 </p>

      <Row>
        <Col>
          <Button onClick={download3}>Download Image</Button>
        </Col>
        <Col>
          <Button onClick={download2}>Download Data</Button>
        </Col>
      </Row>
    </div>
  );
}

export default TheHighs;

function download(filename, text) {
  var pom = document.createElement("a");
  pom.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  pom.setAttribute("download", filename);

  if (document.createEvent) {
    var event = document.createEvent("MouseEvents");
    event.initEvent("click", true, true);
    pom.dispatchEvent(event);
  } else {
    pom.click();
  }
}

function DateStringArrayToEpoch(myJson) {
  for (let i = 0; i < myJson.length; i++) {
    myJson[i].DateTime = new Date(myJson[i].DateTime).getTime();
  }
  return myJson;
}
function ArrayOfObjectsToArrayOfArrays(myJson, parentQuantity) {
  let myJsonArray = [];

  const QuantitiesObject = {
    "Actual Total Load": "TotalLoadValue",
    "Aggregate Generation per Type": "ActualGenerationOutput",
    "Physical Flows": "FlowValue",
  };
  if (parentQuantity === "Aggregate Generation per Type") {
    for (let i = 0; i < myJson.length; i++) {
      myJsonArray.push([myJson[i].DateTime, myJson[i].ActualGenerationOutput]);
    }
  }else{
  if (parentQuantity === "Physical Flows") {
    for (let i = 0; i < myJson.length; i++) {
      myJsonArray.push([myJson[i].DateTime, myJson[i].FlowValue]);
    }
  }else {
    for (let i = 0; i < myJson.length; i++) {
      myJsonArray.push([myJson[i].DateTime, myJson[i].TotalLoadValue]);
    }
  }
  }
  return myJsonArray;
}

function CreateAgainUrl(myUrl) {
  let myNewUrl = myUrl.replace("http://", "http://");
  return myNewUrl;
}
