import React, { useEffect } from "react";

const Page1 = (props) => {
  useEffect(() => {
    console.log("取值", props);
    console.log(
      "针对Link来取值：target=_blank时无法获取state值 ",
      props.location
    );
  }, []);
  return <div>page1</div>;
};

export default Page1;
