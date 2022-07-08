const { nanoid } = require("nanoid");
const { notes } = require("./notes");

exports.notesHandler = {
  createNote: (req, h) => {
    const id = nanoid(16);
    const { title, tags, body } = req.payload;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = { id, title, tags, body, createdAt, updatedAt };
    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    if (isSuccess) {
      const res = h.response({
        status: "success",
        message: "Catatan berhasil ditambahkan",
        data: {
          noteId: id,
        },
      });
      res.code(201);
      return res;
    }

    const res = h.response({
      status: "fail",
      message: "catatan gagal ditambahkkan",
    });
    res.code(500);
    return res;
  },

  readNotes: (req, h) => {
    const res = h.response({
      status: "success",
      message: "get all notes",
      data: {
        notes,
      },
    });
    res.code(200);
    return res;
  },
  readOneNote: (req, h) => {
    const { id } = req.params;
    const note = notes.filter((n) => n.id === id)[0];

    if (note) {
      const res = h.response({
        ststus: "success",
        message: "get all notes",
        data: {
          note,
        },
      });
      res.code(200);
      return res;
    }

    const res = h.response({
      status: "fail",
      message: "id note doesnt match",
    });
    res.code(400);
    return res;
  },
  updateNote: (req, h) => {
    const { id } = req.params;
    const { title, tags, body } = req.payload;
    const updatedAt = new Date().toISOString();

    const index = notes.findIndex((n) => n.id === id);

    if (index >= 0) {
      notes[index] = {
        ...notes[index],
        title,
        tags,
        body,
        updatedAt,
      };
      const res = h.response({
        status: "success",
        message: "update note by id",
        data: {
          noteId: notes[index].id,
        },
      });
      res.code(200);
      return res;
    }

    const res = h.response({
      status: "fail",
      message: "Gagal memperbarui catatan. Id tidak ditemukan",
    });
    res.code(400);
    return res;
  },
  deleteNoteByid: (req, h) => {
    const { id } = req.params;
    const index = notes.findIndex((n) => n.id === id);

    if (index >= 0) {
      notes.splice(index, 1);
      const res = h.response({
        status: "success",
        message: "delete notes by id",
      });
      res.code(200);
      return res;
    }

    const res = h.response({
      status: "failed",
      message: "Catatan gagal dihapus. Id tidak ditemukan",
    });
    res.code(400);
    return res;
  },
};
