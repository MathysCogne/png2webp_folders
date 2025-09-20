"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const REPO_API_URL =
  "https://api.github.com/repos/MathysCogne/png2webp_folders/stargazers";

interface Stargazer {
  login: string;
  avatar_url: string;
  html_url: string;
}

export function LatestStargazer() {
  const [lastStargazer, setLastStargazer] = useState<Stargazer | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch(REPO_API_URL + "?per_page=1")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setLastStargazer(data[0]);
          setTimeout(() => setIsVisible(true), 2000); // Delay appearance
        }
      })
      .catch((error) => console.error("Error fetching stargazers:", error));
  }, []);

  if (!lastStargazer || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a
        href="https://github.com/MathysCogne/png2webp_folders"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg bg-background p-3 shadow-lg ring-1 ring-border transition-transform hover:scale-105"
      >
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={lastStargazer.avatar_url}
            alt={lastStargazer.login}
          />
          <AvatarFallback>
            {lastStargazer.login.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{lastStargazer.login}</p>
          <p className="flex items-center text-xs text-muted-foreground">
            <Star className="mr-1 h-3 w-3 text-yellow-500" />
            Starred this repository
          </p>
        </div>
      </a>
    </div>
  );
}
