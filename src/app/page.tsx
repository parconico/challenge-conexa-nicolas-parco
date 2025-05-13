"use client";

import CharacterGrid from "@/components/character-grid";
import EpisodeList from "@/components/episode-list";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Episode } from "@/lib/types";
import { Character } from "@/types/character.interface";
import { AlertCircle } from "lucide-react";

import { useEffect, useState } from "react";

export default function Home() {
  const [character1, setCharacter1] = useState<Character | null>(null);
  const [character2, setCharacter2] = useState<Character | null>(null);
  const [character1Episodes, setCharacter1Episodes] = useState<Episode[]>([]);
  const [character2Episodes, setCharacter2Episodes] = useState<Episode[]>([]);
  const [sharedEpisodes, setSharedEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para obtener todos los episodios de un personaje
  const fetchAllEpisodes = async (
    episodeUrls: string[]
  ): Promise<Episode[]> => {
    if (!episodeUrls || episodeUrls.length === 0) return [];

    try {
      // Extraer los IDs de los episodios de las URLs
      const episodeIds = episodeUrls.map((url) => url.split("/").pop());

      // Si no hay IDs, retornar array vacio
      if (episodeIds.length === 0) return [];

      //Si solo hay un episodio
      if (episodeIds.length === 1) {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${episodeIds[0]}`
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        return [data];
      }
      // Para múltiples episodios, hacer peticiones en lotes
      const batchSize = 20;
      let allEpisodes: Episode[] = [];

      for (let i = 0; i < episodeIds.length; i += batchSize) {
        const batchIds = episodeIds.slice(i, i + batchSize);
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${batchIds.join(",")}`
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();

        const episodeBatch = Array.isArray(data) ? data : [data];
        allEpisodes = [...allEpisodes, ...episodeBatch];
      }
      return allEpisodes;
    } catch (error) {
      console.error("Error fetching episodes:", error);
      throw error;
    }
  };

  // Efecto para cargar los episodios cuando se seleccionan los personajes
  useEffect(() => {
    // Crear una variable para controlar si el componente está montado
    let isMounted = true;

    const loadEpisodes = async () => {
      // Si no hay dos personajes seleccionados, no hacer nada
      if (!character1 || !character2) {
        if (isMounted) {
          setCharacter1Episodes([]);
          setCharacter2Episodes([]);
          setSharedEpisodes([]);
        }
        return;
      }
      if (isMounted) {
        setLoading(true);
        setError("");
      }

      try {
        // 1. Obtener TODOS los episodios de ambos personajes
        const [allChar1Episodes, allChar2Episodes] = await Promise.all([
          fetchAllEpisodes(character1.episode),
          fetchAllEpisodes(character2.episode),
        ]);

        // Verificar si el componente sigue montado antes de actualizar el estado
        if (!isMounted) return;

        // 2. Crear conjuntos de IDs para facilitar la comparación
        // const char1EpisodeIds = new Set(allChar1Episodes.map((ep) => ep.id));
        const char2EpisodeIds = new Set(allChar2Episodes.map((ep) => ep.id));

        // 3. Encontrar los episodios compartidos
        const sharedEps = allChar1Episodes.filter((ep) =>
          char2EpisodeIds.has(ep.id)
        );

        // 4. IMPORTANTE: Ahora NO se filtra los episodios compartidos de las listas individuales
        // Usamos todos los episodios de cada personaje

        // 5. Actualizar el estado con los episodios
        if (isMounted) {
          setCharacter1Episodes(allChar1Episodes);
          setSharedEpisodes(sharedEps);
          setCharacter2Episodes(allChar2Episodes);
        }
        console.log("Character 1 episodes:", allChar1Episodes.length);
        console.log("Shared episodes:", sharedEps.length);
        console.log("Character 2 episodes:", allChar2Episodes.length);
      } catch (error) {
        console.error("Error loading episodes:", error);

        if (isMounted) {
          setError(`Error al cargar episodios: ${error}`);

          // Limpiar los episodios en caso de error
          setCharacter1Episodes([]);
          setCharacter2Episodes([]);
          setSharedEpisodes([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    loadEpisodes();
    // Función de limpieza para evitar actualizar el estado si el componente se desmonta
    return () => {
      isMounted = false;
    };
  }, [character1, character2]);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-6 flex flex-col gap-3">
        <span className="text-sm font-medium text-neutral-700">
          By Nicolas Parco
        </span>
        Rick and Morty Character Comparison{" "}
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

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {character1 && character2 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">
              {character1.name} - Only Episodes
            </h3>
            <EpisodeList episodes={character1Episodes} loading={loading} />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">
              {character1.name} & {character2.name} - Shared Episodes
            </h3>
            <EpisodeList episodes={sharedEpisodes} loading={loading} />
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-4">
              {character2.name} - Only Episodes
            </h3>
            <EpisodeList episodes={character2Episodes} loading={loading} />
          </div>
        </div>
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
