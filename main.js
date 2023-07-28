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

let data = [
  {
    title: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    dates: "",
    content: "Tomatoes, bread",
    id: 1,
  },
  {
    title: "The theory of evolut..",
    created: "	April 27, 2021",
    category: "Random Thought",
    dates: "",
    content: "The evolution",
    id: 2,
  },
  {
    title: "New Feature",
    created: "May 05, 2021",
    category: "Idea",
    content: "Implement new",
    dates: "3/5/2021, 5/5/2021",
    id: 3,
  },
  {
    title: "William Gaddis",
    created: "May 07, 2021",
    category: "Quote",
    content: "Power doesn't co..",
    dates: "",
    id: 4,
  },
  {
    title: "Books",
    created: "May 15, 2021",
    category: "Task",
    content: "The Lean Startup",
    dates: "",
    id: 5,
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
    note.dates = "";
    note.id = nanoid();
    data.push(note);
    createNote(note);
  });

  const createNote = (note) => {
    const trNote = document.createElement("tr");
    trNote.classList.add("table-data");
    trNote.dataset.id = note.id;
    const tdCategory = document.createElement("td");
    tdCategory.classList.add("category");

    const imgTask = document.createElement("img");
    imgTask.src = "./public/images/icons8-cart-30.png";
    imgTask.alt = "task";

    const imgThought = document.createElement("img");
    imgThought.src = "./public/images/icons8-mind-30.png";
    imgThought.alt = "random thought";

    const imgIdea = document.createElement("img");
    imgIdea.src = "./public/images/icons8-light-on-30.png";
    imgIdea.alt = "idea";

    const tdTitle = document.createElement("td");
    tdTitle.innerText = note.title || "";

    const tdCreatedDate = document.createElement("td");
    tdCreatedDate.innerText = createDate();

    const tdCategoryText = document.createElement("td");
    tdCategoryText.innerText = note.category;

    const tdNoteContent = document.createElement("td");
    tdNoteContent.innerText = note.content;

    const tdEdit = document.createElement("td");
    const imgEdit = document.createElement("img");
    imgEdit.src = "./public/images/icons8-edit-24.png";
    imgEdit.alt = "edit";

    tdEdit.append(imgEdit);

    const tdArchive = document.createElement("td");
    const imgArchive = document.createElement("img");
    imgArchive.src = "./public/images/icons8-download-24.png";
    imgArchive.alt = "archive";

    tdArchive.append(imgArchive);

    const tdDelete = document.createElement("td");
    const imgDelete = document.createElement("img");
    imgDelete.classList.add("delete");
    imgDelete.src = "./public/images/icons8-delete-24.png";
    imgDelete.alt = "delete";

    tdDelete.append(imgDelete);

    tdCategory.append(imgTask);
    trNote.append(
      tdCategory,
      tdTitle,
      tdCreatedDate,
      tdCategoryText,
      tdNoteContent,
      tdEdit,
      tdArchive,
      tdDelete
    );
    notesList.append(trNote);
  };

  data.map((note) => {
    createNote(note);
  });

  notesList.addEventListener("click", (e) => {
    const noteId = e.target.closest("tr").dataset.id;

    if (e.target.matches(".delete")) {
      data = deleteNote(noteId);
      e.target.closest("tr").remove();
    }
  });

  const deleteNote = (id) => {
    const filteredData = data.filter((note) => note.id !== id);
    return filteredData;
  };
});
