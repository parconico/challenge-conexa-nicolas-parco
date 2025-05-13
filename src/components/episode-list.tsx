import { EpisodeCard } from "@/types/episode.interface";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TvIcon } from "lucide-react";

interface EpisodeListProps {
  episodes: EpisodeCard[];
  loading: boolean;
}

export default function EpisodeList({ episodes, loading }: EpisodeListProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Card key={index}>
              <CardContent>
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }
  if (!episodes || episodes.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <TvIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-2" />
        <p className="text-muted-foreground">No hay episodios para mostrar</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
      {episodes.map((episode) => (
        <Card key={episode.id} className="hover:bg-accent/50 transition-colors">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-primary">{episode.name}</h4>
                <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                  {episode.episode}
                </span>
              </div>
              <div className="text-sm text-muted-foreground mt-1 md:mt-0">
                {episode.air_date}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
