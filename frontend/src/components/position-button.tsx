import { useLongPress } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface PositionButtonProps {
  onStorePosition: (index: number) => void;
  onLoadPosition: (index: number) => void;
  index: number;
}

export default function PositionButton(props: PositionButtonProps) {
  const { index, onLoadPosition, onStorePosition } = props;

  const attrs = useLongPress(() => {
    onStorePosition(index);
  });

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.shiftKey) {
      onStorePosition(index);
    } else {
      onLoadPosition(index);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" {...attrs} onClick={clickHandler}>
            {`Position ${index + 1}`}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Hold <kbd>Shift</kbd> when clicking to store position.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
