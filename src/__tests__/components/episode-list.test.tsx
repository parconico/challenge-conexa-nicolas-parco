import { render, screen } from "@testing-library/react";
import EpisodeList from "@/components/episode-list";

describe("EpisodeList", () => {
  const mockEpisodes = [
    {
      id: 1,
      name: "Pilot",
      air_date: "December 2, 2013",
      episode: "S01E01",
    },
    {
      id: 2,
      name: "Lawnmower Dog",
      air_date: "December 9, 2013",
      episode: "S01E02",
    },
  ];

  it("renders loading state correctly", () => {
    render(<EpisodeList episodes={[]} loading={true} />);

    // Check if skeletons are rendered
    const skeletons = screen.getAllByTestId
      ? screen.getAllByTestId("skeleton")
      : [];
    expect(
      skeletons.length || document.querySelectorAll(".h-4").length
    ).toBeGreaterThan(0);
  });

  it("renders empty state when no episodes are provided", () => {
    render(<EpisodeList episodes={[]} loading={false} />);

    // Check if empty state message is rendered
    expect(
      screen.getByText("No hay episodios para mostrar")
    ).toBeInTheDocument();
  });

  it("renders episodes correctly", () => {
    render(<EpisodeList episodes={mockEpisodes} loading={false} />);

    // Check if episode names are rendered
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();

    // Check if episode codes are rendered
    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("S01E02")).toBeInTheDocument();

    // Check if air dates are rendered
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
    expect(screen.getByText("December 9, 2013")).toBeInTheDocument();
  });
});
