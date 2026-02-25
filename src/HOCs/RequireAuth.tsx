import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (!token) {
    // 如果没有 token，重定向到登录页面，并携带当前路径作为“来源页”
    return (
      <Navigate to="/auth/signin" state={{ from: location.pathname }} replace />
    );
  }
  // 如果有 token，渲染子组件
  return children;
};

export default RequireAuth;
