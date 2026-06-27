import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <header className="px-4 sm:px-8 bg-[#F8F5F1] border-b">
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        sm:px-8
        py-4
        flex
        flex-col
        sm:flex-row
        items-center
        justify-between
        gap-4"
      >
        {/* ロゴ */}
        <div>
          <Link to="/dashboard">
            <img
              src="/logo.png"
              alt="Bridal Note"
              className="w-48 sm:w-64 h-auto transition-opacity duration-300 hover:opacity-80"
            />
          </Link>
        </div>

        {/* ナビ */}
        <nav className="flex items-center gap-3 sm:gap-8 text-sm tracking-widest text-[#6B5B53] ">
          <Link to="/dashboard" className="hover:text-[#DCB39C] transition">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              <span>HOME</span>
            </div>
          </Link>

          <Link to="/todos" className="hover:text-[#DCB39C] transition">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span>TODO</span>
            </div>
          </Link>

          <Link to="/guests" className="hover:text-[#DCB39C] transition">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
              </svg>
              <span>GUEST</span>
            </div>
          </Link>

          <button
            onClick={handleLogout}
            className="
            m-button
            px-4
            sm:px-8
            py-2
            rounded-md"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
