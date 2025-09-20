"use client";

import { useState, useMemo, ChangeEvent, DragEvent, useRef, useEffect } from "react";
import JSZip from "jszip";
import { AppFile, FileStatus } from "@/lib/types";

export function useFileConverter() {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [quality, setQuality] = useState(80);
  const [lossless, setLossless] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [zipUrl, setZipUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFirefox, setIsFirefox] = useState(false);
  const [showStarDialog, setShowStarDialog] = useState(false);

  useEffect(() => {
    setIsFirefox(navigator.userAgent.toLowerCase().includes("firefox"));
  }, []);

  const handleFileSelect = (selectedFiles: FileList) => {
    if (selectedFiles.length === 0) return;
    const fileList = Array.from(selectedFiles).map((file, i) => ({
      id: `${file.name}-${i}`,
      file,
      relativePath: (file as any).webkitRelativePath || file.name,
      status: "pending" as FileStatus,
    }));
    setFiles(fileList);
    setZipUrl(null);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const isConvertibleImage = (fileName: string) => {
    return /\.(png|jpe?g)$/i.test(fileName);
  };

  const convertImageToWebp = async (
    file: File,
    quality: number,
    lossless: boolean
  ): Promise<Blob> => {
    const imageBitmap = await createImageBitmap(file);
    const { width, height } = imageBitmap;

    if (typeof OffscreenCanvas !== "undefined") {
      const canvas = new OffscreenCanvas(width, height);
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");
      ctx.drawImage(imageBitmap, 0, 0);
      const options = {
        type: "image/webp",
        quality: lossless ? 1 : quality / 100,
      };
      return await (canvas as any).convertToBlob(options);
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");
      ctx.drawImage(imageBitmap, 0, 0);
      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("Canvas toBlob failed"));
          },
          "image/webp",
          lossless ? 1 : quality / 100
        );
      });
    }
  };

  const handleConvertAndZip = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setZipUrl(null);
    const zip = new JSZip();

    const CONCURRENCY_LIMIT = 10;
    const filesQueue = [...files];

    const processFile = async (appFile: AppFile) => {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === appFile.id ? { ...f, status: "converting" } : f
        )
      );

      try {
        if (isConvertibleImage(appFile.file.name)) {
          const webpBlob = await convertImageToWebp(
            appFile.file,
            quality,
            lossless
          );
          const newPath =
            appFile.relativePath.replace(/\.[^/.]+$/, "") + ".webp";
          zip.file(newPath, webpBlob);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === appFile.id
                ? { ...f, status: "converted", outputName: newPath }
                : f
            )
          );
        } else {
          zip.file(appFile.relativePath, appFile.file);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === appFile.id ? { ...f, status: "copied" } : f
            )
          );
        }
      } catch (error) {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === appFile.id
              ? {
                  ...f,
                  status: "error",
                  errorMessage: (error as Error).message,
                }
              : f
          )
        );
      }
    };

    const worker = async () => {
      while (filesQueue.length > 0) {
        const fileToProcess = filesQueue.shift();
        if (fileToProcess) {
          await processFile(fileToProcess);
        }
      }
    };

    const workers = Array(CONCURRENCY_LIMIT).fill(null).map(worker);
    await Promise.all(workers);

    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(zipBlob);
      setZipUrl(url);
      setShowStarDialog(true);
    } catch (error) {
      console.error("Error generating ZIP:", error);
    }
    setIsProcessing(false);
  };
  
  const progress = useMemo(() => {
    if (files.length === 0) return 0;
    const completed = files.filter(
      (f) =>
        f.status === "converted" || f.status === "copied" || f.status === "error"
    ).length;
    return (completed / files.length) * 100;
  }, [files]);

  const rootFolderName = useMemo(() => {
    if (!files.length || !files[0].relativePath.includes("/")) return "archive";
    return files[0].relativePath.split("/")[0];
  }, [files]);

  return {
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
    handleFileSelect,
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
  };
}
