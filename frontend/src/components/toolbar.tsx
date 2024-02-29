import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { View } from "@novorender/api";
import { ModeToggle } from "./mode-toggle";

export interface ToolbarProps extends React.HTMLAttributes<"div"> {
  view: View;
}

export default function Toolbar(props: ToolbarProps) {
  const { view, className } = props;

  const clickHandler = (index: number) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      if (e.shiftKey) {
        console.log("store position", index, view.renderState.camera);
      } else {
        console.log("load position");
      }
    };
  };

  return (
    <div className={cn("flex items-center space-x-3", className)}>
      <Button variant="outline" onClick={clickHandler(0)}>
        Position 1
      </Button>
      <Button variant="outline" onClick={clickHandler(1)}>
        Position 2
      </Button>
      <Button variant="outline" onClick={clickHandler(2)}>
        Position 3
      </Button>
      <div className="grow flex justify-end">
        <ModeToggle />
      </div>
    </div>
  );
}
