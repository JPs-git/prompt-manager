import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

/**
 * 应用主组件
 * 配置路由和全局布局
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
