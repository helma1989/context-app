import React, { useContext, useState } from "react";

type Props = {
  children: React.ReactElement;
};
type ContextType = {
  isLoading: boolean;
  setLoading: (v: boolean) => any;
};

const LoadContext = React.createContext<ContextType | undefined>(undefined);

export function LoadContextProvider({ children }: Props) {
  const [isLoading, setLoading] = useState(true);

  return (
    <LoadContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadContext.Provider>
  );
}

export const useLoader = () => useContext(LoadContext);
