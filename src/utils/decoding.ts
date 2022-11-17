export const decodingText = (text: string) => {
  if (text !== "") {
    return decodeURIComponent(text);
  }
  return text;
};
