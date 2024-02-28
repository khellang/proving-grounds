import { useRef, useEffect } from "react";
import { View, getDeviceProfile } from "@novorender/api";
import { createAPI, type SceneData } from "@novorender/data-js-api";

const dataApi = createAPI({
  serviceUrl: "https://data.novorender.com/api",
});

export interface RenderViewProps {
  sceneId: string;
}

export default function RenderView(props: RenderViewProps) {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  const gpuTier = 2;
  const deviceProfile = getDeviceProfile(gpuTier);

  const { sceneId } = props;

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      if (!canvas.current) {
        return;
      }

      const sceneData = (await dataApi.loadScene(sceneId)) as SceneData;

      const baseUrl = new URL("/novorender/api/", window.location.origin);
      const imports = await View.downloadImports({ baseUrl });

      const view = new View(canvas.current, deviceProfile, imports);

      const url = new URL(sceneData.url);
      const parentSceneId = url.pathname.replaceAll("/", "");
      url.pathname = "";

      const config = await view.loadScene(url, parentSceneId, "index.json");

      const { center, radius } = config.boundingSphere;
      view.activeController.autoFit(center, radius);

      await view.run(controller.signal);
    })();

    return () => controller.abort();
  }, [deviceProfile, sceneId]);

  return <canvas ref={canvas} className="h-full w-full min-h-screen"></canvas>;
}
