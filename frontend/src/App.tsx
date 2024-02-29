import RenderView from "@/components/render-view";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RenderView sceneId="3b5e65560dc4422da5c7c3f827b6a77c" />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
