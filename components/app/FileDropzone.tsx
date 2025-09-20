import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  FileText,
  ImageIcon,
  UploadCloud,
  X,
} from "lucide-react";
import React, { DragEvent, RefObject, useEffect } from "react";
import { AppFile, FileStatus } from "@/lib/types";

interface FileDropzoneProps {
  files: AppFile[];
  isFirefox: boolean;
  handleDragOver: (e: DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: DragEvent<HTMLDivElement>) => void;
  triggerFileInput: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setFiles: (files: AppFile[]) => void;
  isConvertibleImage: (fileName: string) => boolean;
  FileStatusIcon: ({ status }: { status: FileStatus }) => React.JSX.Element | null;
}

export function FileDropzone({
  files,
  isFirefox,
  handleDragOver,
  handleDrop,
  triggerFileInput,
  fileInputRef,
  handleInputChange,
  setFiles,
  isConvertibleImage,
  FileStatusIcon,
}: FileDropzoneProps) {
  useEffect(() => {
    const firstConvertingFile = files.find(
      (file) => file.status === "converting"
    );
    if (firstConvertingFile) {
      const element = document.getElementById(`file-item-${firstConvertingFile.id}`);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [files]);

  if (files.length > 0) {
    return (
      <Card className="lg:col-span-3 h-full flex flex-col min-h-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>File Queue ({files.length})</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setFiles([])}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          {isFirefox && !files[0].relativePath.includes("/") && (
            <div className="mb-4 flex items-center rounded-lg border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300">
              <AlertTriangle className="mr-2 h-5 w-5 flex-shrink-0" />
              <p>
                Folder selection isn&apos;t supported in Firefox. You can select
                multiple files.
              </p>
            </div>
          )}
          <ul className="space-y-2">
            {files.map((appFile) => (
              <li
                key={appFile.id}
                id={`file-item-${appFile.id}`}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center truncate">
                  {isConvertibleImage(appFile.file.name) ? (
                    <ImageIcon className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
                  ) : (
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                  )}
                  <span
                    className="text-muted-foreground truncate"
                    title={appFile.relativePath}
                  >
                    {appFile.relativePath}
                  </span>
                </div>
                <FileStatusIcon status={appFile.status} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="lg:col-span-3 h-full flex flex-col min-h-0">
      <div
        className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-muted rounded-lg cursor-pointer hover:border-primary transition-colors m-6"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
        <p className="mt-4 font-semibold">Drag & drop a folder here</p>
        <p className="text-sm text-muted-foreground mt-1">or click to select</p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          className="hidden"
          // @ts-expect-error - webkitdirectory is a non-standard attribute
          webkitdirectory="true"
          mozdirectory="true"
          directory="true"
          multiple={isFirefox}
        />
      </div>
    </Card>
  );
}
