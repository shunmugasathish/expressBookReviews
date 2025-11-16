const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// Check if a user with the given username already exists
const doesExist = (username) => {
    // Filter the users array for any user with the same username
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
}

public_users.post("/register", (req,res) => {
    let username  = req.body.username;
    let password = req.body.password;
    if(username && password){
        if (!doesExist(username)) {
            // Add the new user to the users array
            let id = Math.round(Math.random()*1000);
            users.push({"username": username, "password": password,"id":id});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        }else{
            return res.status(404).json({message: "User already exists!"});
        }
    }
    return res.status(404).json({message: "unable to register the user beacause username or password not added"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let filteredBooks;
    for (const [key, value] of Object.entries(books)) {
        if(books[key].ISBN == isbn){
            filteredBooks = books[key];
        }
    }  
    return res.status(200).json(filteredBooks);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    let author = req.params.author;
    let filteredBooks;
    for (const [key, value] of Object.entries(books)) {
        if(books[key].author == author){
            filteredBooks = books[key];
        }
    }  
    return res.status(200).json(filteredBooks);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here title
  let title = req.params.title;
    let filteredBooks;
    for (const [key, value] of Object.entries(books)) {
        if(books[key].title == title){
            filteredBooks = books[key];
        }
    }  
  return res.status(200).json(filteredBooks);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let filteredBooks;
    for (const [key, value] of Object.entries(books)) {
        if(books[key].ISBN == isbn){
            filteredBooks = books[key].reviews;
        }
    }  
    return res.status(200).json(filteredBooks);
});

module.exports.general = public_users;
