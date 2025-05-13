// Mock data for tests

export const mockCharacter1 = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/2",
    "https://rickandmortyapi.com/api/episode/3",
  ],
};

export const mockCharacter2 = {
  id: 2,
  name: "Morty Smith",
  status: "Alive",
  species: "Human",
  image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  episode: [
    "https://rickandmortyapi.com/api/episode/1",
    "https://rickandmortyapi.com/api/episode/4",
    "https://rickandmortyapi.com/api/episode/5",
  ],
};

export const mockEpisodes = [
  {
    id: 1,
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
    characters: [
      "https://rickandmortyapi.com/api/character/1",
      "https://rickandmortyapi.com/api/character/2",
    ],
  },
  {
    id: 2,
    name: "Lawnmower Dog",
    air_date: "December 9, 2013",
    episode: "S01E02",
    characters: ["https://rickandmortyapi.com/api/character/1"],
  },
  {
    id: 3,
    name: "Anatomy Park",
    air_date: "December 16, 2013",
    episode: "S01E03",
    characters: ["https://rickandmortyapi.com/api/character/1"],
  },
  {
    id: 4,
    name: "M. Night Shaym-Aliens!",
    air_date: "January 13, 2014",
    episode: "S01E04",
    characters: ["https://rickandmortyapi.com/api/character/2"],
  },
  {
    id: 5,
    name: "Meeseeks and Destroy",
    air_date: "January 20, 2014",
    episode: "S01E05",
    characters: ["https://rickandmortyapi.com/api/character/2"],
  },
];

export const mockCharactersResponse = {
  info: {
    count: 826,
    pages: 42,
    next: "https://rickandmortyapi.com/api/character/?page=2",
    prev: null,
  },
  results: [mockCharacter1, mockCharacter2],
};
