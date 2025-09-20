"use client";

import { Github } from "lucide-react";

const REPO_URL = "https://github.com/MathysCogne/png2webp_folders";

interface GitHubStarButtonProps {
  initialStars: number | null;
}

export function GitHubStarButton({ initialStars }: GitHubStarButtonProps) {
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg bg-background p-2 shadow-lg ring-1 ring-border transition-transform hover:scale-105"
    >
      <Github className="h-4 w-4" />
      {initialStars !== null && (
        <span className="text-sm font-medium">{initialStars}</span>
      )}
    </a>
  );
}
