export const decodeText = (text: string) => {
  if (text !== "") {
    return decodeURIComponent(text);
  }
  return text;
};
