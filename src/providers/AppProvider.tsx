import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import "../index.css";

interface PropsType {
  children: React.ReactNode;
}

const AppProvider = ({ children }: PropsType) => {
  return (
    <BrowserRouter>
      <MantineProvider
        theme={{
          fontFamily: "DM Sans",
        }}
      >
        {children}
      </MantineProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
