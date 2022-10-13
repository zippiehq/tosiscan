import { createContext } from "react";

export const SearchContext = createContext<any>({ term: "", filter: "all" });