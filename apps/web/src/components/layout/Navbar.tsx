import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * 导航栏组件
 * 包含应用标题和创建按钮
 */
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-800">提示词管理器</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className={`$ {
                  location.pathname === "/"
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                提示词
              </Link>
              <Link
                to="/templates"
                className={`$ {
                  location.pathname === "/templates"
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                模板
              </Link>
              <Link
                to="/tags"
                className={`$ {
                  location.pathname === "/tags"
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
              >
                标签
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => navigate("/create")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              新建提示词
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
