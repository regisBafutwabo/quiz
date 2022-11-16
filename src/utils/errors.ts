export const getErrorMessage = (code: number) => {
  switch (code) {
    case 1:
      return "Oops! No Results for your query";
    case 2:
      return "There is an Invalid Parameter in your query";
    case 3:
      return "Token Not Found";
    case 4:
      return "Token is invalid. Please reset the token";
    default:
      return "Oops! Something went wrong. Please try again later";
  }
};
