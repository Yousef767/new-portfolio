export const yearsOfExperience = (() => {
  const startDate = new Date(2022, 9, 1); // October 1, 2022
  const currentDate = new Date();
  const diffTime = currentDate.getTime() - startDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  const years = diffDays / 365.25;
  return parseInt(years.toString());
})();