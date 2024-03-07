import logo from "./logo.svg";
import "./App.css";
import React from "react";
import axios from "axios";

function App() {
  const port = process.env.REACT_APP_SERVER_PORT;
  const [userCount, setUserCount] = React.useState(0);

  React.useEffect(() => {
    async function countUsers() {
      try {
        const api = axios.create({
          baseURL: `http://localhost:${port}`,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>User manager</h1>
        <p>{userCount} user(s) registered</p>
      </header>
    </div>
  );
}

export default App;
