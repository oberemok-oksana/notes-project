const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const createDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${MONTHS[month]} ${day}, ${year}`;
};

export const getActiveNotes = (data) => {
  const filtered = data.filter((note) => note.active);
  return filtered;
};

export const getArchivedNotes = (data) => {
  const filtered = data.filter((note) => !note.active);
  return filtered;
};

export const deleteNote = (data, id) => {
  const filteredData = data.filter((note) => note.id !== id);
  return filteredData;
};
