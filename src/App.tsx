import AppProvider from "./providers/AppProvider";
import Routes from "./routes";
import ErrorBoundary from "./routes/ErrorBoundary";

const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
