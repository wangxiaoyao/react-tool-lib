import React, { useEffect, useState } from "react";
import { Chart } from "@antv/g2";

const G2Base = (props) => {
  const { idProps, graphData } = props;
  const [chartVal, setChartVal] = useState("");

  useEffect(() => {
    const chart = new Chart({
      container: idProps,
      height: 500,
      width: 600,
    });

    chart.data(graphData);
    chart.scale("sales", {
      nice: true,
    });

    chart.tooltip({
      showMarkers: false,
    });
    chart.interaction("active-region");

    chart.interval().position("year*sales");

    chart.render();
    setChartVal(chart);
  }, []);

  useEffect(() => {
    if (chartVal) {
      chartVal.changeData(graphData);
    }
  }, [graphData]);

  return <div id={idProps}></div>;
};

export default G2Base;
