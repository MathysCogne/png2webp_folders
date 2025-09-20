import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github, Star } from "lucide-react";

const REPO_URL = "https://github.com/MathysCogne/png2webp_folders";

interface StarRepoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function StarRepoDialog({ open, onOpenChange }: StarRepoDialogProps) {
  const handleStarClick = () => {
    window.open(REPO_URL, "_blank");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Star className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center">Enjoying this tool?</DialogTitle>
          <DialogDescription className="text-center">
            If this app helped you, please consider giving it a star on GitHub.
            It helps the project grow and reach more people!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            Maybe later
          </Button>
          <Button type="button" onClick={handleStarClick}>
            <Github className="mr-2 h-4 w-4" />
            Star on GitHub
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
