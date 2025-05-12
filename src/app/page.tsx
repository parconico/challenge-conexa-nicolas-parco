"use client";

import CharacterGrid from "@/components/character-grid";
import EpisodeList from "@/components/episode-list";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Episode } from "@/lib/types";
import { Character } from "@/types/character.interface";

import { useEffect, useState } from "react";

export default function Home() {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);
  const [character1Episodes, setCharacter1Episodes] = useState<Episode[]>([]);
  const [character2Episodes, setCharacter2Episodes] = useState<Episode[]>([]);
  const [sharedEpisodes, setSharedEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!character1 || !character2) return;

      setLoading(true);

      try {
        // Fetch episodes character 1
        const char1EpisodeUrls = character1.episode || [];
        const char1EpisodeIds = char1EpisodeUrls
          .map((url) => url.split("/").pop())
          .filter(Boolean) as string[];

        // Fetch episodes for character 2
        const char2EpisodeUrls = character2.episode || [];
        const char2EpisodeIds = char2EpisodeUrls
          .map((url) => url.split("/").pop())
          .filter(Boolean) as string[];

        // Fetch shared episodes
        const char1Set = new Set(char1EpisodeIds);
        const char2Set = new Set(char2EpisodeIds);

        const sharedIds = [...char1Set].filter((id) => char2Set.has(id));
        const char1OnlyIds = [...char1Set].filter((id) => !char2Set.has(id));
        const char2OnlyIds = [...char2Set].filter((id) => !char1Set.has(id));

        // Fetch episode details
        const fetchEpisodeDetails = async (
          ids: string[]
        ): Promise<Episode[]> => {
          if (ids.length === 0) return [];

          const url =
            ids.length === 1
              ? `https://rickandmortyapi.com/api/episode/${ids[0]}`
              : `https://rickandmortyapi.com/api/episode/${ids.join(",")}`;

          const response = await fetch(url);
          const data = await response.json();

          //Handlr single episode response
          return Array.isArray(data) ? data : [data];
        };
        const [char1OnlyEpisodes, char2OnlyEpisodes, sharedEpisodesData] =
          await Promise.all([
            fetchEpisodeDetails(char1OnlyIds),
            fetchEpisodeDetails(char2OnlyIds),
            fetchEpisodeDetails(sharedIds),
          ]);
        setCharacter1Episodes(char1OnlyEpisodes);
        setCharacter2Episodes(char2OnlyEpisodes);
        setSharedEpisodes(sharedEpisodesData);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEpisodes();
  }, [character1, character2]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6">
        Ricky and Morty Character Comparison
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Character #1</h2>
          <CharacterGrid
            onSelectCharacter={setCharacter1}
            selectedCharacter={character1}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Character #2</h2>
          <CharacterGrid
            onSelectCharacter={setCharacter2}
            selectedCharacter={character2}
          />
        </div>
      </div>

      <Separator className="my-8" />

      {character1 && character2 ? (
        <Tabs defaultValue="character1" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="character1">
              {character1.name} - Only Episodes
            </TabsTrigger>
            <TabsTrigger value="shared">Shared Episodes</TabsTrigger>
            <TabsTrigger value="character2">
              {character2.name} - Only Episodes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="character1">
            <div className="border rounded-lg p-4">
              <h3>{character1.name} - Only Episodes</h3>
              <EpisodeList episodes={character1Episodes} loading={loading} />
            </div>
          </TabsContent>
          <TabsContent value="shared">
            <div className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4">
                Characters #{character1.name} & {character2.name} - Shared
                Episodes
              </h3>
              <EpisodeList episodes={sharedEpisodes} loading={loading} />
            </div>
          </TabsContent>
          <TabsContent value="character2">
            <div className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4">
                {character2.name} - Only Episodes
              </h3>
              <EpisodeList episodes={character2Episodes} loading={loading} />
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center p-8 border rounded-lg">
          <p className="text-lg text-muted-foreground">
            Selecciona dos personajes para ver sus episodios
          </p>
        </div>
      )}
    </main>
  );
}
