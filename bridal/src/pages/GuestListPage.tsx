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
    await fetch(`/api/guests/${id}`, {
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
    await fetch(`/api/guests/${id}`, {
      method: "DELETE",
    });

    setGuests(guests.filter((guest) => guest.id !== id));
  };
  useEffect(() => {
    fetch(`/api/guests/`)
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
              <h1 className="title text-3xl font-bold">GUEST</h1>
              <div
                className="
                mt-3
                flex
                flex-wrap
                gap-x-4
                gap-y-1
                text-sm 
                "
              >
                <p className="text-gray-500">登録ゲスト {guests.length} 名</p>

                <p className="text-[#8C7869] font-medium">
                  出席 {attendingCount} 名
                </p>

                <p className="text-[#8C7869] font-medium">
                  欠席 {absentCount} 名
                </p>

                <p className="text-[#8C7869] font-medium">
                  未回答 {pendingCount} 名
                </p>
              </div>
            </div>

            <Link
              to="/guests/new"
              className="
               group flex h-10 w-10 select-none items-center justify-center rounded-lg border border-zinc-100 bg-white leading-8 text-[#6B5B53] shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] transition-all duration-300 hover:bg-zinc-50 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]"
              aria-label="Add Guest"
            >
              <span
                className="flex 
              items-center 
              transition-transform 
              duration-200 
              group-active:translate-y-[1px]"
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
                    d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
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
                  <p className="font-semibold text-lg text-[#6B5B53]">
                    {guest.name}
                  </p>
                  <p className="text-[#9A8B82] text-sm">{guest.relation}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={guest.status}
                    onChange={(e) => changeStatus(guest.id, e.target.value)}
                    className="
                    border
                    border-[#D9CEC5]
                    rounded-lg
                    px-3
                    py-2
                    text-sm
                    bg-white
                    text-[#6B5B53]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#B99E8A]"
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
                    className="
                    text-[#8C7869]
                    hover:text-[#5F4E42]
                    text-sm
                    font-medium
                    transition"
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
                className="px-4 py-2 
                bg-[#8C7869]
                text-white
                rounded-lg
                hover:bg-[#6B5B53]
                transition"
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
