/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Chart } from "@antv/g2";

const G2Base = (props) => {
  const { idProps, graphData } = props;
  const [chartVal, setChartVal] = useState("");

  const initChart = (chartDataVal) => {
    // eslint-disable-next-line no-underscore-dangle
    const _chart = new Chart({
      container: idProps,
      height: 500,
      width: 600,
    });

    // _chart.legend({
    //   position: "top-center", // 设置图例的显示位置
    //   itemGap: 20, // 图例项之间的间距
    // });
    _chart.data(chartDataVal);
    // 度量优化：使其数值不从0开始
    _chart.scale("sales", {
      nice: true,
    });
    // 另一种写法
    // _chart.data(chartDataVal, {
    //   year: {
    //     alias: "时间",
    //     // type: "time",
    //     // tickCount: 5,
    //     // mask: "DD",
    //   },
    //   sales: {
    //     alias: "金额",
    //     formatter: (val) => `${val}亿元`,
    //     // min: 0,
    //   },
    // });
    _chart.tooltip({
      itemTpl: "<ul><li>{flag}:  {amount}</li> </ul>",
    });
    _chart
      .line()
      .position("year*sales")
      .shape("smooth")
      .color("rgb(94,113,145)")
      .tooltip("year*sales", (year, sales) => ({
        year,
        amount: `${sales}亿元`,
        flag: "tooltip修改方式",
      }));

    _chart.render();
    // 监听tooltip悬浮时候的函数
    _chart.on("tooltip:change", (ev) => {
      console.log("ev", ev);
      // ev.items.forEach((item) => {
      //   item.title = item.point._origin.time;
      // });
    });
    setChartVal(_chart);
  };

  useEffect(() => {
    initChart(graphData);
  }, []);

  useEffect(() => {
    if (chartVal) {
      chartVal.changeData(graphData);
    }
  }, [graphData]);

  return <div id={idProps}></div>;
};

export default G2Base;
