/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";

interface PropsType {
  children: React.ReactNode;
}

const PreventDevToolProvider: React.FC<PropsType> = ({ children }) => {
  const [devToolsOpen, setDevToolsOpen] = useState<boolean>(false);

  useEffect(() => {
    const originalLog: (...data: any[]) => void = console.log;

    const detectDevTools = () => {
      const threshold = new Date();
      debugger; // Execution pause when dev tools are open and in debugging mode

      // Check if the debugger statement caused a significant delay
      if (new Date().getTime() - threshold.getTime() > 100) {
        if (!devToolsOpen) {
          setDevToolsOpen(true);
        }
      } else {
        if (devToolsOpen) {
          setDevToolsOpen(false);
        }
      }

      // Overriding console.log to detect usage
      console.log = (...data: any[]) => {
        setDevToolsOpen(true);
        originalLog.apply(console, data);
      };
    };

    const intervalId = setInterval(detectDevTools, 1000); // Check every second

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", detectDevTools);
      console.log = originalLog; // Restore the original console.log function on cleanup
    };
  }, [devToolsOpen]);

  useEffect(() => {
    const handleContextMenu = (event: any) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  return <> {children}</>;
};

export default PreventDevToolProvider;
