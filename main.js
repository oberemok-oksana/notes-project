import "./style.css";
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

const data = [
  {
    title: "Shopping list",
    created: "April 20, 2021",
    category: "Task",
    dates: "",
    content: "Tomatoes, bread",
  },
  {
    title: "The theory of evolut..",
    created: "	April 27, 2021",
    category: "Random Thought",
    dates: "",
    content: "The evolution",
  },
  {
    title: "New Feature",
    created: "May 05, 2021",
    category: "Idea",
    content: "Implement new",
    dates: "3/5/2021, 5/5/2021",
  },
  {
    title: "William Gaddis",
    created: "May 07, 2021",
    category: "Quote",
    content: "Power doesn't co..",
    dates: "",
  },
  {
    title: "Books",
    created: "May 15, 2021",
    category: "Task",
    content: "The Lean Startup",
    dates: "",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const createNoteBtn = document.getElementById("create-note-btn");
  const noteCreatingCard = document.getElementById("note-creating-card");
  const notesList = document.getElementById("notes-list");
  const noteTitleInput = document.getElementById("name");
  const categoriesSelect = document.getElementById("categories");
  const noteTextarea = document.getElementById("note-content");
  const saveNoteBtn = document.getElementById("save-note-btn");
  let noteTitle;
  let category;
  let noteContent;

  createNoteBtn.addEventListener("click", () => {
    noteCreatingCard.classList.toggle("visible");
  });

  noteTitleInput.addEventListener("change", (e) => {
    noteTitle = e.target.value;
  });

  categoriesSelect.addEventListener("change", (e) => {
    category = e.target.value;
  });

  noteTextarea.addEventListener("change", (e) => {
    noteContent = e.target.value;
  });

  saveNoteBtn.addEventListener("click", () => {
    const trNote = document.createElement("tr");
    trNote.classList.add("table-data");
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
    tdTitle.innerText = noteTitle || "";

    const tdCreatedDate = document.createElement("td");
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    tdCreatedDate.textContent = `${MONTHS[month]} ${day}, ${year}`;

    const tdCategoryText = document.createElement("td");
    tdCategoryText.innerText = category;

    const tdNoteContent = document.createElement("td");
    tdNoteContent.innerText = noteContent;

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
    const newNote = {
      title: noteTitle,
      created: `${MONTHS[month]} ${day}, ${year}`,
      category,
      dates: "",
      content: noteContent,
    };
    data.push(newNote);
    console.log(data);
  });
});
