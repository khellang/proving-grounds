import { useRef, useEffect } from "react";
import { View, getDeviceProfile } from "@novorender/api";

function App() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const gpuTier = 2;
  const deviceProfile = getDeviceProfile(gpuTier);

  useEffect(() => {
    async function downloadImports() {
      if (!canvas.current) {
        return;
      }

      const baseUrl = new URL("/novorender/api/", window.location.origin);
      const imports = await View.downloadImports({ baseUrl });

      const view = new View(canvas.current, deviceProfile, imports);

      await view.run();

      return view.dispose;
    }

    downloadImports();
  }, [deviceProfile]);

  return <canvas ref={canvas} className="h-full w-full min-h-screen"></canvas>;
}

export default App;
