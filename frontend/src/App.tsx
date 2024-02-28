import { useRef, useEffect } from "react";
import { View, getDeviceProfile } from "@novorender/api";
import { createAPI, type SceneData } from "@novorender/data-js-api";

const dataApi = createAPI({
  serviceUrl: "https://data.novorender.com/api",
});

function App() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const gpuTier = 2;
  const deviceProfile = getDeviceProfile(gpuTier);

  useEffect(() => {
    async function downloadImports() {
      if (!canvas.current) {
        return;
      }

      const sceneData = await dataApi.loadScene(
        "3b5e65560dc4422da5c7c3f827b6a77c"
      );

      const baseUrl = new URL("/novorender/api/", window.location.origin);
      const imports = await View.downloadImports({ baseUrl });

      const view = new View(canvas.current, deviceProfile, imports);

      await view.run();

      // Destructure relevant properties into variables
      const { url: _url } = sceneData as SceneData;
      const url = new URL(_url);
      const parentSceneId = url.pathname.replaceAll("/", "");
      url.pathname = "";
      // load the scene using URL gotten from `sceneData`
      const config = await view.loadScene(url, parentSceneId, "index.json");

      const { center, radius } = config.boundingSphere;
      view.activeController.autoFit(center, radius);

      return view.dispose;
    }

    downloadImports();
  }, [deviceProfile]);

  return <canvas ref={canvas} className="h-full w-full min-h-screen"></canvas>;
}

export default App;
