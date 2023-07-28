import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const createNoteBtn = document.getElementById("create-note");
  const noteCreatingCard = document.getElementById("note-creating-card");

  createNoteBtn.addEventListener("click", () => {
    noteCreatingCard.classList.toggle("visible");
  });
});
