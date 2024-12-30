const handleUnixDate = (date: number) => {
  const newDate = new Date(date * 1000);
  const formattedDate = newDate.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return formattedDate;
};

export default handleUnixDate;
