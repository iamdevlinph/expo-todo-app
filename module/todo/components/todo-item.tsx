import React from "react";
import { Text, View } from "../../../components/Themed";
import { Pressable, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { TodoType } from "../store/todo-slice";

export type TodoItemType = {
  handleSelectForEdit: (uuid: string) => void;
  handleDelete: (uuid: string) => void;
  handleCompleteTodo: (uuid: string) => void;
} & TodoType;

export const TodoItem: React.FC<TodoItemType> = (props) => {
  const { title, isCompleted, uuid, handleSelectForEdit, handleDelete,handleCompleteTodo } = props;
  return (
    <View style={[styles.container]}>
      <Text style={[isCompleted && styles.titleDone]}>{title}</Text>

      <View style={[styles.icons]}>
        <View style={[styles.setComplete]}>
          <Pressable onPress={() => handleCompleteTodo(uuid)}>
            <Feather
              name="check-circle"
              size={18}
              color={isCompleted ? "green" : "#fcfcfc"}
            />
          </Pressable>
        </View>

        <View style={[styles.edit]}>
          <Pressable onPress={() => handleSelectForEdit(uuid)}>
            <Feather name="edit" size={18} color="#fcfcfc" />
          </Pressable>
        </View>

        <View style={[styles.delete]}>
          <Pressable onPress={() => handleDelete(uuid)}>
            <Feather name="delete" size={18} color="red" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 5,
    borderColor: "#CACADA",
    borderWidth: 1,
    borderRadius: 7,
    padding: 16,
    paddingVertical: 30,
    flex: 1,
    rowGap: 5,
  },
  titleDone: {
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  icons: {
    flexDirection: "row",
    columnGap: 10,
    alignSelf: "flex-end",
  },
  setComplete: {},
  edit: {},
  delete: {},
});
