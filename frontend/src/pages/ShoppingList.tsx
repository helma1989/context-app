import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../AuthenticationProvider";

export default function ShoppingList() {
  const myContext = useAuthentication();
  const authData = myContext?.authData;
  const onLogout = myContext?.onLogout;
  const [task, setTask] = useState();
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
                    <li key={item.id}>
                      <span>{item.task}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </>
      )}
      <button onClick={logout}>Log out</button>
    </>
  );
}
