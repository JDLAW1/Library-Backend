const express = require("express");
const booksRouter = require("./routes/books");

const app = express();
const port = 3000;

app.use(express.json());

console.log("Type of booksRouter:", typeof booksRouter);

app.use("/books", booksRouter);

app.get("/", (req, res) => {
  res.send("Library API is running!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
