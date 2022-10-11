const getLocalDateTime = (date: Date): string => {
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export default getLocalDateTime;
