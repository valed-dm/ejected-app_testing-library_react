import DisplayText from "./DisplayText";
import "./App.css";

export type User = {
  id: number;
  name: string;
};

export const getUser = async (userName: string): Promise<User> => {
  const usersResponse = await fetch(
    "https://jsonplaceholder.typicode.com/users/"
  );
  if (usersResponse.ok) {
    const users = await usersResponse.json();
    const userByName = users.find((usr: any) => {
      return usr.username.toLowerCase() === userName;
    });
    console.log("App >> users", users);
    return { id: userByName.id, name: userByName.name };
  }
  return { id: 0, name: "" };
};

function App() {
  return (
    <div className="App">
      <h1>
        <p>Learn React</p>
      </h1>
      <DisplayText />
    </div>
  );
}

export default App;
