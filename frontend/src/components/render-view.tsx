import { useRef, useState, useEffect } from "react";
import { View, getDeviceProfile } from "@novorender/api";
import { createAPI, type SceneData } from "@novorender/data-js-api";
import Toolbar from "@/components/toolbar";
import { useTheme } from "./theme-provider";

const dataApi = createAPI({
  serviceUrl: "https://data.novorender.com/api",
});

const gpuTier = 2;
const deviceProfile = getDeviceProfile(gpuTier);

export interface RenderViewProps {
  sceneId: string;
}

export default function RenderView(props: RenderViewProps) {
  const canvas = useRef<HTMLCanvasElement>(null);

  const [sceneData, setSceneData] = useState<SceneData>();
  const [view, setView] = useState<View>();

  const { theme } = useTheme();

  const { sceneId } = props;

  useEffect(() => {
    const controller = new AbortController();

    async function loadScene() {
      if (!canvas.current) {
        return;
      }

      const baseUrl = new URL("/novorender/api/", window.location.origin);
      const imports = await View.downloadImports({ baseUrl });

      const newView = new View(canvas.current, deviceProfile, imports);

      const sceneData = (await dataApi.loadScene(sceneId)) as SceneData;

      setSceneData(sceneData);

      const url = new URL(sceneData.url);
      const parentSceneId = url.pathname.replaceAll("/", "");
      url.pathname = "";

      const config = await newView.loadScene(url, parentSceneId, "index.json");

      newView.modifyRenderState({
        background: {
          color:
            theme === "dark" ? [2 / 255.0, 8 / 255.0, 24 / 255.0] : [1, 1, 1],
        },
      });

      const { center, radius } = config.boundingSphere;
      newView.activeController.autoFit(center, radius);

      setView(newView);

      await newView.run(controller.signal);
    }

    loadScene();

    return () => controller.abort();
  }, [sceneId, theme]);

  return (
    <div className="relative">
      <Toolbar
        view={view}
        sceneData={sceneData}
        className="absolute top-0 left-0 p-4 right-0"
      />
      <canvas ref={canvas} className="h-full w-full min-h-screen"></canvas>
    </div>
  );
}
