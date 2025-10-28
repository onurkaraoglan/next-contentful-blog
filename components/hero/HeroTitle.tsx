import { heroData } from "@onur/data/static/hero";

export function HeroTitle() {
  function parseForHighlightedWords(text: string) {
    const wordsAndSpaces = text.split(/(\s+)/);

    return wordsAndSpaces.map((chunk, index) => {
      const isHighlighted = heroData.title.highlight
        .map((word) => word.toLowerCase())
        .includes(chunk.trim().toLowerCase());

      return (
        <span
          key={index}
          className={`${isHighlighted ? "text-foreground font-bold drop-shadow-[0px_0px_8px_rgba(168,85,247,0.5)]" : ""}`}
        >
          {chunk}
        </span>
      );
    });
  }

  return (
    <div className="z-10 w-full grow basis-1">
      <h1 className="text-center text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
        {heroData.title.plainText}
        <span className="bg-gradient-to-r from-pink-700 via-purple-700 to-cyan-700 dark:from-pink-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
          {heroData.title.highlightText}
        </span>
      </h1>
      <div className="text-center text-lg md:text-xl font-light text-muted-foreground">
        {parseForHighlightedWords(heroData.title.subTitle)}
      </div>
    </div>
  );
}

