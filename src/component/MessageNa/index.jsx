import ReactDOM from "react-dom";
import style from "./style.less";

/**
 * 此组件： 1 在id为root上  全局上进行新增一个div   2 内容会消失 但是div元素不会消失，从而保证永远只会有一个message的div
 */

/**
 * 此组件为弹出信息组件，用于弹出信息展示（后缀之名以纪念一段情缘 望她永远都好）
 * @param {string} content
 * @param {number} duration
 * @returns
 */

var messageInstance;
var defaultDuration = 3;
var defaultTop;

/**
 * 设置message的配置文件
 * @param {obj} options
 */

function setMessageConfig(options) {
  if (options.top !== undefined) {
    defaultTop = options.top;
    messageInstance = null; // delete messageInstance for new defaultTop
  }

  if (options.duration !== undefined) {
    defaultDuration = options.duration;
  }
}

const MessageNa = (content, duration) => {
  // const element = <h1>{content}</h1>;
  // ReactDOM.render(element, document.getElementById("root"));
  return <div className={style.messageNa}>{content}</div>;
};

export default MessageNa;
