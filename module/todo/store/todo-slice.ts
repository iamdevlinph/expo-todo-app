import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { guid } from "common-utils-pkg";

export type TodoType = {
  title: string;
  isCompleted: boolean;
  uuid: string;
};

type AddTodoType = Omit<TodoType, "isCompleted" | "uuid">;
type EditTodoType = Omit<TodoType, "isCompleted">;
type DeleteTodoType = Omit<TodoType, "isCompleted" | "title">;
type CompleteTodoType = Omit<TodoType, "title" | "isCompleted">;

const guid1 = guid();
const guid2 = guid();

const initialState: { todos: { [key: string]: TodoType } } = {
  todos: {
    [guid1]: {
      title: "Hello world!",
      isCompleted: false,
      uuid: guid1,
    },
    [guid2]: {
      title: "Lorem ipsum dolor set",
      isCompleted: true,
      uuid: guid2,
    },
  },
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<AddTodoType>) {
      const { title } = action.payload;
      const uuid = guid();
      state.todos = {
        ...state.todos,
        [uuid]: {
          title,
          isCompleted: false,
          uuid,
        },
      };
    },
    editTodo(state, action: PayloadAction<EditTodoType>) {
      const { title, uuid } = action.payload;
      state.todos[uuid] = {
        ...state.todos[uuid],
        title,
      };
    },
    deleteTodo(state, action: PayloadAction<DeleteTodoType>) {
      const { uuid } = action.payload;
      const { [uuid]: deleted, ...rest } = state.todos;
      state.todos = {
        ...rest,
      };
    },
    toggleTodoStatus(state, action: PayloadAction<CompleteTodoType>) {
      const { uuid } = action.payload;
      const foundTodo = state.todos[uuid];
      state.todos[uuid] = {
        ...state.todos[uuid],
        isCompleted: !foundTodo.isCompleted,
      };
    },
  },
});

export const { addTodo, editTodo, deleteTodo, toggleTodoStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
