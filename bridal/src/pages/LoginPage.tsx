import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-rose-400 mb-2">
          💍 Bridal Note
        </h1>

        <p className="text-center text-gray-500 mb-8">ログイン</p>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">メールアドレス</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">パスワード</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-rose-400 hover:bg-rose-500 text-white py-3 rounded-lg transition"
          >
            ログイン
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
