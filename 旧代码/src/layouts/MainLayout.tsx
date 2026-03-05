import type { ReactNode } from "react"
import { Outlet } from "react-router-dom"

const MainLayout = ({ header, footer}: {
  header?: ReactNode,
  footer?: ReactNode
}) => {

  return (
    <div>
      {header ?? <h1>默认标题</h1>}
      <Outlet />
      {footer ?? <footer>默认页脚</footer>}
    </div>
  )
}

export default MainLayout

