export const replaceMiddleCharacter = (name: string) => {
  if (!name) return name;
  if (name.length === 0) {
    return name;
  }
  const middleIndex = Math.floor(name.length / 2);
  return name.substring(0, middleIndex) + "*" + name.substring(middleIndex + 1);
};
