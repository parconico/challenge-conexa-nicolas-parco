"use client";

import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "@/components/character-card";

describe("CharacterCard", () => {
  const mockCharacter = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: ["episode-1", "episode-2"],
  };

  const mockOnClick = jest.fn();

  it("renders character information correctly", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={mockOnClick}
        isSelected={false}
      />
    );

    // Check if character name is rendered
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();

    // Check if status and species are rendered
    expect(screen.getByText("Alive - Human")).toBeInTheDocument();

    // Check if image is rendered with correct alt text
    const image = screen.getByAltText("Rick Sanchez");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("character%2Favatar%2F1.jpeg")
    );
  });

  it("calls onClick when card is clicked", () => {
    render(
      <CharacterCard
        character={mockCharacter}
        onClick={mockOnClick}
        isSelected={false}
      />
    );

    // Click on the card
    fireEvent.click(screen.getByText("Rick Sanchez"));

    // Check if onClick was called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("shows selected state when isSelected is true", () => {
    const { container } = render(
      <CharacterCard
        character={mockCharacter}
        onClick={mockOnClick}
        isSelected={true}
      />
    );

    // Check if the card has the selected class
    const card = container.firstChild;
    expect(card).toHaveClass("ring-2");
    expect(card).toHaveClass("ring-primary");
  });
});
