"use client";

import { useEffect, useRef } from "react";
import {
  RecursivePartial,
  RenderState,
  getDeviceProfile,
} from "@novorender/api";
import { View } from "@novorender/api";
import { loadPublicScene } from "@/lib/scene-loader";

export interface RenderViewProps {
  sceneId: string;
  renderState?: RecursivePartial<RenderState>;
}

export default function RenderView(props: RenderViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const { sceneId, renderState } = props;

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

      if (renderState) {
        view.modifyRenderState(renderState);
      }

      await loadPublicScene(view, sceneId);

      await view.run();

      return view.dispose;
    }

    downloadImports();
  }, [renderState, sceneId]);

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
}
