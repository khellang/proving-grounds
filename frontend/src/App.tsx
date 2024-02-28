import RenderView from "@/components/render-view";
import Toolbar from "@/components/toolbar";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="relative">
        <Toolbar className="absolute inset-4" />
        <RenderView sceneId="3b5e65560dc4422da5c7c3f827b6a77c" />
      </div>
    </ThemeProvider>
  );
}

export default App;
