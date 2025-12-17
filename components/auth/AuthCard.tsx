import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md bg-neutral-900 text-white border-neutral-800 shadow-xl">
      <CardHeader className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-neutral-400">{subtitle}</p>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
