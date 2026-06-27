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
    fetch("/api/guests")
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

    const res = await fetch("/api/guests", {
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
    const res = await fetch(`/api/guests/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("削除失敗");
      return;
    }

    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  };

  const updateGuestStatus = async (id: number, newStatus: string) => {
    const res = await fetch(`/api/guests/${id}`, {
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-6">
              <h2 className="text-2xl font-bold">Add Guest</h2>

              <Link
                to="/guests"
                className="group flex items-center gap-2 text-[#8c7869] hover:text-[#5f4e42] transition-colors duration-300"
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                >
                  <path
                    d="M8.84 3.34a.5.5 0 0 1 0 .71L5.9 7l2.94 2.95a.5.5 0 0 1-.71.7L4.84 7.35a.5.5 0 0 1 0-.7l3.29-3.3a.5.5 0 0 1 .71 0Z"
                    fill="currentColor"
                  />
                </svg>

                <span>Back</span>
              </Link>
            </div>

            {/* フォーム */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">name</label>

                <input
                  type="text"
                  placeholder="例：田中花子"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6B5B53]"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">relation</label>

                <input
                  type="text"
                  placeholder="例：友人"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6B5B53]"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">attendance</label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6B5B53]"
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
                  m-button
                  w-full
                  sm:w-auto
                  px-5
                  py-2
                  transition"
                >
                  登録
                </button>
              </div>
            </form>
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-[#6B5B53] mb-4">
                Guests <span className="text-[#9A8B82]">({guests.length})</span>
              </h3>

              <ul className="divide-y divide-[#E8E1DB]">
                {guests.map((guest) => (
                  <li
                    key={guest.id}
                    className="
                    py-4
                    flex
                    flex-col
                    sm:flex-row
                    justify-between
                    items-start
                    sm:items-center
                    gap-3"
                  >
                    <div>
                      <p className="font-medium text-[#6B5B53]">{guest.name}</p>
                      <p className="text-sm text-[#9A8B82]">{guest.relation}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <select
                        value={guest.status}
                        onChange={(e) =>
                          updateGuestStatus(guest.id, e.target.value)
                        }
                        className="
                        rounded-lg
                        border
                        border-[#D9CEC5]
                        px-3
                        py-2
                        text-sm
                        bg-white
                        text-[#6B5B53]
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[#B99E8A]"
                      >
                        <option>未回答</option>
                        <option>出席</option>
                        <option>欠席</option>
                      </select>

                      <button
                        onClick={() => deleteGuest(guest.id)}
                        className="
                        text-sm
                        text-[#8c7869]
                        transition-all
                        duration-300
                        hover:text-[#5f4e42]
                        hover:underline
                        underline-offset-4"
                      >
                        Remove
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
