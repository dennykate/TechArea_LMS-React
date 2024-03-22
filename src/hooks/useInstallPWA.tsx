/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const useInstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState<boolean>(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const installPWA = () => {
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };

  return { supportsPWA, installPWA };
};

export default useInstallPWA;
