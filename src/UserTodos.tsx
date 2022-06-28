import React, { FC, useState, useEffect } from "react";
import { getUser } from "./App"; 

interface UserTodosProps {
    userName: string;
}

const UserTodos: FC<UserTodosProps> = ({ userName }) => {
  const [msg, setMsg] = useState("");
  const [todos, setTodos] = useState<Array<JSX.Element>>();

  const setUserTodos = async () => {
    const user = await getUser(userName);
    setMsg(`Welcome to React testing, ${user.name}!`);
    console.log("user by username", user);

    const todosResponse = await fetch(
      "https://jsonplaceholder.typicode.com/todos"
    );
    if (todosResponse.ok) {
      const todos = await todosResponse.json();
      const userTodos = todos.filter((todo: any) => {
        return todo.userId === user.id;
      });
      const todoList = userTodos.map((todo: any) => {
        return <li key={todo.id}>{todo.title}</li>;
      });

      setTodos(todoList);
      console.log("user todos", userTodos);
    }
  };

  useEffect(() => {
    if (userName) {
      setUserTodos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  return (
    <div>
      <div>
        <label data-testid="final-msg">{msg}</label>
      </div>
      <ul style={{ marginTop: "1rem", listStyleType: "none" }}>{todos}</ul>
    </div>
  );
};

export default React.memo(UserTodos);
