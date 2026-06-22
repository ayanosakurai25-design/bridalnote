import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  taskName: string;
  dueDate: string;
  completed: boolean;
};

function DashboardPage() {
  const [todoCount, setTodoCount] = useState(0);
  const [guestCount, setGuestCount] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);

  const [attendingCount, setAttendingCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  const completedCount = todos.filter((todo) => todo.completed).length;
  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodoCount(data.length);
        setTodos(data);
      });

    fetch("http://localhost:3000/guests")
      .then((res) => res.json())
      .then((data) => {
        setGuestCount(data.length);

        setAttendingCount(
          data.filter((guest: any) => guest.status === "出席").length,
        );

        setAbsentCount(
          data.filter((guest: any) => guest.status === "欠席").length,
        );

        setPendingCount(
          data.filter((guest: any) => guest.status === "未回答").length,
        );
      });
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-stone-50 p-4 sm:p-8">
        {/* タイトル・ボタンエリア */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold text-[#6B5B53]">Dashboard</h1>

          <div className="flex gap-1 sm:gap-3">
            <Link
              to="/todos/new"
              className="
              bg-[#6B5B53]
              text-white
              rounded-full
              px-3
              py-3
              whitespace-nowrap
              text-sm"
            >
              <span className="sm:hidden">+ TODO</span>
              <span className="hidden sm:inline">+ TODO追加</span>
            </Link>

            <Link
              to="/guests/new"
              className="
              bg-[#6B5B53]
              text-white
              rounded-full
              px-3
              py-3
              whitespace-nowrap
              text-sm"
            >
              <span className="sm:hidden">+ GUEST</span>
              <span className="hidden sm:inline">+ ゲスト追加</span>
            </Link>
          </div>
        </div>

        {/* 件数カード */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-gray-500 text-sm mb-3">TODO</h2>

            <p className="text-4xl sm:text-5xl font-bold text-[#6B5B53]">
              {todoCount}
            </p>

            <p className="text-gray-500 mt-2">件</p>

            <div className="mt-4">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                完了 {completedCount} 件
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-gray-500 text-sm mb-3">GUEST</h2>

            <p className="text-4xl sm:text-5xl font-bold text-[#6B5B53]">
              {guestCount}
            </p>

            <p className="text-gray-500 mt-2">名</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                出席 {attendingCount}
              </span>

              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                欠席 {absentCount}
              </span>

              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                未回答 {pendingCount}
              </span>
            </div>
          </div>
        </div>

        {/* 最近のTODO */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-xl font-bold mb-4">最近のTODO</h2>

          <ul className="space-y-3">
            {[...todos]
              .sort(
                (a, b) =>
                  new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
              )
              .slice(0, 3)
              .map((todo) => (
                <Link
                  to="/todos"
                  key={todo.id}
                  className="block border-b pb-2 hover:text-rose-500 transition break-word"
                >
                  {new Date(todo.dueDate).toLocaleDateString("ja-JP")}
                  {" ｜ "}
                  {todo.taskName}

                  {Boolean(todo.completed) && (
                    <span className="ml-2 text-green-600 text-sm">✓ 完了</span>
                  )}
                </Link>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
