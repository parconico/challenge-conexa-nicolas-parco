import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CharacterGrid from "@/components/character-grid";
import { mockCharactersResponse } from "@/__mocks__/data";

// Mock fetch
global.fetch = jest.fn();

describe("CharacterGrid", () => {
  const mockOnSelectCharacter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Mock successful fetch response
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockCharactersResponse),
    });
  });

  it("renders and fetches characters on mount", async () => {
    render(
      <CharacterGrid
        onSelectCharacter={mockOnSelectCharacter}
        selectedCharacter={null}
      />
    );

    // Check if loading state is shown initially
    expect(document.querySelectorAll(".h-32").length).toBeGreaterThan(0);

    // Wait for characters to load
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("https://rickandmortyapi.com/api/character/")
      );
    });
  });

  it("handles pagination correctly", async () => {
    render(
      <CharacterGrid
        onSelectCharacter={mockOnSelectCharacter}
        selectedCharacter={null}
      />
    );

    // Wait for characters to load
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
    });

    // Find next page button
    const nextButton = screen.getByText("Siguiente");

    // Click next page
    fireEvent.click(nextButton);

    // Wait for fetch with page=2
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining("page=2")
      );
    });
  });
});
