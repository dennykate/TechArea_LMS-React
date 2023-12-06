import AppProvider from "./providers/AppProvider";
import Routes from "./routes";

const App = () => {
  return (
    <AppProvider>
      <Routes />
    </AppProvider>
  );
};

export default App;
