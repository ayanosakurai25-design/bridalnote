import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type Guest = {
  id: number;
  name: string;
  relation: string;
  status: string;
};
function GuestCreatePage() {
  const [guestName, setGuestName] = useState("");
  const [relation, setRelation] = useState("");
  const [status, setStatus] = useState("未回答");
  const [guests, setGuests] = useState<Guest[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/guests")
      .then((res) => res.json())
      .then((data) => {
        setGuests(data);
      })
      .catch((err) => {
        console.error("ゲスト取得エラー:", err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!guestName.trim()) {
      return;
    }

    const res = await fetch("http://localhost:3000/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: guestName,
        relation,
        status,
      }),
    });

    if (!res.ok) {
      console.error("登録失敗");
      return;
    }

    const newGuest = await res.json();

    setGuests((prev) => [...prev, newGuest]);

    setGuestName("");
    setRelation("");
    setStatus("未回答");
  };
  const deleteGuest = async (id: number) => {
    const res = await fetch(`http://localhost:3000/guests/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("削除失敗");
      return;
    }

    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  };

  const updateGuestStatus = async (id: number, newStatus: string) => {
    const res = await fetch(`http://localhost:3000/guests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    if (!res.ok) {
      console.error("更新失敗");
      return;
    }

    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, status: newStatus } : guest,
      ),
    );
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-stone-50 p-4 sm:p-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            {/* タイトルと戻るボタン */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">ゲスト追加</h2>

              <Link
                to="/guests"
                className="px-3 py-1 border border-rose-300 rounded-full text-rose-500 hover:bg-rose-50 transition"
              >
                ← 戻る
              </Link>
            </div>

            {/* フォーム */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">名前</label>

                <input
                  type="text"
                  placeholder="例：田中花子"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">続柄</label>

                <input
                  type="text"
                  placeholder="例：友人"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">出欠</label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                >
                  <option>未回答</option>
                  <option>出席</option>
                  <option>欠席</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="
                  w-full
                  sm:w-auto
                  bg-rose-400
                  hover:bg-rose-500
                  text-white
                  px-5
                  py-2
                  rounded-lg
                  shadow-md
                  transition"
                >
                  登録
                </button>
              </div>
            </form>
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">
                登録したゲスト ({guests.length}件)
              </h3>

              <ul>
                {guests.map((guest) => (
                  <li
                    key={guest.id}
                    className="
                    border-b
                    py-2
                    flex
                    flex-col
                    sm:flex-row
                    justify-between
                    items-start
                    sm:items-center
                    gap-2"
                  >
                    <span>
                      {guest.name} / {guest.relation}
                    </span>

                    <div className="flex items-center gap-3">
                      <select
                        value={guest.status}
                        onChange={(e) =>
                          updateGuestStatus(guest.id, e.target.value)
                        }
                        className="border rounded p-1"
                      >
                        <option>未回答</option>
                        <option>出席</option>
                        <option>欠席</option>
                      </select>

                      <button
                        onClick={() => deleteGuest(guest.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        削除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GuestCreatePage;
