//主程序
import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css"; // 引入 CSS 文件
import App from "./App"; // 引入 App 组件

// JSX 是 JavaScript 的语法扩展，它让我们可以在 JavaScript 里直接写出类似 HTML 的结构
// JSX = HTML 的语法 + JavaScript 的能力
const root = document.getElementById("root") ?? document.createElement("div"); // 获取 id 为 root 的 DOM 元素
const rootElement = ReactDOM.createRoot(root); // 创建一个 React 根元素
rootElement.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); // 渲染 App 组件到根元素

// 不推荐！！！
// React 版本（17 及以前）
// ReactDOM.render(<App />, document.getElementById("root"));
