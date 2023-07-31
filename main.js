import {
  createArchivedNote,
  createNote,
  hideForm,
  removeClosestTr,
  showForm,
  updateNote,
} from "./src/dom";
import {
  checkForDates,
  createDate,
  deleteNote,
  findNoteById,
  getActiveNotes,
  getArchivedNotes,
  getNotesByCategory,
} from "./src/lib";
import "./style.css";
import { nanoid } from "nanoid";

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
    content: "Implement new 03/05/2021,to 05/05/2021",
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
  {
    title: "React",
    created: "June 15, 2020",
    category: "Task",
    content: "Learn Components",
    dates: "",
    id: "6",
    active: false,
  },
  {
    title: "Flowers",
    created: "July 07, 2021",
    category: "Idea",
    content: "Plant new ones",
    dates: "",
    id: "7",
    active: false,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  const createNoteBtn = document.querySelector("#create-note-btn");
  const noteCreatingForm = document.querySelector("#note-creating-form");
  const notesList = document.querySelector("#notes-list");

  const archivedNotesList = document.querySelector(".archived-notes");
  const noteEditForm = document.querySelector("#note-edit-form");

  getActiveNotes(data).map((note) => {
    createNote(note);
  });

  const drawNotesAmount = () => {
    const activeTaskNotes = document.querySelector(".active-task-notes");
    const archivedTaskNotes = document.querySelector(".archived-task-notes");
    const activeThoughtsNotes = document.querySelector(
      ".active-random-thought-notes"
    );
    const archivedThoughtsNotes = document.querySelector(
      ".archived-random-thought-notes"
    );
    const activeIdeaNotes = document.querySelector(".active-idea-notes");
    const archivedIdeaNotes = document.querySelector(".archived-idea-notes");
    const activeQuoteNotes = document.querySelector(".active-quote-notes");
    const archivedQuoteNotes = document.querySelector(".archived-quote-notes");

    const tasks = getNotesByCategory(data, "Task");
    const activeTaskNotesAmount = getActiveNotes(tasks).length;
    activeTaskNotes.innerText = activeTaskNotesAmount;
    archivedTaskNotes.innerText = tasks.length - activeTaskNotesAmount;

    const thoughts = getNotesByCategory(data, "Random Thought");
    const activeThoughtsNotesAmount = getActiveNotes(thoughts).length;
    activeThoughtsNotes.innerText = activeThoughtsNotesAmount;
    archivedThoughtsNotes.innerText =
      thoughts.length - activeThoughtsNotesAmount;

    const ideas = getNotesByCategory(data, "Idea");
    const activeIdeaNotesAmount = getActiveNotes(ideas).length;
    activeIdeaNotes.innerText = activeIdeaNotesAmount;
    archivedIdeaNotes.innerText = ideas.length - activeIdeaNotesAmount;

    const quotes = getNotesByCategory(data, "Quote");
    const activeQuoteNotesAmount = getActiveNotes(quotes).length;
    activeQuoteNotes.innerText = activeQuoteNotesAmount;
    archivedQuoteNotes.innerText = quotes.length - activeQuoteNotesAmount;
  };

  drawNotesAmount();

  getArchivedNotes(data).map((note) => createArchivedNote(note));

  const handleDelete = (e, id) => {
    data = deleteNote(data, id);
    removeClosestTr(e);
    drawNotesAmount();
  };

  const handleEdit = (data, id) => {
    const note = findNoteById(data, id);
    const { title, category, content, noteId } = noteEditForm.elements;
    showForm(noteEditForm);

    title.value = note.title;
    content.value = note.content;
    category.value = note.category;
    noteId.value = note.id;
  };

  const handleArchive = (e, id) => {
    data = data.map((note) => {
      if (note.id === id) {
        return { ...note, active: false };
      }
      return note;
    });
    const note = findNoteById(data, id);
    createArchivedNote(note);
    removeClosestTr(e);
    drawNotesAmount();
  };

  createNoteBtn.addEventListener("click", () => {
    noteCreatingForm.classList.toggle("visible");
  });

  noteCreatingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const noteCreatingForm = document.querySelector("#note-creating-form");
    const { title, content, category } = noteCreatingForm.elements;
    const note = {
      title: title.value,
      content: content.value,
      category: category.value,
      created: createDate(),
      dates: checkForDates(content.value),
      id: nanoid(),
      active: true,
    };
    data.push(note);
    createNote(note);
    hideForm(noteCreatingForm);
    drawNotesAmount();
  });

  notesList.addEventListener("click", (e) => {
    const noteId = e.target.closest("tr").dataset.id;

    if (e.target.matches(".delete")) {
      handleDelete(e, noteId);
    }

    if (e.target.matches(".archive")) {
      handleArchive(e, noteId);
    }

    if (e.target.matches(".edit")) {
      handleEdit(data, noteId);
    }
  });

  noteEditForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { title, content, category, noteId } = noteEditForm.elements;
    data = data.map((note) => {
      if (note.id === noteId.value) {
        return {
          ...note,
          title: title.value,
          content: content.value,
          category: category.value,
          dates: checkForDates(content.value),
        };
      }
      return note;
    });
    updateNote(findNoteById(data, noteId.value));
    hideForm(noteEditForm);
  });

  archivedNotesList.addEventListener("click", (e) => {
    const noteId = e.target.closest("tr").dataset.id;
    const note = data.find((note) => note.id === noteId);

    if (e.target.matches(".archive")) {
      data = data.map((note) => {
        if (note.id === noteId) {
          return { ...note, active: true };
        }
        return note;
      });
      drawNotesAmount();
      createNote(note);
      hideForm(noteCreatingForm);
      removeClosestTr(e);
    }
  });
});
