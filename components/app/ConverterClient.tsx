"use client";

import { CheckCircle2, XCircle, Loader2, Copy } from "lucide-react";
import { ActionsPanel } from "@/components/app/ActionsPanel";
import { FileDropzone } from "@/components/app/FileDropzone";
import { SettingsPanel } from "@/components/app/SettingsPanel";
import { Features } from "@/components/app/Features";
import { useFileConverter } from "@/hooks/useFileConverter";
import { GitHubStarButton } from "@/components/app/GitHubStarButton";
import { StarRepoDialog } from "@/components/app/StarRepoDialog";
import { LatestStargazer } from "@/components/app/LatestStargazer";
import { FileStatus } from "@/lib/types";

interface ConverterClientProps {
  initialStars: number | null;
}

export default function ConverterClient({ initialStars }: ConverterClientProps) {
  const {
    files,
    setFiles,
    quality,
    setQuality,
    lossless,
    setLossless,
    isProcessing,
    zipUrl,
    setZipUrl,
    fileInputRef,
    handleDragOver,
    handleDrop,
    handleInputChange,
    triggerFileInput,
    isConvertibleImage,
    handleConvertAndZip,
    progress,
    rootFolderName,
    isFirefox,
    showStarDialog,
    setShowStarDialog,
  } = useFileConverter();

  const canConvert = files.length > 0 && !isProcessing;
  const canDownload = !!zipUrl && !isProcessing;

  const FileStatusIcon = ({ status }: { status: FileStatus }) => {
    switch (status) {
      case "converting":
        return <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />;
      case "converted":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "copied":
        return <Copy className="h-4 w-4 text-blue-500" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-6xl mx-auto">
        <GitHubStarButton initialStars={initialStars} />
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Bulk Image to WebP Converter
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-sm md:text-base">
            Drop a folder, convert images to WebP, and download a ZIP. Simple,
            fast, and private.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[500px]">
          <FileDropzone
            files={files}
            isFirefox={isFirefox}
            handleDragOver={handleDragOver}
            handleDrop={handleDrop}
            triggerFileInput={triggerFileInput}
            fileInputRef={fileInputRef}
            handleInputChange={handleInputChange}
            setFiles={setFiles}
            isConvertibleImage={isConvertibleImage}
            FileStatusIcon={FileStatusIcon}
          />

          <div className="lg:col-span-2 h-full flex flex-col gap-6">
            <SettingsPanel
              quality={quality}
              setQuality={setQuality}
              lossless={lossless}
              setLossless={setLossless}
              isProcessing={isProcessing}
              onSettingsChange={() => setZipUrl(null)}
            />
            <ActionsPanel
              canConvert={canConvert}
              canDownload={canDownload}
              isProcessing={isProcessing}
              progress={progress}
              handleConvertAndZip={handleConvertAndZip}
              zipUrl={zipUrl}
              rootFolderName={rootFolderName}
              fileCount={files.length}
            />
          </div>
        </main>
        <Features />
      </div>
      <StarRepoDialog open={showStarDialog} onOpenChange={setShowStarDialog} />
      <LatestStargazer />
    </div>
  );
}
