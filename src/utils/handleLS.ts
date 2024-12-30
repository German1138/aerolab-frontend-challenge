import { IGame } from "@/app/interfaces";

const handleLS = (game: IGame) => {
  if (typeof window === "undefined") return;

  try {
    const savedArray = JSON.parse(localStorage.getItem("myArray")) || [];
    console.log(savedArray);
    const gameSlug = game?.slug;

    if (!gameSlug) return;

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
  }
};

export default handleLS;
