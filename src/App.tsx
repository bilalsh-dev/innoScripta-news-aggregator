import { ThemeProvider } from "@/components/theme";
import "./App.css";
import { Container, Header } from "@/components/layout";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { Articles } from "./features/articles";
import { Filters } from "./features/filters";
import { ScrollButton } from "./components/layout/ScrollButton.tsx";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={store}>
        <Container>
          <ScrollButton />
          <Header />
          <Filters />
          <Articles />
        </Container>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
