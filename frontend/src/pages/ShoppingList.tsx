import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../AuthenticationProvider";
import "./ShoppingList.css";

export default function ShoppingList() {
  const myContext = useAuthentication();
  const authData = myContext?.authData;
  const onLogout = myContext?.onLogout;
  const [task, setTask] = useState("");
  const [listItems, setList] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    getTasks();
  }, []);

  function getTasks() {
    fetch("/tasks")
      .then((response) => response.json())
      .then((data) => setList(data));
  }

  function logout() {
    const requestOptions: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    };

    fetch("users/logout", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (onLogout) onLogout();
        navigate("/login");
      })
      .catch((err) => console.log(err));
  }

  function handleChange(event: any) {
    setTask(event?.target.value);
  }

  function addTask(event: any) {
    event?.preventDefault();
    console.log(task);
    let exists = listItems.some((item) => item.task === task);

    if (!exists) {
      const requestOptions: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ task: task }),
      };

      fetch("tasks/", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          getTasks();
          setTask("");
          //   if (onLogout) onLogout();
          //   navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  }

  function deleteTask(id: string) {
    console.log(id);
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ _id: id }),
    };

    fetch("tasks/remove", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        getTasks();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {!authData?.name ? (
        <>
          <h1>Welcome</h1>
          <h2>Log in above to continue</h2>
        </>
      ) : (
        <>
          <div className="list">
            {listItems?.length === 0 ? (
              <h1>No item yet!</h1>
            ) : (
              <>
                <h1>ShoppingList:</h1>

                <ul>
                  {listItems?.map((item: any, index: number) => (
                    <li className="tasks" key={item._id}>
                      <span>{item.task}</span>
                      <button
                        className="delete"
                        onClick={() => {
                          deleteTask(item._id);
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}
            <form>
              <input type="text" value={task} onChange={handleChange}></input>
              <button type="submit" onClick={addTask}>
                add task
              </button>
            </form>
          </div>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </>
  );
}
