import { RootState } from "../../../store/store";

export const selectTodos = (state:RootState) => state.todoSlice.todos
