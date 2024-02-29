import { cn } from "@/lib/utils";
import type { View } from "@novorender/api";
import { ModeToggle } from "./mode-toggle";
import PositionButton from "./position-button";

export interface ToolbarProps extends React.HTMLAttributes<"div"> {
  view: View;
}

export default function Toolbar(props: ToolbarProps) {
  const { className } = props;

  return (
    <div
      className={cn(
        "flex items-center md:space-x-3 justify-between",
        className
      )}
    >
      <PositionButton index={0} />
      <PositionButton index={1} />
      <PositionButton index={2} />
      <div className="md:grow flex justify-end">
        <ModeToggle />
      </div>
    </div>
  );
}
