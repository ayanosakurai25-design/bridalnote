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
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodoCount(data.length);
        setTodos(data);
      });

    fetch("/api/guests")
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
          <h1 className=" title text-3xl font-bold]">HOME</h1>

          <div className="flex gap-3 sm:gap-3">
            <Link
              to="/todos/new"
              className="
              px-3
              py-3
              whitespace-nowrap
              text-sm"
            >
              <button className="add-button">+ TODO</button>
            </Link>

            <Link
              to="/guests/new"
              className="
              px-3
              py-3
              whitespace-nowrap
              text-sm"
            >
              <button className="add-button">+ GUEST</button>
            </Link>
          </div>
        </div>

        {/* 件数カード */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-[#6B5B53] text-md mb-3">TODO</h2>
            <div className="flex items-end gap-5 mt-2">
              <p className="text-4xl sm:text-5xl font-bold text-[#6B5B53]">
                {todoCount}
              </p>

              <p className="text-[#6B5B53] mt-2">件</p>
            </div>
            <div className="mt-6">
              <span className="px-3 py-1 bg-[#DCB39C] text-white rounded-full text-sm font-medium">
                完了 {completedCount} 件
              </span>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-[#6B5B53] text-md mb-3">GUEST</h2>
            <div className="flex items-end gap-5 mt-2">
              <p className="text-4xl sm:text-5xl font-bold text-[#6B5B53]">
                {guestCount}
              </p>
              <p className="text-[#6B5B53] mt-2">名</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-[#DCB39C] text-white rounded-full text-sm font-medium">
                出席 {attendingCount}
              </span>

              <span className="px-3 py-1 bg-[#DCB39C] text-white rounded-full text-sm font-medium">
                欠席 {absentCount}
              </span>

              <span className="px-3 py-1 bg-[#DCB39C] text-white rounded-full text-sm font-medium">
                未回答 {pendingCount}
              </span>
            </div>
          </div>
        </div>

        {/* 最近のTODO */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-xl font-bold mb-4 text-[#6B5B53]">最近のTODO</h2>

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
                  className="block border-b pb-2 hover:text-[#6B5B53] transition break-word"
                >
                  {new Date(todo.dueDate).toLocaleDateString("ja-JP")}
                  {" ｜ "}
                  {todo.taskName}

                  {Boolean(todo.completed) && (
                    <span className="ml-2 text-[#DCB39C] text-sm">✓ 完了</span>
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
