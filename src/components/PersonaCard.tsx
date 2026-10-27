import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonaCardProps {
  name: string;
  firm: string;
  style: string[];
  difficulty: number;
  description: string;
  onAdd?: () => void;
}

export function PersonaCard({ name, firm, style, difficulty, description, onAdd }: PersonaCardProps) {
  const difficultyColor =
    difficulty >= 8 ? "text-destructive" : difficulty >= 5 ? "text-warning" : "text-success";

  return (
    <Card className="p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <Building2 className="h-3.5 w-3.5" />
            <span>{firm}</span>
          </div>
        </div>
        <div className={cn("text-2xl font-bold", difficultyColor)}>{difficulty}/10</div>
      </div>

      <p className="text-sm text-muted-foreground mb-3">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {style.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>

      <Button onClick={onAdd} className="w-full" size="sm">
        <PlusCircle className="h-4 w-4 mr-1" />
        Add to Session
      </Button>
    </Card>
  );
}
