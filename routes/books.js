const express = require("express");
const router = express.Router();

let books = [
  { id: 1, title: "El Señor de los Anillos", author: "J.R.R. Tolkien" },
  { id: 2, title: "Cien años de soledad", author: "Gabriel García Márquez" },
];

// Obtener todos los libros
router.get("/", (req, res) => {
  res.json(books);
});

// Obtener un libro por ID
router.get("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find((b) => b.id === bookId);

  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Libro no encontrado" });
  }
});

// Agregar un nuevo libro
router.post("/", (req, res) => {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res
      .status(400)
      .json({ message: "Faltan campos requeridos (title, author, genre)" });
  }

  const newBook = {
    id: books.length + 1, // Simulación de ID autoincremental
    title,
    author,
    genre,
  };

  books.push(newBook);
  res.status(201).json(newBook); // 201 Created
});

// Actualizar un libro existente
router.put("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res
      .status(400)
      .json({ message: "Faltan campos requeridos (title, author, genre)" });
  }

  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  books[bookIndex] = {
    id: bookId, // Mantener el ID original
    title,
    author,
    genre,
  };

  res.json(books[bookIndex]);
});

// Eliminar un libro
router.delete("/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const bookIndex = books.findIndex((b) => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }

  books.splice(bookIndex, 1);
  res.status(204).send(); // 204 No Content
});

module.exports = router;
