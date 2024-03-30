import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { EncryptProvider } from "use-encrypt-storage";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import "../index.css";
import { Toaster } from "react-hot-toast";

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
              colors: {
                brand: [
                  "#1cd6ab",
                  "#d2f7ee",
                  "#a4efdd",
                  "#77e6cd",
                  "#49debc",
                  "#16ab89",
                  "#1cd6ab",
                  "#118067",
                  "#0b5644",
                  "#062b22",
                ],
              },
              primaryColor: "brand",
            }}
          >
            {children}

            <Toaster />
          </MantineProvider>
        </EncryptProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default AppProvider;
