import { cn } from "@/lib/utils";
import {
  createNeutralHighlight,
  type RenderStateHighlightGroups,
  type View,
} from "@novorender/api";
import { ModeToggle } from "./mode-toggle";
import PositionButton from "./position-button";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import type { ReadonlyVec3, ReadonlyQuat } from "gl-matrix";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { type SceneData } from "@novorender/data-js-api";

export interface ToolbarProps extends React.HTMLAttributes<"div"> {
  sceneData?: SceneData;
  view?: View;
}

interface CameraState {
  position: ReadonlyVec3;
  rotation: ReadonlyQuat;
}

export default function Toolbar(props: ToolbarProps) {
  const { view, sceneData, className } = props;

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cameraPositions, setCameraPositions] = useState<
    Record<number, CameraState>
  >({});

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const storePosition = (index: number) => {
    if (!view) {
      return;
    }
    const { position, rotation } = view.renderState.camera;
    setCameraPositions({
      ...cameraPositions,
      [index]: {
        position,
        rotation,
      },
    });
    toast.success(`Stored position ${index + 1}`);
  };

  const loadPosition = (index: number) => {
    if (!view) {
      return;
    }
    const camera = cameraPositions[index];
    if (camera) {
      view.activeController.moveTo(camera.position, 1000, camera.rotation);
      toast.success(`Loaded position ${index + 1}`);
    } else {
      toast.warning(`Position ${index + 1} has not been stored.`);
    }
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value);
  };

  useEffect(() => {
    const controller = new AbortController();

    async function search() {
      if (!view || !sceneData) {
        return;
      }

      const { db } = sceneData;
      if (db) {
        const result: number[] = [];

        if (debouncedSearchTerm) {
          const iterator = db.search(
            { searchPattern: debouncedSearchTerm },
            controller.signal
          );

          for await (const object of iterator) {
            result.push(object.id);
          }
        }

        const renderStateHighlightGroups: Partial<RenderStateHighlightGroups> =
          {
            defaultAction: result.length > 0 ? "hide" : undefined,
            groups: [{ action: createNeutralHighlight(), objectIds: result }],
          };

        view.modifyRenderState({ highlights: renderStateHighlightGroups });
      }
    }

    search();

    return () => controller.abort();
  }, [debouncedSearchTerm, sceneData, view]);

  return (
    <div
      className={cn(
        "flex items-center md:space-x-3 gap-2 justify-between flex-wrap md:flex-nowrap",
        className
      )}
    >
      <PositionButton
        index={0}
        onLoadPosition={loadPosition}
        onStorePosition={storePosition}
      />
      <PositionButton
        index={1}
        onLoadPosition={loadPosition}
        onStorePosition={storePosition}
      />
      <PositionButton
        index={2}
        onLoadPosition={loadPosition}
        onStorePosition={storePosition}
      />
      <Input placeholder="Search" onChange={handleChange} />
      <div className="grow flex justify-end">
        <ModeToggle />
      </div>
    </div>
  );
}
