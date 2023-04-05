import todoReducer, {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodoStatus,
  TodoType,
} from "./todo-slice";

describe("todo reducer", () => {
  const initialState = {
    todos: {
      "1": {
        title: "Hello world!",
        isCompleted: false,
        uuid: "1",
      },
    },
  };

  it("should handle adding a todo", () => {
    const newTodo: Omit<TodoType, "isCompleted" | "uuid"> = {
      title: "New Todo",
    };
    const action = addTodo(newTodo);
    const newState = todoReducer(initialState, action);
    const newTodoUuid = Object.keys(newState.todos).find(
      (uuid) => uuid !== "1"
    );

    expect(newTodoUuid).toBeDefined();
    expect(newState.todos[newTodoUuid!]).toEqual({
      ...newTodo,
      isCompleted: false,
      uuid: newTodoUuid!,
    });
  });

  it("should handle editing a todo", () => {
    const editedTodo: Omit<TodoType, "isCompleted"> = {
      title: "Edited Todo",
      uuid: "1",
    };
    const action = editTodo(editedTodo);
    const newState = todoReducer(initialState, action);

    expect(newState.todos["1"]).toEqual({
      ...initialState.todos["1"],
      ...editedTodo,
    });
  });

  it("should handle deleting a todo", () => {
    const action = deleteTodo({ uuid: "1" });
    const newState = todoReducer(initialState, action);

    expect(newState.todos["1"]).toBeUndefined();
    expect(Object.keys(newState.todos).length).toBeLessThan(
      Object.keys(initialState.todos).length
    );
  });

  it("should handle toggling a todo status", () => {
    const action = toggleTodoStatus({ uuid: "1" });
    const newState = todoReducer(initialState, action);

    expect(newState.todos["1"].isCompleted).toBe(true);

    const secondAction = toggleTodoStatus({ uuid: "1" });
    const secondNewState = todoReducer(newState, secondAction);

    expect(secondNewState.todos["1"].isCompleted).toBe(false);
  });
});
