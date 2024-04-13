import { useState, useCallback } from "react";

type UseMessageHandlerReturnType = {
  messageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  appendEmoji: (emoji: string) => void;
  setInputValue: (text: string) => void;
};

export const useMessageHandler = (): UseMessageHandlerReturnType => {
  const [inputValue, setInputValue] = useState<string>("");

  const messageHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      setInputValue(e.target.value);
    },
    []
  );

  const appendEmoji = useCallback((emoji: string) => {
    setInputValue((currentValue) => `${currentValue}${emoji}`);
  }, []);

  return { messageHandler, inputValue, appendEmoji, setInputValue };
};
