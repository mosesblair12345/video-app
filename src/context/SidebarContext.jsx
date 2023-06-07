import { useContext, createContext, useReducer } from "react";
import { OPEN_SIDEBAR, CLOSE_SIDEBAR } from "../actions";
import reducer from "../reducers/SidebarReducer";
const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const initialState = {
    isSidebarOpen: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const openSidebar = () => {
    dispatch({ type: OPEN_SIDEBAR });
  };
  const closeSidebar = () => {
    dispatch({ type: CLOSE_SIDEBAR });
  };

  return (
    <SidebarContext.Provider
      value={{
        ...state,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => {
  return useContext(SidebarContext);
};
