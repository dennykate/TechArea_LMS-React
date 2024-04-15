import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
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
        <MantineProvider
          theme={{
            fontFamily: "DM Sans",
            colors: {
              brand: [
                 "#d4e8f4",
                 "#aad1ea",
                 "#7fbbdf",
                 "#55a4d5",
                 "#2271a2",
                 "#195579",
                 "#2a8dca",
                 "#113851",
                 "#081c28",
              ],
            },
            primaryColor: "brand",
          }}
        >
          {children}

          <Toaster />
        </MantineProvider>
      </Provider>
    </BrowserRouter>
  );
};

export default AppProvider;
