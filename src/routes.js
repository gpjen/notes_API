// import note handler
const { createNote, readNotes, readOneNote, updateNote, deleteNoteByid } =
  require("./handler").notesHandler;

// routes handling
const routes = [
  {
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return "notes app oke";
    },
  },
  {
    method: "POST",
    path: "/notes",
    handler: createNote,
  },
  {
    method: "GET",
    path: "/notes",
    handler: readNotes,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: readOneNote,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: updateNote,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteByid,
  },
];

module.exports = routes;
