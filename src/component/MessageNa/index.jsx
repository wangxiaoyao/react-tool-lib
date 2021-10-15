import style from "./style.less";

/**
 * 此组件为弹出信息组件，用于弹出信息展示（后缀之名:以纪念一段情缘 望她永远都好）
 * 在id为root上  全局上进行新增一个div   2 内容会消失 但是div元素不会消失，从而保证永远只会有一个message的div
 * @param {string} content  传递的内容
 * @param {number} duration 多长时间消失，默认2S
 * @returns
 */

// render()的作用：就是将虚拟DOM转化为真实的DOM节点，并渲染出来。 虚拟DOM：利用js对象模拟真实的DOM节点： tag（div），props（class），children（）三个属性
const MessageNa = (content, duration) => {
  const newMainWrapDiv = document.getElementById("messageNa")
    ? document.getElementById("messageNa")
    : document.createElement("div");

  newMainWrapDiv.setAttribute("id", "messageNa");
  newMainWrapDiv.className = `${style.newWrapDiv}`;
  document.getElementById("root").appendChild(newMainWrapDiv);

  const newDiv = document.createElement("div");
  newDiv.className = `${style.newDiv}`;
  document.getElementById("messageNa").appendChild(newDiv);

  const newInnerDiv = document.createElement("div");
  newInnerDiv.className = `${style.newInnerDiv}`;
  newInnerDiv.innerText = content;
  newDiv.appendChild(newInnerDiv);

  setTimeout(() => {
    newDiv.remove();
  }, duration || 2000);
};

export default MessageNa;
