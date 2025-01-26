import { ThemeProvider } from "@/components/theme-provider";

import "./App.css";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
    </ThemeProvider>
  );
}

export default App;
