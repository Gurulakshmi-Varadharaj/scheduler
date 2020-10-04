import { useState } from "react";

/*****Implemented using Stack******/
const useVisualMode = (initMode) => {
  const [mode, setMode] = useState(initMode);
  const [history, setHistory] = useState([initMode]);

  const transition = (newMode, replace) => {
    if (!replace) {
      setHistory([...history, newMode]);
    }
    else {
      setHistory([...history.slice(0, history.slice.length - 1), newMode])
    }
    return setMode(newMode);
  }

  const back = () => {
    if (history.length > 1) {
      let newHistory = history.slice(0, history.length - 1);
      setHistory([...newHistory]);
      return setMode(newHistory[newHistory.length - 1]);
    }
    return setMode(initMode);
  }

  return { mode, transition, back };
};

export { useVisualMode };