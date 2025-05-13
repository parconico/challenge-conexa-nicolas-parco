"use client";

import { mockCharacter1, mockCharacter2, mockEpisodes } from "@/__mocks__/data";
import Home from "@/app/page";
import { Episode } from "@/lib/types";
import { Character } from "@/types/character.interface";
import { render, screen } from "@testing-library/react";

// Mock the fetch function
global.fetch = jest.fn();

interface MockCharacterGridProps {
  onSelectCharacter: (character: Character) => void;
  selectedCharacter: Character | null;
}

interface MockEpisodeListProps {
  episodes: Episode[];
  loading: boolean;
}

// Mock the components to simplify testing
jest.mock("@/components/character-grid", () => {
  return function MockCharacterGrid({
    onSelectCharacter,
    selectedCharacter,
  }: MockCharacterGridProps) {
    return (
      <div data-testid="character-grid">
        <button
          onClick={() => onSelectCharacter(mockCharacter1)}
          data-testid="select-character-1"
        >
          Select Character 1
        </button>
        <button
          onClick={() => onSelectCharacter(mockCharacter2)}
          data-testid="select-character-2"
        >
          Select Character 2
        </button>
        {selectedCharacter && (
          <div data-testid="selected-character">{selectedCharacter.name}</div>
        )}
      </div>
    );
  };
});

jest.mock("@/components/episode-list", () => {
  return function MockEpisodeList({ episodes, loading }: MockEpisodeListProps) {
    return (
      <div data-testid="episode-list">
        {loading ? (
          <div data-testid="loading">Loading...</div>
        ) : (
          <div>
            {episodes.map((episode) => (
              <div key={episode.id} data-testid="episode-item">
                {episode.name}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
});

describe("Home Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock successful fetch responses
    (global.fetch as jest.Mock).mockImplementation((url) => {
      if (url.includes("/episode/")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockEpisodes),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });
  });

  it("renders character grids and initial message", () => {
    render(<Home />);

    // Check if title is rendered
    expect(
      screen.getByText("Ricky and Morty Character Comparison")
    ).toBeInTheDocument();

    // Check if character grids are rendered
    expect(screen.getAllByTestId("character-grid").length).toBe(2);

    // Check if initial message is rendered
    expect(
      screen.getByText("Selecciona dos personajes para ver sus episodios")
    ).toBeInTheDocument();
  });
});
