import { IGame, IGameBase, IGameDetail } from "@/app/interfaces";

const handleLS = (game: IGame | IGameDetail | IGameBase): boolean => {
  if (typeof window === "undefined") return false;

  try {
    const savedArray = JSON.parse(localStorage.getItem("myArray") || "[]");

    const gameSlug = game?.slug;

    if (!gameSlug) return false;

    if (savedArray.includes(gameSlug)) {
      const filteredGamesArray = savedArray.filter(
        (item: string) => item !== gameSlug
      );
      localStorage.setItem("myArray", JSON.stringify(filteredGamesArray));
    } else {
      savedArray.push(gameSlug);
      localStorage.setItem("myArray", JSON.stringify(savedArray));
    }
    return true;
  } catch (error) {
    console.error("Error handling localStorage:", error);
    return false;
  }
};

export default handleLS;
