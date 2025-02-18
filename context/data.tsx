import { createContext, useContext, useEffect, useState } from "react";
import type { itemType } from "@/utils/types";

export const DataContext = createContext<{
  searchQuery: itemType[];
  setSearchQuery: React.Dispatch<React.SetStateAction<itemType[]>>;
  removeItemFromSearchQuery: (id: number) => void;
  chatsLoading: boolean;
  setChatLoading: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<itemType[]>([]);
  const [chatsLoading, setChatLoading] = useState<boolean>(true);

  const removeItemFromSearchQuery = (id: number) => {
    setSearchQuery((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    setChatLoading(true);
    setTimeout(() => {
      setChatLoading(false);
    }, 1500);
  }, [searchQuery]);
  return (
    <DataContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        removeItemFromSearchQuery,
        chatsLoading,
        setChatLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
