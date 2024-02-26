"use client";

import { useEffect, useRef } from "react";
import { getDeviceProfile } from "@novorender/api";
import { View } from "@novorender/api";

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

      await view.run();

      return view.dispose;
    }

    downloadImports();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full"></canvas>;
}
