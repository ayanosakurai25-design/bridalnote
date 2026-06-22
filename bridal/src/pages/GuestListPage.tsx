import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Guest = {
  id: number;
  name: string;
  relation: string;
  status: string;
};

function GuestListPage() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGuestId, setSelectedGuestId] = useState<number | null>(null);

  const attendingCount = guests.filter(
    (guest) => guest.status === "出席",
  ).length;

  const absentCount = guests.filter((guest) => guest.status === "欠席").length;

  const pendingCount = guests.filter(
    (guest) => guest.status === "未回答",
  ).length;

  const changeStatus = async (id: number, newStatus: string) => {
    await fetch(`http://localhost:3000/guests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    });

    setGuests(
      guests.map((guest) =>
        guest.id === id ? { ...guest, status: newStatus } : guest,
      ),
    );
  };

  const deleteGuest = async (id: number) => {
    await fetch(`http://localhost:3000/guests/${id}`, {
      method: "DELETE",
    });

    setGuests(guests.filter((guest) => guest.id !== id));
  };
  useEffect(() => {
    fetch("http://localhost:3000/guests")
      .then((res) => res.json())
      .then((data) => setGuests(data));
  }, []);
  return (
    <>
      <Header />

      <div className="min-h-screen bg-stone-50 p-8">
        <div className="max-w-4xl mx-auto">
          <div
            className="
            flex
            flex-col
            sm:flex-row
            justify-between
            sm:items-center
            gap-4
            mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold">ゲスト一覧</h1>
              <div
                className="
                mt-2
                flex
                flex-wrap
                gap-x-4
                gap-y-1
                text-sm "
              >
                <p className="text-gray-500">登録ゲスト {guests.length} 名</p>

                <p className="text-green-600">出席 {attendingCount} 名</p>

                <p className="text-red-600">欠席 {absentCount} 名</p>

                <p className="text-gray-600">未回答 {pendingCount} 名</p>
              </div>
            </div>

            <Link
              to="/guests/new"
              className="
              bg-[#6B5B53]
              text-white
              rounded-full
              px-5
              py-3
              text-sm
              whitespace-nowrap
              self-start
              sm:self-auto"
            >
              <span className="sm:hidden">+ GUEST</span>
              <span className="hidden sm:inline">+ ゲスト追加</span>
            </Link>
          </div>

          {guests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md py-16 text-center">
              <p className="text-gray-400 text-sm tracking-[0.3em]">
                NO GUESTS
              </p>

              <div className="w-12 h-px bg-gray-200 mx-auto my-4" />

              <p className="text-gray-500">まだゲストが登録されていません</p>
            </div>
          ) : (
            guests.map((guest) => (
              <div
                key={guest.id}
                className="
                bg-white rounded-xl shadow-md p-4 mb-3
                flex flex-col
                sm:flex-row
                gap-3
                sm:justify-between
                sm:items-center hover:shadow-lg transition"
              >
                <div>
                  <p className="font-semibold text-lg">{guest.name}</p>
                  <p className="text-gray-500 text-sm">{guest.relation}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={guest.status}
                    onChange={(e) => changeStatus(guest.id, e.target.value)}
                    className="border rounded-lg px-2 py-1 text-sm"
                  >
                    <option value="未回答">未回答</option>
                    <option value="出席">出席</option>
                    <option value="欠席">欠席</option>
                  </select>

                  <button
                    onClick={() => {
                      setSelectedGuestId(guest.id);
                      setShowDeleteModal(true);
                    }}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96">
            <h2 className="text-xl font-bold mb-2">ゲストを削除しますか？</h2>

            <p className="text-gray-500 mb-6">この操作は取り消せません。</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedGuestId(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                キャンセル
              </button>

              <button
                onClick={() => {
                  if (selectedGuestId !== null) {
                    deleteGuest(selectedGuestId);
                  }

                  setShowDeleteModal(false);
                  setSelectedGuestId(null);
                }}
                className="px-4 py-2 bg-[#DCB39C] text-white rounded-lg hover:bg-[#DCB39C] transition"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GuestListPage;
