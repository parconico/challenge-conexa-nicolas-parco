// import { mockEpisodes } from "@/__mocks__/data";
// import { mockCharacter2 } from "@/__mocks__/data";
// import { mockCharacter1 } from "@/__mocks__/data";
import { mockCharacter1, mockCharacter2, mockEpisodes } from "@/__mocks__/data";

describe("Episode Filtering", () => {
  it("correctly identifies shared episodes", () => {
    const char1EpisodeIds = new Set(
      mockCharacter1.episode.map((url: string) =>
        Number.parseInt(url.split("/").pop() || "0")
      )
    );
    const char2EpisodeIds = new Set(
      mockCharacter2.episode.map((url: string) =>
        Number.parseInt(url.split("/").pop() || "0")
      )
    );

    const sharedEpisodes = mockEpisodes.filter(
      (ep) => char1EpisodeIds.has(ep.id) && char2EpisodeIds.has(ep.id)
    );

    // Only episode 1 is shared between Rick and Morty in our mock data
    expect(sharedEpisodes.length).toBe(1);
    expect(sharedEpisodes[0].id).toBe(1);
    expect(sharedEpisodes[0].name).toBe("Pilot");
  });

  it("correctly gets all episodes for a character", () => {
    const char1EpisodeIds = new Set(
      mockCharacter1.episode.map((url) =>
        Number.parseInt(url.split("/").pop() || "0")
      )
    );

    const char1Episodes = mockEpisodes.filter((ep) =>
      char1EpisodeIds.has(ep.id)
    );

    // Rick appears in episodes 1, 2, and 3 in our mock data
    expect(char1Episodes.length).toBe(3);
    expect(char1Episodes.map((ep) => ep.id)).toEqual([1, 2, 3]);
  });
});
