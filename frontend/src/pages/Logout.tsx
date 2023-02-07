import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  useEffect(() => logout(), []);

  function logout() {
    fetch("/users/logout")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        navigate("/login", { replace: true });
      })
      .catch((error) => console.log(error));
  }
  return <></>;
}
