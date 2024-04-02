import { useState, useCallback } from "react";

export const useMessageHandler = (): [
  (e: React.ChangeEvent<HTMLInputElement>) => void,
  string
] => {
  const [inputValue, setInputValue] = useState<string>("");

  const messageHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      const value = e.target.value;
      setInputValue(value);
     //  console.log(value);
    },
    []
  );

  return [messageHandler, inputValue];
};
