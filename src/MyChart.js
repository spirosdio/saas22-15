import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
function MyChart({ configObj }) {
  return <HighchartsReact highcharts={Highcharts} options={configObj} />;
}
export default MyChart;
