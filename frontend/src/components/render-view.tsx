"use client";

import { useEffect, useRef } from "react";
import { getDeviceProfile } from "@novorender/api";
import { View } from "@novorender/api";
import { SceneData, createAPI } from "@novorender/data-js-api";

const dataApi = createAPI({
  serviceUrl: "https://data.novorender.com/api",
});

const loadPublicScene = async (view: View, id: string) => {
  const sceneData = await dataApi.loadScene(id);

  // Destructure relevant properties into variables
  const { url: _url } = sceneData as SceneData;
  const url = new URL(_url);
  const parentSceneId = url.pathname.replaceAll("/", "");
  url.pathname = "";

  // load the scene using URL gotten from `sceneData`
  const config = await view.loadScene(url, parentSceneId, "index.json");

  const { center, radius } = config.boundingSphere;

  view.activeController.autoFit(center, radius);
};

export default function RenderView() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    async function downloadImports() {
      if (!canvasRef.current) {
        return;
      }

      const gpuTier = 2;
      const deviceProfile = getDeviceProfile(gpuTier);

      const baseUrl = new URL("/novorender/api/", window.location.origin);

      const imports = await View.downloadImports({ baseUrl });

      const view = new View(canvasRef.current, deviceProfile, imports);

      view.modifyRenderState({ grid: { enabled: true } });

      await loadPublicScene(view, "95a89d20dd084d9486e383e131242c4c");

      await view.run();

      return view.dispose;
    }

    downloadImports();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
}
