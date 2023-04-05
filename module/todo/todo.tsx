import { useState } from "react";
import { Text, View, TextInput, Button } from "../../components/Themed";
import { TodoList } from "./components/todo-list";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { selectTodos } from "./store/todo-selector";
import {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodoStatus,
} from "./store/todo-slice";
import { useDispatch } from "react-redux";

export const Todo = () => {
  const dispatch = useDispatch();

  const [text, onChangeText] = useState("");
  const [editingUuid, setEditingUuid] = useState("");
  const allTodos = useSelector(selectTodos);

  return (
    <View style={[styles.container]}>
      <View style={[styles.form]}>
        <Text>{`${editingUuid ? "Edit" : "New"}`} todo</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
        />

        <View style={{ width: "100%", alignSelf: "center" }}>
          <Button
            disabled={!text}
            onPress={() => {
              if (!editingUuid) {
                dispatch(addTodo({ title: text }));
                onChangeText("");
              } else {
                dispatch(editTodo({ title: text, uuid: editingUuid }));
                onChangeText("");
                setEditingUuid("");
              }
            }}
            title={editingUuid ? "Save todo" : "Add todo"}
            color="#841584"
          />
        </View>
      </View>

      <TodoList
        todos={allTodos}
        handleSelectForEdit={(uuid) => {
          const toEditTodo = allTodos[uuid];
          onChangeText(toEditTodo.title);
          setEditingUuid(toEditTodo.uuid);
        }}
        handleDelete={(uuid) => {
          dispatch(deleteTodo({ uuid }));
        }}
        handleCompleteTodo={(uuid) => {
          dispatch(toggleTodoStatus({ uuid }));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 50,
  },
  form: {
    marginVertical: 10,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "#CACADA",
  },
});
