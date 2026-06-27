import Header from "../components/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  taskName: string;
  dueDate: string;
  completed: boolean;
};

function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);

  const completedCount = todos.filter((todo) => todo.completed).length;
  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
    });

    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const toggleTodo = async (id: number) => {
    const targetTodo = todos.find((todo) => todo.id === id);

    if (!targetTodo) return;

    const updatedCompleted = !targetTodo.completed;

    await fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: updatedCompleted,
      }),
    });

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: updatedCompleted } : todo,
      ),
    );
  };

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
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
              <h1 className="title text-3xl font-bold">TODO</h1>

              <div
                className="
                mt-3
                flex
                flex-wrap
                gap-x-4
                gap-y-1
                text-sm"
              >
                <p className="text-gray-500">登録タスク {todos.length} 件</p>

                <p className="text-[#DCB39C] font-medium">
                  完了タスク {completedCount} 件
                </p>
              </div>
            </div>

            <Link
              to="/todos/new"
              className="group flex h-10 w-10 select-none items-center justify-center rounded-lg border border-zinc-100 bg-white leading-8 text-[#6B5B53] shadow-[0_-1px_0_0px_#d4d4d8_inset,0_0_0_1px_#f4f4f5_inset,0_0.5px_0_1.5px_#fff_inset] transition-all duration-300 hover:bg-zinc-50 active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]"
              aria-label="Add Todo"
            >
              <span className="flex 
              items-center 
              transition-transform 
              duration-200 
              group-active:translate-y-[1px]">
                
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

          {todos.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md py-16 text-center">
              <p className="text-gray-400 text-sm tracking-[0.3em]">NO TODOS</p>

              <div className="w-12 h-px bg-gray-200 mx-auto my-4" />

              <p className="text-gray-500">まだタスクが登録されていません</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="
                bg-white rounded-xl shadow-md p-4 mb-3
                flex flex-col
                sm:flex-row
                gap-3
                sm:justify-between
                sm:items-center
                hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5"
                  />

                  <div>
                    <p
                      className={`font-semibold text-lg ${
                        todo.completed ? "line-through text-gray-400" : ""
                      }`}
                    >
                      {todo.taskName}
                    </p>
                  </div>
                </div>
                <div
                  className="
                  flex
                  flex-wrap
                  items-center
                  gap-2
                  w-full
                  sm:w-auto
                  justify-end "
                >
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      todo.completed
                        ? "bg-gray-100 text-gray-500"
                        : "bg-rose-100 text-[#DCB39C]"
                    }`}
                  >
                    {new Date(todo.dueDate).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedTodoId(todo.id);
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
          <div
            className="
            bg-white
            rounded-2xl
            shadow-xl
            p-6
            w-[90%]
            max-w-md"
          >
            <h2 className="text-xl font-bold mb-2">TODOを削除しますか？</h2>

            <p className="text-gray-500 mb-6">この操作は取り消せません。</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedTodoId(null);
                }}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                キャンセル
              </button>

              <button
                onClick={() => {
                  if (selectedTodoId !== null) {
                    deleteTodo(selectedTodoId);
                  }

                  setShowDeleteModal(false);
                  setSelectedTodoId(null);
                }}
                className="px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-[#DCB39C] transition"
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

export default TodoListPage;
