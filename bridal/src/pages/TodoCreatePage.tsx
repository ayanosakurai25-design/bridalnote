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
    fetch("http://localhost:3000/todos")
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

    const res = await fetch("http://localhost:3000/todos", {
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

    await fetch(`http://localhost:3000/todos/${id}`, {
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
    await fetch(`http://localhost:3000/todos/${id}`, {
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
              <h2 className="text-2xl font-bold">TODO追加</h2>

              <Link
                to="/todos"
                className="px-3 py-1 border border-rose-300 rounded-full text-rose-500 hover:bg-rose-50 transition"
              >
                ← 戻る
              </Link>
            </div>

            {/* フォーム */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">タスク名</label>

                <input
                  type="text"
                  placeholder="例：ドレス試着"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">期限</label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-300"
                />
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
              <div className="mb-4">
                <h3 className="text-xl font-bold">登録したTODO</h3>

                <div className="flex gap-4 text-sm mt-1">
                  <span className="text-gray-500">登録 {todos.length}件</span>

                  <span className="text-green-600">
                    完了 {completedCount}件
                  </span>
                </div>
              </div>

              <ul>
                {todos.map((todo) => (
                  <li
                    key={todo.id}
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
                    <span
                      className={
                        todo.completed ? "line-through text-gray-400" : ""
                      }
                    >
                      {todo.dueDate} ｜ {todo.taskName}
                    </span>

                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`mr-4 ${
                        todo.completed
                          ? "text-yellow-600 hover:text-yellow-800"
                          : "text-green-600 hover:text-green-800"
                      }`}
                    >
                      {todo.completed ? "未完了" : "完了"}
                    </button>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      削除
                    </button>
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
