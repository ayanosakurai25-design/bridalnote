import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

type Todo = {
  id: number;
  taskName: string;
  dueDate: string;
  completed: boolean;
};

function TodoCreatePage() {
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      })
      .catch((err) => {
        console.error("TODO取得エラー:", err);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!taskName.trim()) {
      return;
    }

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskName,
        dueDate,
        completed: false,
      }),
    });

    const newTodo = await res.json();

    setTodos((prev) => [...prev, newTodo]);

    setTaskName("");
    setDueDate("");
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);

    if (!todo) return;

    const newCompleted = !todo.completed;

    await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: newCompleted,
      }),
    });

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: newCompleted } : todo,
    );

    setTodos(updatedTodos);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;

  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
    });

    const newTodos = todos.filter((todo) => todo.id !== id);

    setTodos(newTodos);
  };
  return (
    <>
      <Header />

      <div className="min-h-screen bg-stone-50 p-8">
        <div className="max-w-lg mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            {/* タイトルと戻るボタン */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold">Add Todo</h2>

              <Link
                to="/todos"
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
                <label className="block mb-2 font-medium">task</label>

                <input
                  type="text"
                  placeholder="例：ドレス試着"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6B5B53] "
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">due time</label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#6B5B53]"
                />
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
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-[#6B5B53] mb-4">
                  Todos <span className="text-[#9A8B82]">({todos.length})</span>
                </h3>

                <div className="flex gap-4 text-sm mt-1">
                  <span className="text-gray-500">登録 {todos.length}件</span>

                  <span className="text-[#DCB39C]">
                    完了 {completedCount}件
                  </span>
                </div>
              </div>

              <ul className="divide-y divide-[#E8E1DB]">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
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
                      <p
                        className={`font-medium ${
                          todo.completed
                            ? "line-through text-[#B5ABA3]"
                            : "text-[#6B5B53]"
                        }`}
                      >
                        {todo.taskName}
                      </p>

                      <p className="text-sm text-[#9A8B82]">
                        {new Date(todo.dueDate).toLocaleDateString("ja-JP", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleTodo(todo.id)}
                        className="
                        text-sm
                        text-[#8c7869]
                        transition-all
                        duration-300
                        hover:text-[#5f4e42]
                        hover:underline
                        underline-offset-4"
                      >
                        {todo.completed ? "Undo" : "Done"}
                      </button>

                      <button
                        onClick={() => deleteTodo(todo.id)}
                        className="
                        text-sm
                        text-[#8c7869]
                        transition-all
                        duration-300
                        hover:text-[#5f4e42]
                        hover:underline
                        underline-offset-4
                      "
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

export default TodoCreatePage;
