import React, { createContext, useContext, useEffect, useState } from "react";
import { RequiredAuth } from "./RequiredAuth";
import { useLoader } from "./LoadContext";

type AuthProps = {
  children: React.ReactNode;
};

type contextType = {
  authData: {
    name: string;
  };
  onLogin: (v: {}) => any;
  onLogout: () => any;
};

const AuthenticationContext = createContext<contextType | undefined>(undefined);

export default function AuthenticationProvider({ children }: AuthProps) {
  const [authData, setAuthData] = useState({ name: "" });
  const loadingContext = useLoader();

  const setLoading = loadingContext?.setLoading;

  useEffect(() => {
    async function getLoggedUser() {
      const response = await fetch("/users/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        credentials: "include",
      });
      try {
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          onLogin(data);
          if (setLoading) setLoading(false);
          console.log(data);
          return data;
        }
        if (setLoading) setLoading(false);
      } catch (error) {
        console.log(error);
        return null;
      }
    }

    getLoggedUser();
  }, [setLoading]);

  const onLogin = (v: any) => setAuthData(v);
  const onLogout = () => setAuthData({ name: "" });
  return (
    <AuthenticationContext.Provider value={{ authData, onLogin, onLogout }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export const useAuthentication = () => useContext(AuthenticationContext);
