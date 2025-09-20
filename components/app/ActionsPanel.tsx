import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Zap } from "lucide-react";

interface ActionsPanelProps {
  canConvert: boolean;
  canDownload: boolean;
  isProcessing: boolean;
  progress: number;
  handleConvertAndZip: () => void;
  zipUrl: string | null;
  rootFolderName: string;
  fileCount: number;
}

export function ActionsPanel({
  canConvert,
  canDownload,
  isProcessing,
  progress,
  handleConvertAndZip,
  zipUrl,
  rootFolderName,
  fileCount,
}: ActionsPanelProps) {
  return (
    <Card className="flex-1 flex flex-col justify-between">
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {canDownload ? (
            <>
              <Button asChild size="lg" className="w-full">
                <a href={zipUrl!} download={`${rootFolderName}_webp.zip`}>
                  <Download className="mr-2 h-4 w-4" />
                  Download ZIP
                </a>
              </Button>
              <Button
                size="lg"
                className="w-full"
                variant="secondary"
                onClick={handleConvertAndZip}
                disabled={!canConvert}
              >
                <Zap className="mr-2 h-4 w-4" />
                Re-convert Files
              </Button>
            </>
          ) : (
            <Button
              size="lg"
              className="w-full"
              onClick={handleConvertAndZip}
              disabled={!canConvert || isProcessing}
            >
              <Zap className="mr-2 h-4 w-4" />
              {isProcessing
                ? `Processing... (${Math.round(progress)}%)`
                : "Convert & Zip Files"}
            </Button>
          )}
        </div>
      </CardContent>
      {fileCount > 0 && !isProcessing && (
        <CardContent className="pt-0">
          <Progress value={progress} />
        </CardContent>
      )}
    </Card>
  );
}
