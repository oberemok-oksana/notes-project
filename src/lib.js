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

const DATE_REGEX =
  /(?:^|\D)(?:(?:0?[1-9]|[12][0-9]|3[01])\/(?:0?[1-9]|1[0-2])\/(?:\d{4}))(?:\D|$)/gm;

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

const validateDate = (date) => {
  if (isNaN(Date.parse(date))) {
    throw new Error("invalid date");
  }
};

export const checkForDates = (value) => {
  const match = value.match(DATE_REGEX);

  try {
    match.forEach((date) => validateDate(date));
    return match ?? "";
  } catch {
    return "";
  }
};

export const findNoteById = (data, id) => {
  const note = data.find((note) => note.id === id);
  return note;
};

export const getNotesByCategory = (data, category) => {
  return data.filter((note) => note.category === category);
};
