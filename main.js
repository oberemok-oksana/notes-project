import { createArchivedNote, createNote, updateNote } from "./src/dom";
import {
  createDate,
  deleteNote,
  getActiveNotes,
  getArchivedNotes,
} from "./src/lib";
import "./style.css";
import { nanoid } from "nanoid";

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
    content: "Implement new 03/05/2021,to 05/05/2021",
    dates: "03/05/2021, 05/05/2021",
    id: "3",
    active: false,
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

document.addEventListener("DOMContentLoaded", () => {
  const createNoteBtn = document.querySelector("#create-note-btn");
  const noteCreatingForm = document.querySelector("#note-creating-form");
  const notesList = document.querySelector("#notes-list");

  const archivedNotesList = document.querySelector(".archived-notes");
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

  const noteEditForm = document.querySelector("#note-edit-form");

  createNoteBtn.addEventListener("click", () => {
    noteCreatingForm.classList.toggle("visible");
  });

  noteCreatingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const { title, content, category } = noteCreatingForm.elements;
    const note = {};
    note.title = title.value;
    note.content = content.value;
    note.category = category.value;
    note.created = createDate();
    note.dates = content.value.match(REGEXDATE) || "";
    note.id = nanoid();
    note.active = true;
    data.push(note);
    createNote(note, notesList, noteCreatingForm);
    drawNotesAmount();
  });

  getActiveNotes(data).map((note) => {
    createNote(note, notesList, noteCreatingForm);
  });

  const handleDelete = (e, id) => {
    data = deleteNote(data, id);
    e.target.closest("tr").remove();
    drawNotesAmount();
  };

  const handleEdit = () => {
    const { title, category, content, noteId } = noteEditForm.elements;
    noteEditForm.style.display = "flex";

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
    const archivedNote = data.find((note) => note.id === id);
    createArchivedNote(archivedNote, archivedNotesList);
    e.target.closest("tr").remove();
    drawNotesAmount();
  };

  notesList.addEventListener("click", (e) => {
    const noteId = e.target.closest("tr").dataset.id;
    const note = data.find((item) => item.id === noteId);

    if (e.target.matches(".delete")) {
      handleDelete(e, noteId);
    }

    if (e.target.matches(".archive")) {
      handleArchive(e, noteId);
    }

    if (e.target.matches(".edit")) {
      handleEdit();
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
          dates: content.value.match(REGEXDATE),
        };
      }
      return note;
    });
    updateNote(data.find((note) => note.id === noteId.value));
    noteEditForm.style.display = "none";
  });

  const drawNotesAmount = () => {
    const tasks = data.filter((note) => note.category === "Task");
    const activeTaskNotesAmount = tasks.filter((note) => note.active).length;
    activeTaskNotes.innerText = activeTaskNotesAmount;
    archivedTaskNotes.innerText = tasks.length - activeTaskNotesAmount;

    const thoughts = data.filter((note) => note.category === "Random Thought");
    const activeThoughtsNotesAmount = thoughts.filter(
      (note) => note.active
    ).length;
    activeThoughtsNotes.innerText = activeThoughtsNotesAmount;
    archivedThoughtsNotes.innerText =
      thoughts.length - activeThoughtsNotesAmount;

    const ideas = data.filter((note) => note.category === "Idea");
    const activeIdeaNotesAmount = ideas.filter((note) => note.active).length;
    activeIdeaNotes.innerText = activeIdeaNotesAmount;
    archivedIdeaNotes.innerText = ideas.length - activeIdeaNotesAmount;

    const quotes = data.filter((note) => note.category === "Quote");
    const activeQuoteNotesAmount = quotes.filter((note) => note.active).length;
    activeQuoteNotes.innerText = activeQuoteNotesAmount;
    archivedQuoteNotes.innerText = quotes.length - activeQuoteNotesAmount;
  };
  drawNotesAmount();

  getArchivedNotes(data).map((note) =>
    createArchivedNote(note, archivedNotesList)
  );

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
      createNote(note, notesList, noteCreatingForm);
      e.target.closest("tr").remove();
    }
  });
});
