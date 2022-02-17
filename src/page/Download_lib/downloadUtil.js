import XLSX from "xlsx";

// 将blob对象创建blobUrl， 由创建的a标签触发点击事件。下载这个生成的地址。
function openDownloadDialog(blob, fileName) {
  console.log("blob", blob);
  if (typeof blob === "object" && blob instanceof Blob) {
    // createObjectURL方法：创建一个指向Blob，File对象的URL
    blob = URL.createObjectURL(blob);
  }
  // 创建a标签：链接和文件名。注意，有时候 file:///模式下文件名不会生效
  const aLink = document.createElement("a");
  aLink.href = blob;
  aLink.download = fileName || "";
  let event;
  if (window.MouseEvent) event = new MouseEvent("click");
  //   移动端
  else {
    event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
  }
  aLink.dispatchEvent(event);
}

// 将workbook转化成blob对象
function workbook2blob(workbook) {
  // 生成excel的配置项
  const wopts = {
    // 要生成的文件类型
    bookType: "xlsx",
    // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    bookSST: false,
    type: "binary",
  };
  const wbout = XLSX.write(workbook, wopts);
  // 将字符串转ArrayBuffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  const blob = new Blob([s2ab(wbout)], {
    type: "application/octet-stream",
  });
  return blob;
}

/**
 * 表格下载
 * @param {obj} excelConfig
 */
export const downloadDataToExcel = (excelConfig, dealDownTableData) => {
  const resolveData = dealDownTableData(
    excelConfig.excelStruct,
    excelConfig.data
  );
  // 1 将二维数组转为sheet: 注意XLSX的 版本是17
  const sheet = XLSX.utils.aoa_to_sheet(resolveData);
  // 合并单元格: s: 表示第一行，第二列   e 表示第一行，第五列。 这个区间进行合并。
  sheet["!merges"] = [{ s: { r: 0, c: 1 }, e: { r: 0, c: 4 } }];
  // 2 wb
  const wb = XLSX.utils.book_new();
  // 3 合
  XLSX.utils.book_append_sheet(wb, sheet);
  // 转为blob
  const workbookBlob = workbook2blob(wb);
  // 下载
  openDownloadDialog(workbookBlob, `${excelConfig.title}.xlsx`);
};
