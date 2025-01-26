const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios').default;

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user. Username or passeword not provide!" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  console.log("books : ", books);
  res.send(JSON.stringify({books}, null, 4));
  return res.status(200).json({ message: "You have the list !" });
});


// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  // Convert the object to an array:
  const booksArray = Object.entries(books).map(([key, value]) => {
    // key is "1", "2", "3", etc. — convert it to a number if desired
    return { isbn: key, ...value };
  });

  // Filter the isbn
  let filtered_books = booksArray.filter((book) => book.isbn === isbn);
  // Send the filtered_users array as the response to the client
  res.send(filtered_books);
});

  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;

  // Convert the object to an array:
  const booksArray = Object.entries(books).map(([key, value]) => {
    // key is "1", "2", "3", etc. — convert it to a number if desired
    return { isbn: key, ...value };
  });

  // Filter the isbn
  let filtered_books = booksArray.filter((book) => book.author === author);
  // Send the filtered_users array as the response to the client
  res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;

  // Convert the object to an array:
  const booksArray = Object.entries(books).map(([key, value]) => {
    // key is "1", "2", "3", etc. — convert it to a number if desired
    return { isbn: key, ...value };
  });

  // Filter the isbn
  let filtered_books = booksArray.filter((book) => book.title === title);
  // Send the filtered_users array as the response to the client
  res.send(filtered_books);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  // Convert the object to an array:
  const booksArray = Object.entries(books).map(([key, value]) => {
    // key is "1", "2", "3", etc. — convert it to a number if desired
    return { isbn: key, ...value };
  });

  // Filter the isbn
  let filtered_books = booksArray.filter((book) => book.isbn === isbn);
  // Send the filtered_users array as the response to the client
  res.send(filtered_books);
});



module.exports.general = public_users;
