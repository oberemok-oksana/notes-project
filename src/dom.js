import { createDate } from "./lib";

export const getCategoryImage = (category) => {
  const img = document.createElement("img");

  switch (category) {
    case "Task":
      img.src = "./public/images/icons8-cart-30.png";
      img.alt = "task";
      return img;

    case "Random Thought":
      img.src = "./public/images/icons8-mind-30.png";
      img.alt = "random thought";
      return img;

    case "Idea":
      img.src = "./public/images/icons8-light-on-30.png";
      img.alt = "idea";
      return img;

    case "Quote":
      img.src = "./public/images/icons8-get-quote-30.png";
      img.alt = "quote";
      return img;
    default:
      img.src = "./public/images/icons8-cart-30.png";
      img.alt = "quote";
      return img;
  }
};

export const createNote = (note, list, form) => {
  const activeNoteTemplate = document.querySelector("#active-note");
  const trNote = activeNoteTemplate.content.cloneNode(true).querySelector("tr");

  trNote.dataset.id = note.id;

  const [category, title, created, categoryText, content, dates] =
    trNote.querySelectorAll("td");
  title.innerText = note.title || "";
  created.innerText = createDate();
  categoryText.innerText = note.category;

  category.append(getCategoryImage(note.category));

  content.innerText = note.content;
  dates.innerText = note.dates;

  list.append(trNote); //notesList

  form.reset(); //noteCreatingForm
};

export const updateNote = (note) => {
  const tr = document.querySelector(`[data-id="${note.id}"]`);

  const [img, title, , category, content, dates] = tr.querySelectorAll("td");
  title.innerText = note.title;
  category.innerText = note.category;
  content.innerText = note.content;
  const image = img.querySelector("img");
  img.removeChild(image);
  img.append(getCategoryImage(note.category));
  dates.innerText = note.dates;
};

export const createArchivedNote = (note, list) => {
  const archivedNoteTemplate = document.querySelector("#archived-note");
  const trNote = archivedNoteTemplate.content
    .cloneNode(true)
    .querySelector("tr");
  const [category, title, created, categoryText, content, dates] =
    trNote.querySelectorAll("td");

  trNote.dataset.id = note.id;

  title.innerText = note.title || "";
  created.innerText = note.created;
  categoryText.innerText = note.category;
  category.append(getCategoryImage(note.category));
  content.innerText = note.content;
  dates.innerText = note.dates;

  list.append(trNote); //archivedNotesList
};
