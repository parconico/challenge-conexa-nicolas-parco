"use client";

import { Character } from "@/types/character.interface";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
  isSelected: boolean;
}

export default function CharacterCard({
  character,
  onClick,
  isSelected,
}: CharacterCardProps) {
  const statusColor = {
    Alive: "bg-green-500",
    Dead: "bg-red-500",
    unknown: "bg-gray-500",
  };

  const cardClass = `cursor-pointer transition-all hover:shadow-md ${
    isSelected ? "ring-2 ring-primary" : ""
  }`;
  const statusDotClass = `inline-block w-2 h-2 rounded-full mr-1 ${
    statusColor[character.status]
  }`;
  return (
    <Card className={cardClass} onClick={onClick}>
      <CardContent className="p-3 flex items-center space-x-3">
        <div className="flex-shrink-0">
          <Image
            src={character.image || "/placeholder.svg"}
            alt={character.name}
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm md:text-base truncate">
            {character.name}
          </h3>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className={statusDotClass}></span>
            {character.status} - {character.species}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
