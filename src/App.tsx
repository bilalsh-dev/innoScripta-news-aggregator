import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";
import Navbar from "@/components/layout/Navbar.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Container } from "./components/layout/container.tsx";
import { Articles } from "./features/articles";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Container>
          <Navbar />
          <Articles />
        </Container>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
