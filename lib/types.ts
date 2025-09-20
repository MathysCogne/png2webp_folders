export type FileStatus =
  | "pending"
  | "converting"
  | "converted"
  | "copied"
  | "error";

export interface AppFile {
  id: string;
  file: File;
  relativePath: string;
  status: FileStatus;
  outputName?: string;
  errorMessage?: string;
}
