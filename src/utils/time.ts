import numeral from "numeral";

export const CalculateTimeUsed = (startTime: string) => {
  const firstDate = new Date();
  const lastDate = new Date(startTime);

  const difference = Math.floor(
    (firstDate.getTime() - lastDate.getTime()) / 1000
  );

  const hourDifference = Math.floor(difference / 3600);

  const minuteDifference = Math.floor(
    (difference - hourDifference * 3600) / 60
  );

  const secondsDifference =
    difference - hourDifference * 3600 - minuteDifference * 60;

  const time = `${
    hourDifference > 0 ? `${numeral(hourDifference).format("00")} hours,` : ""
  } ${
    minuteDifference > 0
      ? `${numeral(minuteDifference).format("00")} minutes,`
      : ""
  } ${numeral(secondsDifference).format("00")} seconds`;

  return time;
};
