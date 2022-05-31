import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";

export const AlertContext = React.createContext();

export function AlertBar({
  header,
  description,
  timestamp,
  type = "info",
  width = "w-144",
}) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [hide, setHide] = useState(true);
  const hideClass = hide ? "translate-y-20" : "translate-y-0";

  let typeClass;
  switch (type) {
    case "success":
      typeClass = "bg-green-600";
      break;
    case "error":
      typeClass = "bg-red-600";
    case "info":
    default:
      typeClass = "bg-blue-600";
  }

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    if (timestamp) {
      setHide(false);
    }
    const timeoutId = setTimeout(() => {
      setHide(true);
    }, 5000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [timestamp]);

  const alertBar = (
    <>
      <div
        className={`${hideClass} transform transition ease-in-out duration-75 sm:duration-700 fixed flex justify-between items-center inset-x-32 z-20 bottom-2 rounded-sm p-4 h-16 ${typeClass} text-white shadow`}
      >
        <div>
          <h2 className="font-semibold leading-tight">{header}</h2>
          <p className="text-sm leading-tight">{description}</p>
        </div>

        <div className="font-extrabold" onClick={() => setHide(true)}>
          X
        </div>
      </div>
    </>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      alertBar,
      document.getElementById("snackbar-root")
    );
  } else {
    return null;
  }
}

export function useAlert() {
  const dispatch = useContext(AlertContext);

  function success(header, description) {
    let type = "success";
    dispatch({
      type: "notify",
      payload: { header, description, type, timestamp: Date.now() },
    });
  }

  function error(header, description) {
    let type = "error";
    dispatch({
      type: "notify",
      payload: { header, description, type, timestamp: Date.now() },
    });
  }

  function info(header, description) {
    let type = "info";
    dispatch({
      type: "notify",
      payload: { header, description, type, timestamp: Date.now() },
    });
  }

  return { success, error, info };
}
