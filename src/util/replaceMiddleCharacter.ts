export const replaceRestCharacters = (name: string) => {
  if (!name) return name;
  if (name.length < 2) {
    return name;
  }

  return (
    name.substring(0, 1) +
    name
      .substring(1, name.length)
      .split("")
      .map(() => "*")
      .join("")
  );
};
