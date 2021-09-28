import React, { useEffect, useState } from "react";
import G2Base from "./G2Base";

import { getG2BaseData } from "./service";

const G2_lib = (props) => {
  const g2Id = {
    base: "contain1",
  };
  const [baseData, setBaseData] = useState([]);

  const getG2BaseDataFun = async (paramVal) => {
    const data = await getG2BaseData(paramVal);
    setBaseData(data);
  };

  useEffect(() => {
    getG2BaseDataFun();
  }, []);

  return (
    <div>
      <h1>G2图表</h1>
      <div>
        <p>1 G2Base:</p>
        <G2Base idProps={g2Id.base} graphData={baseData} />
      </div>
    </div>
  );
};

export default G2_lib;
