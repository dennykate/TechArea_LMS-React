import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import "../index.css";
import { EncryptProvider } from "use-encrypt-storage";

interface PropsType {
  children: React.ReactNode;
}

const AppProvider = ({ children }: PropsType) => {
  return (
    <BrowserRouter>
      <EncryptProvider secretKey={import.meta.env.VITE_SECRET_KEY}>
        <MantineProvider
          theme={{
            fontFamily: "DM Sans",
          }}
        >
          {children}
        </MantineProvider>
      </EncryptProvider>
    </BrowserRouter>
  );
};

export default AppProvider;
