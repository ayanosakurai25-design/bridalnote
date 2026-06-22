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
          <h1 className="text-3xl text-[#D4B29C]">🤍</h1>
        </div>

        {/* ナビ */}
        <nav className="flex items-center gap-3 sm:gap-8 text-sm tracking-widest text-gray-600 ">
          <Link to="/dashboard" className="hover:text-rose-400 transition">
            HOME
          </Link>

          <Link to="/todos" className="hover:text-rose-400 transition">
            TODO
          </Link>

          <Link to="/guests" className="hover:text-rose-400 transition">
            GUEST
          </Link>

          <button
            onClick={handleLogout}
            className="
            bg-[#D4B29C]
            text-white
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
