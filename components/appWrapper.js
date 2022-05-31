import { useReducer } from "react";
import { AlertBar, AlertContext } from "./alertBar";

export default function AppWrapper({ children }) {
  function alertReducer(state, action) {
    switch (action.type) {
      case "notify":
        return { ...action.payload };
    }
    return state;
  }

  const [alertState, alertDispatch] = useReducer(alertReducer, {
    header: null,
    description: null,
    timestamp: null,
    type: null,
  });
  return (
    <AlertContext.Provider value={alertDispatch}>
      {children}
      <AlertBar {...alertState} />
    </AlertContext.Provider>
  );
}
