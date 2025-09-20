import ConverterClient from "@/components/app/ConverterClient";

const REPO_API_URL = "https://api.github.com/repos/MathysCogne/png2webp_folders";

async function getStarCount() {
  try {
    const res = await fetch(REPO_API_URL, {
      headers: {
        ...(process.env.GITHUB_ACCESS_TOKEN && {
          Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`,
        }),
      },
      next: { revalidate: 30 }, // Cache for 1 minute is now safe
    });
    if (!res.ok) {
      console.error(`GitHub API responded with ${res.status}`);
      return null;
    }
    const data = await res.json();
    if (typeof data.stargazers_count === "number") {
      return data.stargazers_count;
    }
    return null;
  } catch (error) {
    console.error("Error fetching GitHub stars:", error);
    return null;
  }
}

export default async function Home() {
  const initialStars = await getStarCount();
  return <ConverterClient initialStars={initialStars} />;
}
