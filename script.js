'use strict';

const form = document.getElementById("form");
const cards = document.querySelector(".cards");

let myLibrary = [];

let bookTitle = '';
let bookAuthor = '';
let bookPages = 0;
let bookHasRead = true;

let card = '';
let title = '';
let info = '';
let author = '';
let pages = 0;
let hasRead = true;
let cardBtn = '';
let toggleRead = '';
let deleteBtn = '';

form.addEventListener('submit', e => {
    e.preventDefault();

    bookTitle = document.getElementById("book-title");
    bookAuthor = document.getElementById("book-author");
    bookPages = document.getElementById("book-pages");
    bookHasRead = document.getElementById("book-hasRead");

    console.log(`${bookTitle.value} by ${bookAuthor.value}`)

    AddBook();
    ProcessBooks();
    ResetForm();

});

function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
}

function AddBook() {
    const bookObj = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookHasRead.checked);
    myLibrary.push(bookObj);
    console.log(myLibrary);
}

function ProcessBooks() {
    myLibrary.forEach(element => {
        const index = myLibrary.indexOf(element);

        if (!element.processed) {
            card = CreateElements('div', 'card', cards);
            card.dataset.id = index + 1;
            title = CreateElements('div', 'title', card, element.title);
            info = CreateElements('div', 'info', card);
            author = CreateElements('div', 'author', info, element.author);
            pages = CreateElements('div', 'pages', info, element.pages + ' pages');
            hasRead = CreateElements('div', 'hasRead', info, element.hasRead == true ? 'Has Read' : 'Not Read Yet');
            cardBtn = CreateElements('div', 'cardBtn', card);
            toggleRead = CreateElements('button', 'toggleRead', cardBtn, 'Change Status');
            deleteBtn = CreateElements('button', 'delete', cardBtn, 'Delete');
            element.processed = true;

            toggleRead.addEventListener('click', function() {
               element.hasRead = !element.hasRead;
               document.querySelector(`[data-id="${index+1}"] .hasRead`).innerText = element.hasRead == true ? 'Has Read' : 'Not Read Yet'
            })

            deleteBtn.addEventListener('click', function() {
                if (index > -1) myLibrary.splice(index, 1);
                document.querySelector(`[data-id="${index+1}"]`).remove();
            })
        }
    });
}

function CreateElements(elementType, elementClass, toAppend, value) {
    const element = document.createElement(elementType);
    element.classList.add(elementClass);
    toAppend.append(element);

    if (value) {
        element.innerText = `${value}`;
    } 

    return element;
}

function ResetForm() {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookHasRead.checked = false;
}










