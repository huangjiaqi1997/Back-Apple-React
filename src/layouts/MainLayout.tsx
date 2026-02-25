import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = ({
  header,
  footer,
}: {
  header?: ReactNode;
  footer?: ReactNode;
}) => {
  return (
    <div className="bg-apple-light dark:bg-apple-dark">
      {header ?? <h1>默认标题</h1>}
      <div className="min-h-screen bg-apple-white dark:bg-apple-dark text-apple-text dark:text-apple-text-dark">
        <Outlet />
        {/* Outlet 用于渲染嵌套路由的内容 */}
      </div>
      {footer ?? <p>默认页脚</p>}
    </div>
  );
};

export default MainLayout;
// 这个组件是一个简单的布局组件，它接收三个 props：header、content 和 footer。
// 如果没有传入这些 props，它会使用默认的标题、内容和页脚。
