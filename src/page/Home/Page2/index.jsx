import React, { useEffect } from "react";

const Page2 = (props) => {
  useEffect(() => {
    console.log("取值手法相同", props);
  }, []);

  return <div>page2</div>;
};

export default Page2;
