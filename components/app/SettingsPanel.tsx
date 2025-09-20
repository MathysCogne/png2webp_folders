import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface SettingsPanelProps {
  quality: number;
  setQuality: (value: number) => void;
  lossless: boolean;
  setLossless: (value: boolean) => void;
  isProcessing: boolean;
  onSettingsChange: () => void;
}

export function SettingsPanel({
  quality,
  setQuality,
  lossless,
  setLossless,
  isProcessing,
  onSettingsChange,
}: SettingsPanelProps) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="quality">Quality</Label>
            <span className="text-sm font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">
              {quality}
            </span>
          </div>
          <Slider
            value={[quality]}
            max={100}
            step={1}
            id="quality"
            onValueChange={(value) => {
              setQuality(value[0]);
              onSettingsChange();
            }}
            disabled={lossless || isProcessing}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="lossless"
            checked={lossless}
            onCheckedChange={(checked) => {
              setLossless(checked as boolean);
              onSettingsChange();
            }}
            disabled={isProcessing}
          />
          <Label htmlFor="lossless">Lossless compression</Label>
        </div>
      </CardContent>
    </Card>
  );
}
