import { EpisodeCard } from "@/types/episode.interface";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface EpisodeListProps {
  episodes: EpisodeCard[];
  loading: boolean;
}

export default function EpisodeList({ episodes, loading }: EpisodeListProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array(5)
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
  if (episodes.length === 0) {
    return (
      <div className="text-center p-8">
        <p>No hay episodios para mostrar</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {episodes.map((episode) => (
        <Card key={episode.id}>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row md:justify-between">
              <div>
                <h4 className="font-medium">{episode.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {episode.episode}
                </p>
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
