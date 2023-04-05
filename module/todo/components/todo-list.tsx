import { View } from "../../../components/Themed";
import { TodoType } from "../store/todo-slice";
import { TodoItem, TodoItemType } from "./todo-item";

type TodoListType = {
  todos: { [key: string]: TodoType };
} & Pick<
  TodoItemType,
  "handleSelectForEdit" | "handleDelete" | "handleCompleteTodo"
>;

export const TodoList = (props: TodoListType) => {
  const { todos, ...rest } = props;
  return (
    <View>
      {Object.keys(todos).map((uuid) => {
        return <TodoItem {...todos[uuid]} {...rest} key={uuid} />;
      })}
    </View>
  );
};
