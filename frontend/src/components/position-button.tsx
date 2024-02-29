import { toast } from "sonner";
import { useLongPress } from "@uidotdev/usehooks";
import { Button } from "@/components/ui/button";

export interface PositionButtonProps {
  index: number;
}

export default function PositionButton(props: PositionButtonProps) {
  const { index } = props;

  const attrs = useLongPress(() => {
    toast.success(`Stored position ${index + 1}`);
  });

  const clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.shiftKey) {
      toast.success(`Stored position ${index + 1}`);
    } else {
      toast.success(`Loaded position ${index + 1}`);
    }
  };

  return (
    <Button variant="outline" {...attrs} onClick={clickHandler}>
      {`Position ${index + 1}`}
    </Button>
  );
}
