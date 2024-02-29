import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { View } from "@novorender/api";
import { ModeToggle } from "./mode-toggle";
import { toast } from "sonner";

export interface ToolbarProps extends React.HTMLAttributes<"div"> {
  view: View;
}

export default function Toolbar(props: ToolbarProps) {
  const { className } = props;

  const clickHandler = (index: number) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      if (e.shiftKey) {
        toast.success(`Stored position ${index + 1}`);
      } else {
        toast.success(`Loaded position ${index + 1}`);
      }
    };
  };

  return (
    <div
      className={cn(
        "flex items-center md:space-x-3 justify-between",
        className
      )}
    >
      <Button variant="outline" onClick={clickHandler(0)}>
        Position 1
      </Button>
      <Button variant="outline" onClick={clickHandler(1)}>
        Position 2
      </Button>
      <Button variant="outline" onClick={clickHandler(2)}>
        Position 3
      </Button>
      <div className="md:grow flex justify-end">
        <ModeToggle />
      </div>
    </div>
  );
}
