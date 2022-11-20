export const CalculateTimeUsed = (startTime: string) => {
  const firstDate = new Date();
  const lastDate = new Date(startTime);

  const difference = (firstDate.getTime() - lastDate.getTime()) / 1000;

  const hourDifference = Math.floor(difference / 3600);

  const minuteDifference = Math.floor(difference / 60);

  const secondsDifference = Math.floor(difference);

  const time = `${hourDifference > 0 ? `${hourDifference} hours,` : ""} ${
    minuteDifference > 0 ? `${minuteDifference} minutes,` : ""
  } ${secondsDifference} seconds`;

  return time;
};
