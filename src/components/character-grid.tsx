import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Character } from "@/types/character.interface";
import CharacterCard from "./character-card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CharacterGridProps {
  onSelectCharacter: (character: Character | null) => void;
  selectedCharacter: Character | null;
}

export default function CharacterGrid({
  onSelectCharacter,
  selectedCharacter,
}: CharacterGridProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [info, setInfo] = useState({ pages: 0, count: 0 });

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?page=${page}`
        );
        const data = await response.json();

        setCharacters(data.results);
        setInfo(data.info);
      } catch (error) {
        console.error("Error fetching characters:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacters();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < info.pages) {
      setPage(page + 1);
    }
  };

  const handleSelectCharacter = (character: Character) => {
    onSelectCharacter(character);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {loading
          ? Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 flex flex-col"
                >
                  <Skeleton className="h-12 w-full rounded-md mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))
          : characters
              .slice(0, 6)
              .map((character) => (
                <CharacterCard
                  key={character.id}
                  character={character}
                  onClick={() => handleSelectCharacter(character)}
                  isSelected={selectedCharacter?.id === character.id}
                />
              ))}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          onClick={handlePrevPage}
          disabled={page === 1 || loading}
        >
          <ChevronLeft className="h-4 w-4 mr-2" /> Anterior
        </Button>
        <span className="text-sm text-white font-semibold">
          Página {page} de {info.pages}
        </span>
        <Button
          variant="outline"
          onClick={handleNextPage}
          disabled={page === info.pages || loading}
        >
          Siguiente <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
