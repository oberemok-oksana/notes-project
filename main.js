import "./style.css";
import { nanoid } from "nanoid";

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

const REGEXDATE =
  /(?:^|\D)(?:(?:0?[1-9]|[12][0-9]|3[01])\/(?:0?[1-9]|1[0-2])\/(?:\d{4}))(?:\D|$)/gm;

let data = [
  {
    title: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    dates: "",
    content: "Tomatoes, bread",
    id: "1",
    active: true,
  },
  {
    title: "The theory of evolut..",
    created: "	April 27, 2021",
    category: "Random Thought",
    dates: "",
    content: "The evolution",
    id: "2",
    active: true,
  },
  {
    title: "New Feature",
    created: "May 05, 2021",
    category: "Idea",
    content: "Implement new",
    dates: "03/05/2021, 05/05/2021",
    id: "3",
    active: true,
  },
  {
    title: "William Gaddis",
    created: "May 07, 2021",
    category: "Quote",
    content: "Power doesn't co..",
    dates: "",
    id: "4",
    active: true,
  },
  {
    title: "Books",
    created: "May 15, 2021",
    category: "Task",
    content: "The Lean Startup",
    dates: "",
    id: "5",
    active: true,
  },
];

const createDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${MONTHS[month]} ${day}, ${year}`;
};

document.addEventListener("DOMContentLoaded", () => {
  const createNoteBtn = document.querySelector("#create-note-btn");
  const noteCreatingForm = document.querySelector("#note-creating-form");
  const notesList = document.querySelector("#notes-list");
  const noteTitleInput = document.querySelector("#name");
  const categoriesSelect = document.querySelector("#categories");
  const noteTextarea = document.querySelector("#note-content");
  const archive = document.querySelector(".archive");
  const activeNotes = document.querySelector(".active-notes");
  const archivedNotes = document.querySelector(".archived-notes");

  createNoteBtn.addEventListener("click", () => {
    noteCreatingForm.classList.toggle("visible");
  });

  noteCreatingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = {};
    note.title = noteTitleInput.value;
    note.content = noteTextarea.value;
    note.category = categoriesSelect.value;
    note.created = createDate();
    note.dates = noteTextarea.value.match(REGEXDATE) || "";
    note.id = nanoid();
    note.active = true;
    console.log(noteTextarea.value, noteTextarea.value.match(REGEXDATE));
    data.push(note);
    createNote(note);
    drawNotesAmount();
  });

  const createNote = (note) => {
    const trNote = document.createElement("tr");
    trNote.classList.add("table-data");
    trNote.dataset.id = note.id;
    const tdCategory = document.createElement("td");
    tdCategory.classList.add("category");

    const tdTitle = document.createElement("td");
    tdTitle.innerText = note.title || "";

    const tdCreatedDate = document.createElement("td");
    tdCreatedDate.innerText = createDate();

    const tdCategoryText = document.createElement("td");
    tdCategoryText.innerText = note.category;

    switch (note.category) {
      case "Task":
        const imgTask = document.createElement("img");
        imgTask.src = "./public/images/icons8-cart-30.png";
        imgTask.alt = "task";
        tdCategory.append(imgTask);
        break;
      case "Random Thought":
        const imgThought = document.createElement("img");
        imgThought.src = "./public/images/icons8-mind-30.png";
        imgThought.alt = "random thought";
        tdCategory.append(imgThought);
        break;
      case "Idea":
        const imgIdea = document.createElement("img");
        imgIdea.src = "./public/images/icons8-light-on-30.png";
        imgIdea.alt = "idea";
        tdCategory.append(imgIdea);
        break;
      case "Quote":
        const imgQuote = document.createElement("img");
        imgQuote.src = "./public/images/icons8-get-quote-30.png";
        imgQuote.alt = "quote";
        tdCategory.append(imgQuote);
        break;
      default:
        const imgDefault = document.createElement("img");
        imgDefault.src = "./public/images/icons8-cart-30.png";
        imgDefault.alt = "quote";
        tdCategory.append(imgDefault);
        break;
    }

    const tdNoteContent = document.createElement("td");
    tdNoteContent.innerText = note.content;

    const tdDates = document.createElement("td");
    tdDates.innerText = note.dates;

    const tdEdit = document.createElement("td");

    const imgEdit = document.createElement("img");
    const divWrapperEdit = document.createElement("div");
    divWrapperEdit.classList.add("staticCell");
    imgEdit.src = "./public/images/icons8-edit-24.png";
    imgEdit.alt = "edit";
    divWrapperEdit.append(imgEdit);
    tdEdit.append(divWrapperEdit);

    const tdArchive = document.createElement("td");

    const imgArchive = document.createElement("img");
    const divWrapperArchive = document.createElement("div");
    divWrapperArchive.classList.add("staticCell");
    imgArchive.src = "./public/images/icons8-download-24.png";
    imgArchive.alt = "archive";
    imgArchive.classList.add("archive");
    divWrapperArchive.append(imgArchive);
    tdArchive.append(divWrapperArchive);

    const tdDelete = document.createElement("td");
    const divWrapper = document.createElement("div");
    divWrapper.classList.add("staticCell");
    const imgDelete = document.createElement("img");
    imgDelete.classList.add("delete");
    imgDelete.src = "./public/images/icons8-delete-24.png";
    imgDelete.alt = "delete";
    divWrapper.append(imgDelete);
    tdDelete.append(divWrapper);

    trNote.append(
      tdCategory,
      tdTitle,
      tdCreatedDate,
      tdCategoryText,
      tdNoteContent,
      tdDates,
      tdEdit,
      tdArchive,
      tdDelete
    );
    notesList.append(trNote);

    noteCreatingForm.reset();
  };

  data.map((note) => {
    createNote(note);
  });

  notesList.addEventListener("click", (e) => {
    const noteId = e.target.closest("tr").dataset.id;

    if (e.target.matches(".delete")) {
      data = deleteNote(noteId);
      e.target.closest("tr").remove();
      drawNotesAmount();
    }

    if (e.target.matches(".archive")) {
      data = data.map((note) => {
        if (note.id === noteId) {
          return { ...note, active: false };
        }
        return note;
      });

      e.target.closest("tr").remove();
      drawNotesAmount();
    }
  });

  const deleteNote = (id) => {
    const filteredData = data.filter((note) => note.id !== id);
    return filteredData;
  };
  const drawNotesAmount = () => {
    const activeNotesAmount = data.filter((note) => note.active);
    activeNotes.innerText = activeNotesAmount.length;
    archivedNotes.innerText = data.length - activeNotesAmount.length;
  };
  drawNotesAmount();
});
