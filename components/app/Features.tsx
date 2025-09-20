import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, FolderTree, Rabbit, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="mx-auto h-8 w-8 text-primary" />,
    title: "100% Private",
    description: "All processing happens in your browser.",
  },
  {
    icon: <FolderTree className="mx-auto h-8 w-8 text-primary" />,
    title: "Folder Structure",
    description: "Your original folder structure is preserved.",
  },
  {
    icon: <Rabbit className="mx-auto h-8 w-8 text-primary" />,
    title: "Super Fast",
    description: "Lightning-fast browser-based conversions.",
  },
  {
    icon: <Code2 className="mx-auto h-8 w-8 text-primary" />,
    title: "Open Source",
    description: "Free to use and contribute on GitHub.",
  },
];

export function Features() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 text-center sm:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Card key={index}>
          <CardHeader>
            {feature.icon}
            <CardTitle className="mt-2">{feature.title}</CardTitle>
            <CardDescription>{feature.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
