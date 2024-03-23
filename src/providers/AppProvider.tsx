import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import "../index.css";
import { EncryptProvider } from "use-encrypt-storage";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface PropsType {
  children: React.ReactNode;
}

const AppProvider = ({ children }: PropsType) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <EncryptProvider secretKey={import.meta.env.VITE_SECRET_KEY}>
          <MantineProvider
            theme={{
              fontFamily: "DM Sans",
            }}
          >
            {children}
          </MantineProvider>
        </EncryptProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default AppProvider;
